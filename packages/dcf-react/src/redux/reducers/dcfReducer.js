import { createReducer } from "@reduxjs/toolkit";
import { setIsYoyGrowthToggled, updateCells } from "../actions/dcfActions";
import cells from "../../discountedCashFlow/cells";
import {
  getCellsBetween,
  getPreviousRowCellKey,
} from "../../discountedCashFlow/utils";
import matureMarketEquityRiskPremium from "../../shared/matureMarketEquityRiskPremium";
import isNil from "lodash/isNil";
import calculateDCFModel from "../../shared/calculateDCFModel";

const initialState = {
  cells,
  isYoyGrowthToggled: false,
  scope: {
    matureMarketEquityRiskPremium,
  },
};

export const dcfReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateCells, (state, action) => {
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
