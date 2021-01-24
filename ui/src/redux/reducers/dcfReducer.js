import { createReducer } from "@reduxjs/toolkit";
import { updateCells } from "../actions/dcfActions";
import cells from "../../discountedCashFlow/cells";
import cellsTree from "../../discountedCashFlow/cellsTree";
import {
  getAllDependents,
  getExpressionWithoutEqualsSign,
  isExpressionDependency,
  validateExp,
} from "../../discountedCashFlow/utils";
import {
  create,
  evaluateDependencies,
  addDependencies,
  divideDependencies,
} from "mathjs";
import { IF } from "@formulajs/formulajs/lib/logical";
import { SUM, TRUNC } from "@formulajs/formulajs/lib/math-trig";
import matureMarketEquityRiskPremium from "../../shared/matureMarketEquityRiskPremium";

const math = create({
  evaluateDependencies,
  addDependencies,
  divideDependencies,
});

math.import({
  IF,
  SUM,
  TRUNC,
});

const computeExpr = (key, expr, scope) => {
  let value = null;

  if (!isExpressionDependency(expr)) {
    return { value: expr, expr };
  } else {
    try {
      value = math.evaluate(getExpressionWithoutEqualsSign(expr), scope);
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
});
