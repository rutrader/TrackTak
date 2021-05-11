import { setCells, setScope } from "../actions/dcfActions";
import { createReducer } from "@reduxjs/toolkit";
import cells from "../../discountedCashFlow/cells";

const initialState = {
  cells,
};

export const dcfReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCells, (state, { payload }) => {
    state.cells = {
      ...state.cells,
      ...payload,
    };
  });
  builder.addCase(setScope, (state, { payload }) => {
    state.scope = {
      ...state.scope,
      ...payload,
    };
  });
});
