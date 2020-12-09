import { createReducer } from "@reduxjs/toolkit";
import { getFundamentals } from "../actions/fundamentalsActions";
import getSymbolFromCurrency from "currency-symbol-map";
import { monthDateFormat } from "../../shared/utils";
import dayjs from "dayjs";

const initialState = {
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
  const arrayValue = Object.values(financialSheetValues);
  const sumOfFirstFourValues = arrayValue
    .slice(0, periodsToGet)
    .reduce((acc, curr) => {
      return (acc += getValueFromString(curr[valueKey]));
    }, 0);

  return sumOfFirstFourValues;
};

const getIncomeSheetPastQuartersValues = (
  incomeStatement,
  valueKey,
  periodsToGet
) => {
  return getFinancialSheetPastValues(
    incomeStatement.quarterly,
    valueKey,
    periodsToGet
  );
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

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getFundamentals.fulfilled, (state, action) => {
    const { Financials, ...otherData } = action.payload.data;
    const {
      General,
      Highlights: { MostRecentQuarter, MarketCapitalization },
      SharesStats,
      Financials: { Balance_Sheet, Income_Statement },
    } = action.payload.data;

    state.data = {
      ...otherData,
    };

    const quarterBalanceSheet = Balance_Sheet.quarterly[MostRecentQuarter];
    const recentYearlyIncomeStatement = Object.values(
      Income_Statement.yearly
    )[0];

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

      pastThreeYearIncomeBeforeTax = getIncomeSheetPastQuartersValues(
        Income_Statement,
        "incomeBeforeTax",
        pastThreeYearPeriods
      );

      pastThreeYearIncomeTaxExpense = getIncomeSheetPastQuartersValues(
        Income_Statement,
        "incomeTaxExpense",
        pastThreeYearPeriods
      );

      incomeSheetDates = Object.keys(Income_Statement.quarterly).slice(0, 4);

      state.incomeStatement = {
        totalRevenue: getIncomeSheetPastQuartersValues(
          Income_Statement,
          "totalRevenue",
          quarters
        ),
        operatingIncome: getIncomeSheetPastQuartersValues(
          Income_Statement,
          "operatingIncome",
          quarters
        ),
        interestExpense: getIncomeSheetPastQuartersValues(
          Income_Statement,
          "interestExpense",
          quarters
        ),
        minorityInterest: getIncomeSheetPastQuartersValues(
          Income_Statement,
          "minorityInterest",
          quarters
        ),
      };
    } else {
      pastThreeYearIncomeBeforeTax = getFinancialSheetPastValues(
        Income_Statement.yearly,
        "incomeBeforeTax",
        pastPeriodsToGet
      );
      pastThreeYearIncomeTaxExpense = getFinancialSheetPastValues(
        Income_Statement.yearly,
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

    const convertCurrency = getConvertCurrency(action.payload.exchangeRates);

    const valuationCurrencyCode = action.payload.valuationCurrencyCode;

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

    Object.keys(Income_Statement.yearly).forEach((date) => {
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

    Object.keys(Balance_Sheet.yearly).forEach((date) => {
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

    state.price = MarketCapitalization / SharesStats.SharesOutstanding;

    state.balanceSheet.investedCapital =
      state.balanceSheet.bookValueOfEquity +
      state.balanceSheet.bookValueOfDebt -
      state.balanceSheet.cashAndShortTermInvestments;

    state.valuationCurrencyCode = valuationCurrencyCode;
    state.valuationCurrencySymbol = getSymbolFromCurrency(
      valuationCurrencyCode
    );
  });
});
