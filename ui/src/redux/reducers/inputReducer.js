import { createReducer } from "@reduxjs/toolkit";
import { setValue } from "../actions/inputActions";

const initialState = {
  numberOfOptionsOutstanding: null,
  averageStrikePrice: null,
  averageMaturityOfOptions: null,
  averageMaturityOfDebt: null,
  pretaxCostOfDebt: null,
  bookValueOfConvertibleDebt: null,
  interestExpenseOnConvertibleDebt: null,
  maturityOfConvertibleDebt: null,
  numberOfPreferredShares: null,
  marketPricePerShare: null,
  annualDividendPerShare: null,
  cagrYearOneToFive: null,
  ebitTargetMarginInYearTen: null,
  yearOfConvergence: null,
  salesToCapitalRatio: null,
};

export const inputReducer = createReducer(initialState, (builder) => {
  builder.addCase(setValue, (state, action) => {
    state[action.payload.key] = action.payload.value;
  });
});
