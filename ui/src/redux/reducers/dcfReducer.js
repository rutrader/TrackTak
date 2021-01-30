import { createReducer } from "@reduxjs/toolkit";
import { setIsYoyGrowthToggled, updateCells } from "../actions/dcfActions";
import cells from "../../discountedCashFlow/cells";
import cellsTree from "../../discountedCashFlow/cellsTree";
import {
  getAllDependents,
  getColumnLetterFromCellKey,
  getRowNumberFromCellKey,
  isExpressionDependency,
  validateExp,
} from "../../discountedCashFlow/utils";
import matureMarketEquityRiskPremium from "../../shared/matureMarketEquityRiskPremium";
import { evaluate } from "../../shared/math";

const computeExpr = (key, expr, scope) => {
  let value = null;

  if (!isExpressionDependency(expr)) {
    return { value: expr, expr };
  } else {
    try {
      value = evaluate(expr, scope);
    } catch (e) {
      value = null;
    }

    if (value !== null && validateExp([key], expr)) {
      return { className: "equation", value, expr };
    } else {
      return { className: "error", value: "error", expr };
    }
  }
};

const makeCellUpdate = (cells, scope) => (key, expr) => {
  const newScope = {
    ...scope,
  };
  const cellToUpdate = cells[key];

  Object.keys(cells).forEach((key) => {
    const { value } = cells[key];

    newScope[key] = value === "" || isNaN(value) ? 0 : parseFloat(value);
  });

  return {
    ...cellToUpdate,
    ...computeExpr(key, expr, newScope),
  };
};

const calculateNewCells = (cells, cellsToUpdate, scope) => {
  const newCells = { ...cells };
  const cellsUpdate = makeCellUpdate(newCells, scope);

  cellsToUpdate.forEach((key) => {
    const allDependents = getAllDependents(cellsTree, key);
    const currentDependents = allDependents[key] || [];

    [key, ...currentDependents].forEach((key) => {
      newCells[key] = cellsUpdate(key, newCells[key].expr);
    });
  });

  return newCells;
};

const initialState = {
  cells,
  isYoyGrowthToggled: false,
  scope: {
    matureMarketEquityRiskPremium,
  },
};

export const dcfReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateCells, (state, action) => {
    const { cellsToUpdate, scope } = action.payload;
    const newScope = {
      ...state.scope,
      ...scope,
    };
    const newCells = calculateNewCells(state.cells, cellsToUpdate, newScope);

    state.cells = newCells;
    state.scope = newScope;
  });
  builder.addCase(setIsYoyGrowthToggled, (state, action) => {
    state.isYoyGrowthToggled = action.payload;

    Object.keys(state.cells).forEach((key) => {
      const currentCell = state.cells[key];
      const cCharCode = "C".charCodeAt(0);
      const mCharCode = "M".charCodeAt(0);
      const currentColumn = getColumnLetterFromCellKey(key);
      const charCode = currentColumn.charCodeAt(0);
      const currentRow = getRowNumberFromCellKey(key);
      const previousRowColumn = String.fromCharCode(charCode - 1);
      const previousCellKey = `${previousRowColumn}${currentRow}`;
      const previousCell = state.cells[previousCellKey];

      if (
        charCode >= cCharCode &&
        charCode <= mCharCode &&
        currentRow >= 2 &&
        currentRow <= 17
      ) {
        if (previousCell.value !== undefined) {
          state.cells[key].yoyGrowthValue =
            (currentCell.value - previousCell.value) / currentCell.value;
        }
      }
    });
  });
});
