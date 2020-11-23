import { createReducer } from "@reduxjs/toolkit";
import { getFundamentals } from "../actions/fundamentalsActions";

const initialState = {
  data: null,
  currentPrice: null,
  currentBookValueOfDebt: null,
  ttm: null,
};

const getIncomeSheetTTMValue = (incomeStatement, valueKey) => {
  const arrayValue = Object.values(incomeStatement.quarterly);
  const sumOfFirstFourValues = arrayValue.slice(0, 4).reduce((acc, curr) => {
    return (acc += parseFloat(curr[valueKey]));
  }, 0);

  return sumOfFirstFourValues;
};

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getFundamentals.fulfilled, (state, action) => {
    const {
      Highlights: { MostRecentQuarter, MarketCapitalization },
      SharesStats,
      Financials: { Balance_Sheet, Income_Statement },
    } = action.payload;

    state.data = action.payload;

    state.currentPrice = MarketCapitalization / SharesStats.SharesOutstanding;
    state.currentBookValueOfDebt =
      Balance_Sheet.quarterly[MostRecentQuarter].shortLongTermDebt +
      Balance_Sheet.quarterly[MostRecentQuarter].longTermDebt +
      Balance_Sheet.quarterly[MostRecentQuarter].capitalLeaseObligations;
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
