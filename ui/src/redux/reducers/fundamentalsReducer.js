import { createReducer } from "@reduxjs/toolkit";
import { getFundamentals } from "../actions/fundamentalsActions";
import getSymbolFromCurrency from "currency-symbol-map";

const initialState = {
  data: null,
  price: null,
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
  hasIncomeTTM: null,
  valuationCurrencySymbol: null,
  valuationCurrencyCode: null,
};

export const getValueFromString = (value) => {
  return value ? parseFloat(value) : 0;
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
  if (baseCurrency === quotedCurrency) return valueToConvert;

  const newCurrencyValue = exchangeRatePairs[baseCurrency][quotedCurrency];

  return (valueToConvert *= newCurrencyValue);
};

const getIncomeSheetTTMValue = (incomeStatement, valueKey) =>
  getIncomeSheetPastQuartersValues(incomeStatement, valueKey, 4);

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getFundamentals.fulfilled, (state, action) => {
    const {
      General,
      Highlights: { MostRecentQuarter, MarketCapitalization },
      SharesStats,
      Financials: { Balance_Sheet, Income_Statement },
    } = action.payload.data;
    state.data = action.payload.data;

    const quarterBalanceSheet = Balance_Sheet.quarterly[MostRecentQuarter];
    const recentYearlyIncomeStatement = Object.values(
      Income_Statement.yearly
    )[0];

    let bookValueOfDebt = 0;

    bookValueOfDebt += getValueFromString(
      quarterBalanceSheet.shortLongTermDebt
    );

    bookValueOfDebt += getValueFromString(quarterBalanceSheet.longTermDebt);

    bookValueOfDebt += getValueFromString(
      quarterBalanceSheet.capitalLeaseObligations
    );

    state.balanceSheet = {
      bookValueOfDebt,
      bookValueOfEquity: getValueFromString(
        quarterBalanceSheet.totalStockholderEquity
      ),
      noncontrollingInterestInConsolidatedEntity: getValueFromString(
        quarterBalanceSheet.noncontrollingInterestInConsolidatedEntity
      ),
    };

    state.price = MarketCapitalization / SharesStats.SharesOutstanding;

    // Non U.S Stocks report cash + shortTermInvestments seperately
    if (quarterBalanceSheet.cashAndShortTermInvestments !== null) {
      state.balanceSheet.cashAndShortTermInvestments = getValueFromString(
        quarterBalanceSheet.totalStockholderEquity
      );
    } else if (
      quarterBalanceSheet.cash !== null ||
      quarterBalanceSheet.shortTermInvestments !== null
    ) {
      const cash = getValueFromString(quarterBalanceSheet.cash);
      const shortTermInvestments = getValueFromString(
        quarterBalanceSheet.shortTermInvestments
      );

      state.balanceSheet.cashAndShortTermInvestments =
        cash + shortTermInvestments;
    } else {
      state.balanceSheet.cashAndShortTermInvestments = 0;
    }

    state.balanceSheet.investedCapital =
      state.bookValueOfEquity +
      state.bookValueOfDebt -
      state.cashAndShortTermInvestments;

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
        totalRevenue: getValueFromString(
          recentYearlyIncomeStatement.totalRevenue
        ),
        operatingIncome: getValueFromString(
          recentYearlyIncomeStatement.operatingIncome
        ),
        interestExpense: getValueFromString(
          recentYearlyIncomeStatement.interestExpense
        ),
        minorityInterest: getValueFromString(
          recentYearlyIncomeStatement.minorityInterest
        ),
      };
    }
    state.incomeStatement.pastThreeYearsAverageEffectiveTaxRate =
      pastThreeYearIncomeTaxExpense / pastThreeYearIncomeBeforeTax;

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
    state.valuationCurrencyCode = valuationCurrencyCode;
    state.valuationCurrencySymbol = getSymbolFromCurrency(
      valuationCurrencyCode
    );
  });
});
