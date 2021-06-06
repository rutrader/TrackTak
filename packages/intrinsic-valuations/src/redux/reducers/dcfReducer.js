import {
  setCells,
  setScope,
  setSheetsValues,
  setSheetsSerializedValues,
} from "../actions/dcfActions";
import { createReducer } from "@reduxjs/toolkit";
import cells from "../../discountedCashFlow/cells";

const initialState = {
  cells,
  sheetsSetializedValues: null,
  sheetsValues: null,
};

export const dcfReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSheetsValues, (state, { payload }) => {
    state.sheetsValues = {
      ...state.sheetsValues,
      ...payload,
    };
  });
  builder.addCase(setSheetsSerializedValues, (state, { payload }) => {
    state.sheetsSetializedValues = {
      ...state.sheetsSetializedValues,
      ...payload,
    };
  });
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
