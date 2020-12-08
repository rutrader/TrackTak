import { createReducer } from "@reduxjs/toolkit";
import {
  getTenYearGovernmentBondLastClose,
  getExchangeRateHistory,
} from "../actions/economicDataActions";

const initialState = {
  governmentBondTenYearLastClose: null,
  exchangeRates: null,
};

export const economicDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(
    getTenYearGovernmentBondLastClose.fulfilled,
    (state, action) => {
      state.governmentBondTenYearLastClose =
        action.payload.governmentBondLastClose;
    }
  );
  builder.addCase(getExchangeRateHistory.fulfilled, (state, action) => {
    state.exchangeRates = action.payload;
  });
});
