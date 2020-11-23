import { createReducer } from "@reduxjs/toolkit";
import { setEmployeeOptionsValue } from "../actions/employeeOptionsActions";

const initialState = {
  numberOfOptionsOutstanding: null,
  averageStrikePrice: null,
  averageMaturity: null,
};

export const employeeOptionsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setEmployeeOptionsValue, (state, action) => {
    state[action.payload.key] = action.payload.value;
  });
});
