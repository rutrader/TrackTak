import {
  setCells,
  setScope,
  setSheetsValues,
  setSheetsSerializedValues,
  setSheetsDatas,
} from "../actions/dcfActions";
import { createReducer } from "@reduxjs/toolkit";
import cells from "../../discountedCashFlow/cells";
import scopeNameTypeMapping from "../../discountedCashFlow/scopeNameTypeMapping";

const initialState = {
  cells,
  sheetsSerializedValues: null,
  sheetsValues: null,
  sheetsDatas: null,
};

export const dcfReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSheetsDatas, (state, { payload }) => {
    // TODO: When data is made to not modify the passed in data then remove this clone
    // until then it's needed as redux objects are readonly
    state.sheetsDatas = JSON.parse(
      JSON.stringify({
        ...state.sheetsDatas,
        ...payload,
      }),
    );
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
    const modifiedScope = {};

    Object.keys(payload).forEach((key) => {
      let value = payload[key];

      if (
        scopeNameTypeMapping[key] === "million" ||
        scopeNameTypeMapping[key] === "million-currency"
      ) {
        value /= 1000000;
      }

      modifiedScope[key] = value;
    });

    state.scope = {
      ...state.scope,
      ...modifiedScope,
    };
  });
});
