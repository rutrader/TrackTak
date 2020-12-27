import { createReducer } from "@reduxjs/toolkit";
import {
  setExchangeRateHistory,
  setFundamentalsData,
  setLastPriceClose,
  setTenYearGovernmentBondLastClose,
} from "../actions/fundamentalsActions";
import getSymbolFromCurrency from "currency-symbol-map";
import { monthDateFormat } from "../../shared/utils";
import dayjs from "dayjs";
import convertGBXToGBP from "../../shared/convertGBXToGBP";
import industryMapping from "../../shared/industryMapping.json";
import industryAverages from "../../data/industryAverages.json";
import equityRiskPremiumCountries from "../../data/equityRiskPremiumCountries.json";

const spaceRegex = /\s/g;
const industryMappingsMutated = {};

Object.keys(industryMapping).forEach((key) => {
  const noSpaceKey = key.replace(spaceRegex, "").toUpperCase();

  industryMappingsMutated[noSpaceKey] = industryMapping[key];
});

const matureMarketEquityRiskPremium =
  parseFloat(
    equityRiskPremiumCountries.find((x) => x.country === "United States")
      .equityRiskPremium
  ) / 100;

const initialState = {
  industryAverages,
  equityRiskPremiumCountries,
  matureMarketEquityRiskPremium,
  currentIndustry: null,
  currentEquityRiskPremiumCountry: null,
  governmentBondTenYearLastClose: null,
  exchangeRates: null,
  price: null,
  data: null,
  balanceSheet: {
    bookValueOfDebt: null,
    bookValueOfEquity: null,
    cashAndShortTermInvestments: null,
    noncontrollingInterestInConsolidatedEntity: null,
    investedCapital: null,
  },
  incomeStatement: {
    totalRevenue: null,
    operatingIncome: null,
    interestExpense: null,
    minorityInterest: null,
    pastThreeYearsAverageEffectiveTaxRate: null,
  },
  yearlyBalanceSheets: null,
  yearlyIncomeStatements: null,
  hasIncomeTTM: null,
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
  datePeriodsToConverAt,
  valueToConvert
) => {
  const valueAsANumber = getValueFromString(valueToConvert);

  if (isNaN(parseFloat(valueAsANumber)) || !exchangeRates)
    return valueAsANumber;

  // TODO: Make this exact day later
  const sumOfExchangeRateCloses = datePeriodsToConverAt.reduce((prev, date) => {
    // Get exchange rate for that month
    const datePeriodAsMonthDate = dayjs(date).format(monthDateFormat);

    return prev + exchangeRates[datePeriodAsMonthDate].close;
  }, 0);

  const averageOfExchangeRateCloses =
    sumOfExchangeRateCloses / datePeriodsToConverAt.length;

  return valueAsANumber * averageOfExchangeRateCloses;
};

const getBookValueOfDebt = (balanceSheet) => {
  let bookValueOfDebt = 0;

  bookValueOfDebt += getValueFromString(balanceSheet.shortLongTermDebt);

  bookValueOfDebt += getValueFromString(balanceSheet.longTermDebt);

  bookValueOfDebt += getValueFromString(balanceSheet.capitalLeaseObligations);

  return bookValueOfDebt;
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

  // TODO: Put all this on the backend
  state.balanceSheet = {
    bookValueOfDebt: getBookValueOfDebt(quarterBalanceSheet),
    bookValueOfEquity: quarterBalanceSheet.totalStockholderEquity,
    noncontrollingInterestInConsolidatedEntity:
      quarterBalanceSheet.noncontrollingInterestInConsolidatedEntity,
    cashAndShortTermInvestments: getCashAndShortTermInvestments(
      quarterBalanceSheet
    ),
  };

  state.hasIncomeTTM = General.CountryISO === "US";
  const pastPeriodsToGet = 3;

  let pastThreeYearIncomeBeforeTax;
  let pastThreeYearIncomeTaxExpense;
  let incomeSheetDates;

  // TODO: Fix when the API fixes the TTM for non-US stocks
  if (state.hasIncomeTTM) {
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

    state.incomeStatement = {
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

    state.incomeStatement = {
      totalRevenue: recentYearlyIncomeStatement.totalRevenue,
      operatingIncome: recentYearlyIncomeStatement.operatingIncome,
      interestExpense: recentYearlyIncomeStatement.interestExpense,
      minorityInterest: recentYearlyIncomeStatement.minorityInterest,
    };
  }

  const convertCurrency = getConvertCurrency(state.exchangeRates);

  Object.keys(state.incomeStatement).forEach((property) => {
    state.incomeStatement[property] = convertCurrency(
      incomeSheetDates,
      state.incomeStatement[property]
    );
  });

  Object.keys(state.balanceSheet).forEach((property) => {
    state.balanceSheet[property] = convertCurrency(
      [MostRecentQuarter],
      state.balanceSheet[property]
    );
  });

  state.yearlyIncomeStatements = {};

  sortedYearlyIncomeValues.forEach(({ date }) => {
    const incomeStatement = Income_Statement.yearly[date];

    state.yearlyIncomeStatements[date] = {
      totalRevenue: incomeStatement.totalRevenue,
      operatingIncome: incomeStatement.operatingIncome,
      interestExpense: incomeStatement.interestExpense,
      minorityInterest: incomeStatement.minorityInterest,
    };

    Object.keys(state.yearlyIncomeStatements[date]).forEach((key) => {
      state.yearlyIncomeStatements[date][key] = convertCurrency(
        [date],
        incomeStatement[key]
      );
    });

    state.yearlyIncomeStatements[date].date = incomeStatement.date;
  });

  state.yearlyBalanceSheets = {};

  sortedBalanceSheetYearlyValues.forEach(({ date }) => {
    const balanceSheet = Balance_Sheet.yearly[date];

    state.yearlyBalanceSheets[date] = {
      bookValueOfDebt: convertCurrency(
        [date],
        getBookValueOfDebt(balanceSheet)
      ),
      cashAndShortTermInvestments: convertCurrency(
        [date],
        getCashAndShortTermInvestments(balanceSheet)
      ),
      bookValueOfEquity: convertCurrency(
        [date],
        balanceSheet.totalStockholderEquity
      ),
      noncontrollingInterestInConsolidatedEntity: convertCurrency(
        [date],
        balanceSheet.noncontrollingInterestInConsolidatedEntity
      ),
    };

    state.yearlyBalanceSheets[date].date = balanceSheet.date;
  });

  state.incomeStatement.pastThreeYearsAverageEffectiveTaxRate =
    pastThreeYearIncomeTaxExpense / pastThreeYearIncomeBeforeTax;

  state.balanceSheet.investedCapital =
    state.balanceSheet.bookValueOfEquity +
    state.balanceSheet.bookValueOfDebt -
    state.balanceSheet.cashAndShortTermInvestments;

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
  const mappedCurrentIndustry = industryMappingsMutated[currentIndustryMutated];

  state.currentIndustry = state.industryAverages.find((datum) => {
    return datum.industryName === mappedCurrentIndustry;
  });
  state.currentIndustry.standardDeviationInStockPrices =
    parseFloat(state.currentIndustry.standardDeviationInStockPrices) / 100;
};

const setCurrentEquityRiskPremiumReducer = (state) => {
  const {
    corporateTaxRate,
    countryRiskPremium,
    equityRiskPremium,
    adjDefaultSpread,
  } = state.equityRiskPremiumCountries.find((datum) => {
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

const setGovernmentBondTenYearLastCloseReducer = (state, action) => {
  state.governmentBondTenYearLastClose = action.payload;
};

const setExchangeRateHistoryReducer = (state, action) => {
  state.exchangeRates = action.payload;
};

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLastPriceClose, setLastPriceCloseReducer);
  builder.addCase(setFundamentalsData.fulfilled, (state, action) => {
    setFundamentalsReducer(state, action);
    setCurrentEquityRiskPremiumReducer(state, action);
    setCurrentIndustryAverageReducer(state, action);
  });
  builder.addCase(
    setTenYearGovernmentBondLastClose,
    setGovernmentBondTenYearLastCloseReducer
  );
  builder.addCase(setExchangeRateHistory, setExchangeRateHistoryReducer);
});
