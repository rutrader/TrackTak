import { createReducer } from "@reduxjs/toolkit";
import { getTenYearGovernmentBonds } from "../actions/governmentBondsActions";

const initialState = {
  data: null,
};

export const governmentBondsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getTenYearGovernmentBonds.fulfilled, (state, action) => {
    state.data = action.payload;
  });
});
