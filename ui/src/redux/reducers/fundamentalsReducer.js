import { createReducer } from "@reduxjs/toolkit";
import { getFundamentals } from "../actions/fundamentalsActions";

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
  incomeTaxExpense: null,
  incomeBeforeTax: null,
  hasIncomeTTM: null,
};

const getIncomeSheetPastQuartersValues = (
  incomeStatement,
  valueKey,
  periodsToGet
) => {
  const arrayValue = Object.values(incomeStatement.quarterly);
  const sumOfFirstFourValues = arrayValue
    .slice(0, periodsToGet)
    .reduce((acc, curr) => {
      return (acc += parseFloat(curr[valueKey]));
    }, 0);

  return sumOfFirstFourValues;
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

    const quarterBalanceSheet = Balance_Sheet.quarterly[MostRecentQuarter];
    const recentYearlyIncomeStatement = Object.values(
      Income_Statement.yearly
    )[0];

    let bookValueOfDebt = 0;

    if (quarterBalanceSheet.shortLongTermDebt !== null) {
      bookValueOfDebt += parseFloat(
        Balance_Sheet.quarterly[MostRecentQuarter].shortLongTermDebt
      );
    }

    if (quarterBalanceSheet.longTermDebt !== null) {
      bookValueOfDebt += parseFloat(
        Balance_Sheet.quarterly[MostRecentQuarter].longTermDebt
      );
    }

    if (quarterBalanceSheet.capitalLeaseObligations !== null) {
      bookValueOfDebt += parseFloat(
        quarterBalanceSheet.capitalLeaseObligations
      );
    }

    state.data = action.payload;

    state.price = MarketCapitalization / SharesStats.SharesOutstanding;
    state.bookValueOfDebt = bookValueOfDebt;
    state.bookValueOfEquity =
      quarterBalanceSheet.totalStockholderEquity !== null
        ? parseFloat(quarterBalanceSheet.totalStockholderEquity)
        : 0;

    // Non U.S Stocks report cash + shortTermInvestments seperately
    if (quarterBalanceSheet.cashAndShortTermInvestments !== null) {
      state.cashAndShortTermInvestments = parseFloat(
        quarterBalanceSheet.totalStockholderEquity
      );
    } else if (
      quarterBalanceSheet.cash !== null ||
      quarterBalanceSheet.shortTermInvestments !== null
    ) {
      const cash =
        quarterBalanceSheet.cash !== null
          ? parseFloat(quarterBalanceSheet.cash)
          : 0;
      const shortTermInvestments =
        quarterBalanceSheet.shortTermInvestments !== null
          ? parseFloat(quarterBalanceSheet.shortTermInvestments)
          : 0;

      state.cashAndShortTermInvestments = cash + shortTermInvestments;
    } else {
      state.cashAndShortTermInvestments = 0;
    }

    state.noncontrollingInterestInConsolidatedEntity =
      quarterBalanceSheet.noncontrollingInterestInConsolidatedEntity !== null
        ? parseFloat(
            quarterBalanceSheet.noncontrollingInterestInConsolidatedEntity
          )
        : 0;
    state.investedCapital =
      state.bookValueOfEquity +
      state.bookValueOfDebt -
      state.cashAndShortTermInvestments;

    let current;

    state.hasIncomeTTM = General.CountryISO === "US";

    // TODO: Fix when the API fixes the TTM for non-US stocks
    if (state.hasIncomeTTM) {
      const pastThreeYearPeriods = 3 * 4;

      state.incomeBeforeTax = getIncomeSheetPastQuartersValues(
        Income_Statement,
        "incomeBeforeTax",
        pastThreeYearPeriods
      );
      state.incomeTaxExpense = getIncomeSheetPastQuartersValues(
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
      state.incomeBeforeTax = parseFloat(
        recentYearlyIncomeStatement.incomeBeforeTax
      );
      state.incomeTaxExpense = parseFloat(
        recentYearlyIncomeStatement.incomeTaxExpense
      );
      current = {
        totalRevenue: parseFloat(recentYearlyIncomeStatement.totalRevenue),
        operatingIncome: parseFloat(
          recentYearlyIncomeStatement.operatingIncome
        ),
        interestExpense: parseFloat(
          recentYearlyIncomeStatement.interestExpense
        ),
        minorityInterest: parseFloat(
          recentYearlyIncomeStatement.minorityInterest
        ),
      };
    }

    state.current = {
      ...current,
    };
    state.pastThreeYearsAverageEffectiveTaxRate =
      state.incomeTaxExpense / state.incomeBeforeTax;
  });
});
