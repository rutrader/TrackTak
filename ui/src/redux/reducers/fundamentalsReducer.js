import { createReducer } from "@reduxjs/toolkit";
import {
  setExchangeRate,
  setFundamentalsDataThunk,
  setLastPriceClose,
  setTenYearGovernmentBondLastClose,
} from "../actions/fundamentalsActions";
import getSymbolFromCurrency from "currency-symbol-map";
import { monthDateFormat } from "../../shared/utils";
import dayjs from "dayjs";
import convertGBXToGBP from "../../shared/convertGBXToGBP";
import equityRiskPremiumCountriesJson from "../../data/equityRiskPremiumCountries.json";
import industryMapping, { spaceRegex } from "../../shared/industryMappings";
import industryAverage from "../../shared/industryAverage";

const initialState = {
  currentIndustry: null,
  currentEquityRiskPremiumCountry: null,
  governmentBondTenYearLastClose: null,
  price: null,
  data: null,
  isLoaded: false,
  exchangeRates: null,
  mostRecentExchangeRate: null,
  balanceSheet: {
    bookValueOfDebt: null,
    bookValueOfEquity: null,
    cashAndShortTermInvestments: null,
    noncontrollingInterestInConsolidatedEntity: null,
    investedCapital: null,
    salesToCapitalRatio: null,
  },
  incomeStatement: {
    totalRevenue: null,
    operatingIncome: null,
    operatingMargin: null,
    interestExpense: null,
    minorityInterest: null,
    pastThreeYearsAverageEffectiveTaxRate: null,
  },
  yearlyBalanceSheets: null,
  yearlyIncomeStatements: null,
  isInUS: null,
  valuationCurrencySymbol: null,
  valuationCurrencyCode: null,
};

export const getValueFromString = (value) => {
  const newValue = value ? parseFloat(value) : 0;

  if (isNaN(newValue)) {
    return value;
  }

  return newValue;
};

const getFinancialSheetPastValues = (
  financialSheetValues,
  valueKey,
  periodsToGet
) => {
  const sumOfFirstFourValues = financialSheetValues
    .slice(0, periodsToGet)
    .reduce((acc, curr) => {
      return (acc += getValueFromString(curr[valueKey]));
    }, 0);

  return sumOfFirstFourValues;
};

const getConvertCurrency = (exchangeRates) => (
  datePeriodsToConvertAt,
  valueToConvert
) => {
  const valueAsANumber = getValueFromString(valueToConvert);

  if (isNaN(parseFloat(valueAsANumber)) || !exchangeRates)
    return valueAsANumber;

  // TODO: Make this exact day later
  const sumOfExchangeRateCloses = datePeriodsToConvertAt.reduce(
    (prev, date) => {
      // Get exchange rate for that month
      const datePeriodAsMonthDate = dayjs(date).format(monthDateFormat);

      return prev + exchangeRates[datePeriodAsMonthDate].close;
    },
    0
  );

  const averageOfExchangeRateCloses =
    sumOfExchangeRateCloses / datePeriodsToConvertAt.length;

  return valueAsANumber * averageOfExchangeRateCloses;
};

const getBookValueOfDebt = (balanceSheet) => {
  let bookValueOfDebt = 0;

  bookValueOfDebt += getValueFromString(balanceSheet.shortLongTermDebt);

  bookValueOfDebt += getValueFromString(balanceSheet.longTermDebt);

  bookValueOfDebt += getValueFromString(balanceSheet.capitalLeaseObligations);

  return bookValueOfDebt;
};

const getInvestedCapital = (balanceSheet) => {
  return (
    balanceSheet.bookValueOfEquity +
    balanceSheet.bookValueOfDebt -
    balanceSheet.cashAndShortTermInvestments
  );
};

const getOperatingMargin = (incomeStatement) => {
  return incomeStatement.operatingIncome / incomeStatement.totalRevenue;
};

const getSalesToCapitalRatio = (incomeStatement, balanceSheet) => {
  return incomeStatement.totalRevenue / balanceSheet.investedCapital;
};

const getCashAndShortTermInvestments = (balanceSheet) => {
  // Non U.S Stocks report cash + shortTermInvestments seperately
  if (balanceSheet.cashAndShortTermInvestments !== null) {
    return balanceSheet.cashAndShortTermInvestments;
  } else if (
    balanceSheet.cash !== null ||
    balanceSheet.shortTermInvestments !== null
  ) {
    const cash = getValueFromString(balanceSheet.cash);
    const shortTermInvestments = getValueFromString(
      balanceSheet.shortTermInvestments
    );

    return cash + shortTermInvestments;
  } else {
    return 0;
  }
};

const dateSortComparer = (a, b) => new Date(b.date) - new Date(a.date);

const setFundamentalsReducer = (state, action) => {
  const { Financials, ...otherData } = action.payload.data;
  const {
    General,
    Highlights: { MostRecentQuarter },
    Financials: { Balance_Sheet, Income_Statement },
  } = action.payload.data;

  state.data = {
    ...otherData,
  };

  const quarterBalanceSheet = Balance_Sheet.quarterly[MostRecentQuarter];
  const sortedYearlyIncomeValues = Object.values(Income_Statement.yearly).sort(
    dateSortComparer
  );

  const sortedQuarterlyIncomeValues = Object.values(
    Income_Statement.quarterly
  ).sort(dateSortComparer);

  const sortedBalanceSheetYearlyValues = Object.values(
    Balance_Sheet.yearly
  ).sort(dateSortComparer);

  const recentYearlyIncomeStatement = sortedYearlyIncomeValues[0];

  const isInUS = General.CountryISO === "US";
  const pastPeriodsToGet = 3;

  let pastThreeYearIncomeBeforeTax;
  let pastThreeYearIncomeTaxExpense;
  let incomeSheetDates;
  let incomeStatement;

  // TODO: Fix when the API fixes the TTM for non-US stocks
  if (isInUS) {
    const quarters = 4;
    const pastThreeYearPeriods = pastPeriodsToGet * quarters;

    pastThreeYearIncomeBeforeTax = getFinancialSheetPastValues(
      sortedQuarterlyIncomeValues,
      "incomeBeforeTax",
      pastThreeYearPeriods
    );

    pastThreeYearIncomeTaxExpense = getFinancialSheetPastValues(
      sortedQuarterlyIncomeValues,
      "incomeTaxExpense",
      pastThreeYearPeriods
    );

    incomeSheetDates = [...sortedQuarterlyIncomeValues].slice(0, 4);

    incomeStatement = {
      totalRevenue: getFinancialSheetPastValues(
        sortedQuarterlyIncomeValues,
        "totalRevenue",
        quarters
      ),
      operatingIncome: getFinancialSheetPastValues(
        sortedQuarterlyIncomeValues,
        "operatingIncome",
        quarters
      ),
      interestExpense: getFinancialSheetPastValues(
        sortedQuarterlyIncomeValues,
        "interestExpense",
        quarters
      ),
      minorityInterest: getFinancialSheetPastValues(
        sortedQuarterlyIncomeValues,
        "minorityInterest",
        quarters
      ),
    };
  } else {
    pastThreeYearIncomeBeforeTax = getFinancialSheetPastValues(
      sortedYearlyIncomeValues,
      "incomeBeforeTax",
      pastPeriodsToGet
    );
    pastThreeYearIncomeTaxExpense = getFinancialSheetPastValues(
      sortedYearlyIncomeValues,
      "incomeTaxExpense",
      pastPeriodsToGet
    );

    incomeSheetDates = [recentYearlyIncomeStatement.date];

    incomeStatement = {
      totalRevenue: recentYearlyIncomeStatement.totalRevenue,
      operatingIncome: recentYearlyIncomeStatement.operatingIncome,
      interestExpense: recentYearlyIncomeStatement.interestExpense,
      minorityInterest: recentYearlyIncomeStatement.minorityInterest,
    };
  }

  const convertCurrency = getConvertCurrency(state.exchangeRates);

  sortedYearlyIncomeValues.forEach(({ date }) => {
    const incomeStatement = Income_Statement.yearly[date];
    const currentYearlyIncomeStatement = {
      totalRevenue: incomeStatement.totalRevenue,
      operatingIncome: incomeStatement.operatingIncome,
      interestExpense: incomeStatement.interestExpense,
      minorityInterest: incomeStatement.minorityInterest,
    };

    Object.keys(currentYearlyIncomeStatement).forEach((key) => {
      currentYearlyIncomeStatement[key] = convertCurrency(
        [date],
        currentYearlyIncomeStatement[key]
      );
    });

    currentYearlyIncomeStatement.operatingMargin = getOperatingMargin(
      currentYearlyIncomeStatement
    );
    currentYearlyIncomeStatement.date = incomeStatement.date;

    state.yearlyIncomeStatements = {
      ...state.yearlyIncomeStatements,
      [date]: currentYearlyIncomeStatement,
    };
  });

  const balanceSheet = {
    bookValueOfDebt: getBookValueOfDebt(quarterBalanceSheet),
    bookValueOfEquity: quarterBalanceSheet.totalStockholderEquity,
    noncontrollingInterestInConsolidatedEntity:
      quarterBalanceSheet.noncontrollingInterestInConsolidatedEntity,
    cashAndShortTermInvestments: getCashAndShortTermInvestments(
      quarterBalanceSheet
    ),
  };

  sortedBalanceSheetYearlyValues.forEach(({ date }) => {
    const balanceSheet = Balance_Sheet.yearly[date];
    const currentYearlyBalanceSheet = {
      bookValueOfDebt: getBookValueOfDebt(balanceSheet),
      cashAndShortTermInvestments: getCashAndShortTermInvestments(balanceSheet),
      bookValueOfEquity: balanceSheet.totalStockholderEquity,
      noncontrollingInterestInConsolidatedEntity:
        balanceSheet.noncontrollingInterestInConsolidatedEntity,
    };

    Object.keys(currentYearlyBalanceSheet).forEach((key) => {
      currentYearlyBalanceSheet[key] = convertCurrency(
        [date],
        currentYearlyBalanceSheet[key]
      );
    });

    currentYearlyBalanceSheet.investedCapital = getInvestedCapital(
      currentYearlyBalanceSheet
    );
    currentYearlyBalanceSheet.salesToCapitalRatio = getSalesToCapitalRatio(
      state.yearlyIncomeStatements[date],
      currentYearlyBalanceSheet
    );
    currentYearlyBalanceSheet.date = balanceSheet.date;

    state.yearlyBalanceSheets = {
      ...state.yearlyBalanceSheets,
      [date]: currentYearlyBalanceSheet,
    };
  });

  Object.keys(balanceSheet).forEach((property) => {
    balanceSheet[property] = convertCurrency(
      [MostRecentQuarter],
      balanceSheet[property]
    );
  });

  Object.keys(incomeStatement).forEach((property) => {
    incomeStatement[property] = convertCurrency(
      incomeSheetDates,
      incomeStatement[property]
    );
  });

  balanceSheet.investedCapital = getInvestedCapital(balanceSheet);
  balanceSheet.salesToCapitalRatio = getSalesToCapitalRatio(
    incomeStatement,
    balanceSheet
  );
  incomeStatement.operatingMargin = getOperatingMargin(incomeStatement);

  incomeStatement.pastThreeYearsAverageEffectiveTaxRate =
    pastThreeYearIncomeTaxExpense / pastThreeYearIncomeBeforeTax;

  state.incomeStatement = incomeStatement;
  state.balanceSheet = balanceSheet;
  state.isInUS = isInUS;
  state.price =
    General.CurrencyCode === "GBX" ? state.price / 100 : state.price;
  state.valuationCurrencyCode = convertGBXToGBP(General.CurrencyCode);
  state.valuationCurrencySymbol = getSymbolFromCurrency(
    state.valuationCurrencyCode
  );
};

const setLastPriceCloseReducer = (state, action) => {
  const priceLastClose = action.payload;

  state.price = priceLastClose;
};

const setCurrentIndustryAverageReducer = (state) => {
  const currentIndustryMutated = state.data.General.Industry.replace(
    spaceRegex,
    ""
  ).toUpperCase();
  const mappedCurrentIndustry = industryMapping[currentIndustryMutated];
  const industryAverages = state.isInUS
    ? industryAverage.US
    : industryAverage.global;
  const currentIndustry = industryAverages.find((datum) => {
    return datum.industryName === mappedCurrentIndustry;
  });

  state.currentIndustry = {
    ...currentIndustry,
    standardDeviationInStockPrices:
      currentIndustry.standardDeviationInStockPrices,
  };
};

const setCurrentEquityRiskPremiumReducer = (state) => {
  const {
    corporateTaxRate,
    countryRiskPremium,
    equityRiskPremium,
    adjDefaultSpread,
  } = equityRiskPremiumCountriesJson.find((datum) => {
    const country = datum.country.toUpperCase();

    return country === state.data.General.AddressData.Country.toUpperCase();
  });

  state.currentEquityRiskPremiumCountry = {
    corporateTaxRate: parseFloat(corporateTaxRate) / 100,
    countryRiskPremium: parseFloat(countryRiskPremium) / 100,
    equityRiskPremium: parseFloat(equityRiskPremium) / 100,
    adjDefaultSpread: parseFloat(adjDefaultSpread) / 100,
  };
};

const setGovernmentBondTenYearLastCloseReducer = (
  state,
  { payload = null }
) => {
  state.governmentBondTenYearLastClose = payload;
};

const setExchangeRateReducer = (state, { payload = null }) => {
  state.exchangeRates = payload;
  state.mostRecentExchangeRate = payload ? Object.values(payload)[0] : null;
};

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLastPriceClose, setLastPriceCloseReducer);
  builder.addCase(setFundamentalsDataThunk.pending, (state) => {
    state.isLoaded = false;
  });
  builder.addCase(setFundamentalsDataThunk.fulfilled, (state, action) => {
    setFundamentalsReducer(state, action);
    setCurrentEquityRiskPremiumReducer(state, action);
    setCurrentIndustryAverageReducer(state, action);
    state.isLoaded = true;
  });
  builder.addCase(
    setTenYearGovernmentBondLastClose,
    setGovernmentBondTenYearLastCloseReducer
  );
  builder.addCase(setExchangeRate, setExchangeRateReducer);
});
