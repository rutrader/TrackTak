import { createReducer } from "@reduxjs/toolkit";
import { getFundamentals } from "../actions/fundamentalsActions";
import getSymbolFromCurrency from "currency-symbol-map";

const initialState = {
  data: null,
  price: null,
  bookValueOfDebt: null,
  bookValueOfEquity: null,
  cashAndShortTermInvestments: null,
  noncontrollingInterestInConsolidatedEntity: null,
  investedCapital: null,
  current: null,
  pastThreeYearsAverageEffectiveTaxRate: null,
  hasIncomeTTM: null,
  valuationCurrency: null,
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

const getIncomeSheetTTMValue = (incomeStatement, valueKey) =>
  getIncomeSheetPastQuartersValues(incomeStatement, valueKey, 4);

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getFundamentals.fulfilled, (state, action) => {
    const {
      General,
      Highlights: { MostRecentQuarter, MarketCapitalization },
      SharesStats,
      Financials: { Balance_Sheet, Income_Statement },
    } = action.payload;

    state.valuationCurrency = getSymbolFromCurrency(
      Balance_Sheet.currency_symbol
    );

    const quarterBalanceSheet = Balance_Sheet.quarterly[MostRecentQuarter];
    const recentYearlyIncomeStatement = Object.values(
      Income_Statement.yearly
    )[0];

    state.bookValueOfDebt += getValueFromString(
      quarterBalanceSheet.shortLongTermDebt
    );

    state.bookValueOfDebt += getValueFromString(
      quarterBalanceSheet.longTermDebt
    );

    state.bookValueOfDebt += getValueFromString(
      quarterBalanceSheet.capitalLeaseObligations
    );

    state.data = action.payload;

    state.price = MarketCapitalization / SharesStats.SharesOutstanding;

    // UK stocks are quoted in pence so multiply it
    if (General.CountryISO === "UK") {
      state.price *= 100;
    }

    state.bookValueOfEquity = getValueFromString(
      quarterBalanceSheet.totalStockholderEquity
    );

    // Non U.S Stocks report cash + shortTermInvestments seperately
    if (quarterBalanceSheet.cashAndShortTermInvestments !== null) {
      state.cashAndShortTermInvestments = getValueFromString(
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

      state.cashAndShortTermInvestments = cash + shortTermInvestments;
    } else {
      state.cashAndShortTermInvestments = 0;
    }

    state.noncontrollingInterestInConsolidatedEntity = getValueFromString(
      quarterBalanceSheet.noncontrollingInterestInConsolidatedEntity
    );
    state.investedCapital =
      state.bookValueOfEquity +
      state.bookValueOfDebt -
      state.cashAndShortTermInvestments;

    let current;

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

      current = {
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

      current = {
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
    state.current = {
      ...current,
    };
    state.pastThreeYearsAverageEffectiveTaxRate =
      pastThreeYearIncomeTaxExpense / pastThreeYearIncomeBeforeTax;
  });
});
