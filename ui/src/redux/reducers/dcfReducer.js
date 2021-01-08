import { createReducer } from "@reduxjs/toolkit";
import { updateCells } from "../actions/dcfActions";
import cells from "../../discountedCashFlow/cells";
import cellsTree from "../../discountedCashFlow/cellsTree";
import { getAllDependents, validateExp } from "../../discountedCashFlow/utils";
import { evaluate } from "mathjs";

const initialState = {
  cells,
  cellsTree,
};

const computeExpr = (key, expr, scope) => {
  let value = null;

  if (expr?.charAt(0) !== "=") {
    return { value: expr, expr: expr };
  } else {
    try {
      value = evaluate(expr.substring(1), scope);
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

const cellUpdate = (cells, key, expr) => {
  const scope = {};
  const cellToUpdate = cells[key];

  Object.keys(cells).forEach((key) => {
    const { value } = cells[key];

    scope[key] = value === "" || isNaN(value) ? 0 : parseFloat(value);
  });

  return {
    ...cellToUpdate,
    ...computeExpr(key, expr, scope),
  };
};

export const dcfReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateCells, (state, action) => {
    const cells = state.cells;
    action.payload.forEach(([key, value]) => {
      const allDependents = getAllDependents(cellsTree, key);
      cells[key] = cellUpdate(cells, key, value?.toString());
      const currentDependents = allDependents[key] || [];
      currentDependents.forEach((key) => {
        cells[key] = cellUpdate(cells, key, cells[key].expr);
      });
    });

    state.cells = cells;
  });
});
