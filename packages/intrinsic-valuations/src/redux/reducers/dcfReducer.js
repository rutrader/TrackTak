import {
  setCells,
  setScope,
  setSheetsValues,
  setSheetsSerializedValues,
  setSheetsDatas,
} from "../actions/dcfActions";
import { createReducer } from "@reduxjs/toolkit";
import cells from "../../spreadsheet/cells";

const initialState = {
  cells,
  sheetsSerializedValues: null,
  sheetsValues: null,
  sheetsDatas: null,
};

export const dcfReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSheetsDatas, (state, { payload }) => {
    state.sheetsDatas = {
      ...state.sheetsDatas,
      ...payload,
    };
  });
  builder.addCase(setSheetsValues, (state, { payload }) => {
    state.sheetsValues = {
      ...state.sheetsValues,
      ...payload,
    };
  });
  builder.addCase(setSheetsSerializedValues, (state, { payload }) => {
    state.sheetsSerializedValues = {
      ...state.sheetsSerializedValues,
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
