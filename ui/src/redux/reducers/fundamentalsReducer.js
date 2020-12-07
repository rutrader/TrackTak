import { createReducer } from "@reduxjs/toolkit";
import { getFundamentals } from "../actions/fundamentalsActions";
import getSymbolFromCurrency from "currency-symbol-map";

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

const getConvertCurrency = (exchangeRatePairs) => (
  valueToConvert,
  baseCurrency,
  quotedCurrency
) => {
  const valueAsANumber = getValueFromString(valueToConvert);

  if (baseCurrency === quotedCurrency || isNaN(parseFloat(valueAsANumber)))
    return valueAsANumber;

  const newCurrencyValue = exchangeRatePairs[baseCurrency][quotedCurrency];

  return valueAsANumber * newCurrencyValue;
};

const getIncomeSheetTTMValue = (incomeStatement, valueKey) =>
  getIncomeSheetPastQuartersValues(incomeStatement, valueKey, 4);

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

    // TODO: Fix when the API fixes the TTM for non-US stocks
    if (state.hasIncomeTTM) {
      const pastThreeYearPeriods = pastPeriodsToGet * 4;

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

      state.incomeStatement = {
        totalRevenue: getIncomeSheetTTMValue(Income_Statement, "totalRevenue"),
        operatingIncome: getIncomeSheetTTMValue(
          Income_Statement,
          "operatingIncome"
        ),
        interestExpense: getIncomeSheetTTMValue(
          Income_Statement,
          "interestExpense"
        ),
        minorityInterest: getIncomeSheetTTMValue(
          Income_Statement,
          "minorityInterest"
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

      state.incomeStatement = {
        totalRevenue: recentYearlyIncomeStatement.totalRevenue,
        operatingIncome: recentYearlyIncomeStatement.operatingIncome,
        interestExpense: recentYearlyIncomeStatement.interestExpense,
        minorityInterest: recentYearlyIncomeStatement.minorityInterest,
      };
    }

    const exchangeRatePairs = action.payload.exchangeRatePairs;
    const convertCurrency = getConvertCurrency(exchangeRatePairs);

    // UK stocks are quoted in pence so we convert it to GBP for ease of use
    const valuationCurrencyCode =
      General.CurrencyCode === "GBX" ? "GBP" : General.CurrencyCode;

    Object.keys(state.incomeStatement).forEach((property) => {
      state.incomeStatement[property] = convertCurrency(
        state.incomeStatement[property],
        Income_Statement.currency_symbol,
        valuationCurrencyCode
      );
    });

    Object.keys(state.balanceSheet).forEach((property) => {
      state.balanceSheet[property] = convertCurrency(
        state.balanceSheet[property],
        Balance_Sheet.currency_symbol,
        valuationCurrencyCode
      );
    });

    state.yearlyIncomeStatements = {};

    Object.keys(Income_Statement.yearly).forEach((property) => {
      const incomeStatement = Income_Statement.yearly[property];

      state.yearlyIncomeStatements[property] = {
        totalRevenue: incomeStatement.totalRevenue,
        operatingIncome: incomeStatement.operatingIncome,
        interestExpense: incomeStatement.interestExpense,
        minorityInterest: incomeStatement.minorityInterest,
      };

      Object.keys(state.yearlyIncomeStatements[property]).forEach((key) => {
        state.yearlyIncomeStatements[property][key] = convertCurrency(
          incomeStatement[key],
          Income_Statement.currency_symbol,
          valuationCurrencyCode
        );
      });

      state.yearlyIncomeStatements[property].date = incomeStatement.date;
    });

    state.yearlyBalanceSheets = {};

    Object.keys(Balance_Sheet.yearly).forEach((property) => {
      const balanceSheet = Balance_Sheet.yearly[property];

      state.yearlyBalanceSheets[property] = {
        bookValueOfDebt: convertCurrency(
          getBookValueOfDebt(balanceSheet),
          Balance_Sheet.currency_symbol,
          valuationCurrencyCode
        ),
        cashAndShortTermInvestments: convertCurrency(
          getCashAndShortTermInvestments(balanceSheet),
          Balance_Sheet.currency_symbol,
          valuationCurrencyCode
        ),
        bookValueOfEquity: convertCurrency(
          balanceSheet.totalStockholderEquity,
          Balance_Sheet.currency_symbol,
          valuationCurrencyCode
        ),
        noncontrollingInterestInConsolidatedEntity:
          balanceSheet.noncontrollingInterestInConsolidatedEntity,
      };

      Object.keys(state.yearlyBalanceSheets[property]).forEach((key) => {
        state.yearlyBalanceSheets[property][key] = balanceSheet[key]
          ? convertCurrency(
              balanceSheet[key],
              Balance_Sheet.currency_symbol,
              valuationCurrencyCode
            )
          : state.yearlyBalanceSheets[property][key];
      });

      state.yearlyBalanceSheets[property].date = balanceSheet.date;
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
