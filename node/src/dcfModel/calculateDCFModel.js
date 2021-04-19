import { evaluate } from "../../../packages/dcf-react/src/shared/math";
import cellsTree, { cellsTreeDependencies } from "./cellsTree";
import {
  assignDependents,
  isExpressionDependency,
  validateExp,
} from "../../../packages/dcf-react/src/discountedCashFlow/utils";
import filterDuplicates from "../../../packages/dcf-react/src/shared/filterDuplicates";

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

const getRootCellsToUpdate = (property) => {
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
        return ["C2"];
      case "riskFreeRate":
        return ["H2", "M11", "M7", "B21"];
      case "yearOfConvergence":
      case "ebitTargetMarginInYearTen":
        return "C3";
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

// TODO: Ignore duplicates in inner and convert to dependency-graph
// 1. traverse the children of the changed root node to the leaf node, mark the nodes to the dependencies
// 2. go back to the root
// 3. BFS calculate each node and mark as read until we get to a node which depends on multiple parents
// 4. Go back to step 2 for the other root node
// 5. Continue down to the leaf end

const calculateDCFModel = (cells, existingScope, currentScope) => {
  const newCells = { ...cells };
  const newScope = {
    ...existingScope,
    ...currentScope,
  };

  Object.keys(cells).forEach((key) => {
    const value = cells[key].value;

    newScope[key] = value === "" || isNaN(value) ? 0 : parseFloat(value);
  });

  const cellsToUpdate = filterDuplicates(
    Object.keys(currentScope).flatMap(getRootCellsToUpdate),
  );

  const nodes = {
    allDependents: {},
    readCells: {},
  };

  cellsToUpdate.forEach((key) => {
    // Ignore fully read cells
    if (!nodes.readCells[key]) {
      nodes.allDependents[key] = [];

      assignDependents(cellsTree, cellsTreeDependencies, nodes, key);

      const currentDependents = nodes.allDependents[key];

      [key, ...currentDependents].forEach((key) => {
        const computedCell = computeExpr(key, newCells[key].expr, newScope);
        newCells[key] = {
          ...cells[key],
          ...computedCell,
        };
        newScope[key] = computedCell.value;
      });
    }
  });

  return newCells;
};

export default calculateDCFModel;
