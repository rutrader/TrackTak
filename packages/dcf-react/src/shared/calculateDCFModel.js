import { columns } from "../discountedCashFlow/cells";
import cellsTree from "../discountedCashFlow/cellsTree";
import {
  getAllDependents,
  getColumnsBetween,
  isExpressionDependency,
  validateExp,
} from "../discountedCashFlow/utils";
import filterDuplicates from "./filterDuplicates";
import { evaluate } from "./math";

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

const getCellsToUpdate = (property) => {
  const mapCellKeys = () => {
    switch (property) {
      case "totalRevenue":
        return "B2";
      case "operatingIncome":
        return "B4";
      case "pastThreeYearsAverageEffectiveTaxRate":
        return "B5";
      case "investedCapital":
        return "B16";
      case "bookValueOfDebt":
        return ["B26", "B28"];
      case "minorityInterest":
        return "B29";
      case "cashAndShortTermInvestments":
        return "B30";
      case "price":
        return "B35";
      case "sharesOutstanding":
        return "B36";
      case "marginalTaxRate":
        return "M5";
      case "cagrYearOneToFive":
      case "riskFreeRate":
        return [
          ...getColumnsBetween(columns, "C", "L").map((column) => `${column}2`),
          "M2",
          "M11",
          "M7",
          "B21",
        ];
      case "yearOfConvergence":
      case "ebitTargetMarginInYearTen":
        return getColumnsBetween(columns, "C", "L").map(
          (column) => `${column}3`,
        );
      case "totalCostOfCapital":
        return "C11";
      case "salesToCapitalRatio":
        return "C15";
      case "netOperatingLoss":
        return "B9";
      case "probabilityOfFailure":
        return "B25";
      case "proceedsAsAPercentageOfBookValue":
      case "bookValueOfEquity":
        return "B26";
      case "valueOfAllOptionsOutstanding":
        return "B33";
      case "matureMarketEquityRiskPremium":
        return "M11";
      default:
        throw new Error(`${property} for cell to update not found`);
    }
  };

  const value = mapCellKeys();

  return Array.isArray(value) ? value : [value];
};

// Check if current scope same as this one and don't update if it is
const calculateDCFModel = (cells, currentScope, existingScope) => {
  const scope = {
    ...existingScope,
    ...currentScope,
  };
  const newCells = { ...cells };
  const cellsUpdate = makeCellUpdate(newCells, scope);
  const cellsToUpdate = filterDuplicates(
    Object.keys(currentScope).flatMap(getCellsToUpdate),
  );

  cellsToUpdate.forEach((key) => {
    const allDependents = getAllDependents(cellsTree, key);
    const currentDependents = allDependents[key] || [];

    [key, ...currentDependents].forEach((key) => {
      newCells[key] = cellsUpdate(key, newCells[key].expr);
    });
  });

  return newCells;
};

export default calculateDCFModel;
