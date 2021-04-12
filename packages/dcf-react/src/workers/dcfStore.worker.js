import 'nested-worker/worker.js';
import {
  setIsYoyGrowthToggled,
  updateModelCells,
} from "../redux/actions/dcfActions";
import {
  getCellsBetween,
  getPreviousRowCellKey,
} from "../discountedCashFlow/utils";
import isNil from "lodash/isNil";
import calculateDCFModel from "../shared/calculateDCFModel";
import dcfInitialState from "../shared/dcfInitialState";
import { createStore } from "redux";
import { exposeStore } from "redux-in-worker";
import { createReducer } from "@reduxjs/toolkit";

export const reducer = createReducer(dcfInitialState, (builder) => {
  builder.addCase(updateModelCells, (state, action) => {
    const currentScope = action.payload;
    const newCells = calculateDCFModel(state.cells, currentScope, state.scope);

    state.cells = newCells;
    state.scope = {
      ...state.scope,
      ...currentScope,
    };
  });
  builder.addCase(setIsYoyGrowthToggled, (state, action) => {
    state.isYoyGrowthToggled = action.payload;
    const cellsBetween = getCellsBetween("C", "M", 2, 17, state.cells);

    cellsBetween.forEach((key) => {
      const currentCell = state.cells[key];
      const previousCellKey = getPreviousRowCellKey(key);
      const previousCell = state.cells[previousCellKey];

      if (!isNil(previousCell.value)) {
        state.cells[key].yoyGrowthValue =
          (currentCell.value - previousCell.value) / currentCell.value;
      }
    });
  });
});

const store = createStore(reducer);

exposeStore(store);
