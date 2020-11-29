import { createReducer } from "@reduxjs/toolkit";
import { getFundamentals } from "../actions/fundamentalsActions";

const initialState = {
  data: null,
  currentPrice: null,
  currentBookValueOfDebt: null,
  currentBookValueOfEquity: null,
  cashAndShortTermInvestments: null,
  noncontrollingInterestInConsolidatedEntity: null,
  investedCapital: null,
  ttm: null,
  pastThreeYearsAverageEffectiveTaxRate: null,
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
      Highlights: { MostRecentQuarter, MarketCapitalization },
      SharesStats,
      Financials: { Balance_Sheet, Income_Statement },
    } = action.payload;

    const quarterBalanceSheet = Balance_Sheet.quarterly[MostRecentQuarter];
    let currentBookValueOfDebt = 0;

    if (quarterBalanceSheet.shortLongTermDebt !== null) {
      currentBookValueOfDebt += parseFloat(
        Balance_Sheet.quarterly[MostRecentQuarter].shortLongTermDebt
      );
    }

    if (quarterBalanceSheet.longTermDebt !== null) {
      currentBookValueOfDebt += parseFloat(
        Balance_Sheet.quarterly[MostRecentQuarter].longTermDebt
      );
    }

    if (quarterBalanceSheet.capitalLeaseObligations !== null) {
      currentBookValueOfDebt += parseFloat(
        quarterBalanceSheet.capitalLeaseObligations
      );
    }

    state.data = action.payload;

    state.currentPrice = MarketCapitalization / SharesStats.SharesOutstanding;
    state.currentBookValueOfDebt = currentBookValueOfDebt;
    state.currentBookValueOfEquity =
      quarterBalanceSheet.totalStockholderEquity !== null
        ? parseFloat(quarterBalanceSheet.totalStockholderEquity)
        : 0;
    state.cashAndShortTermInvestments =
      quarterBalanceSheet.cashAndShortTermInvestments !== null
        ? parseFloat(quarterBalanceSheet.totalStockholderEquity)
        : 0;
    state.noncontrollingInterestInConsolidatedEntity =
      quarterBalanceSheet.noncontrollingInterestInConsolidatedEntity !== null
        ? parseFloat(
            quarterBalanceSheet.noncontrollingInterestInConsolidatedEntity
          )
        : 0;
    state.investedCapital =
      state.currentBookValueOfEquity +
      state.currentBookValueOfDebt -
      state.cashAndShortTermInvestments;
    const pastThreeYearPeriods = 3 * 4;
    const incomeBeforeTax = getIncomeSheetPastQuartersValues(
      Income_Statement,
      "incomeBeforeTax",
      pastThreeYearPeriods
    );
    const incomeTaxExpense = getIncomeSheetPastQuartersValues(
      Income_Statement,
      "incomeTaxExpense",
      pastThreeYearPeriods
    );
    state.pastThreeYearsAverageEffectiveTaxRate =
      incomeTaxExpense / incomeBeforeTax;
    state.ttm = {
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
  });
});
