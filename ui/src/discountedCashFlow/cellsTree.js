import cells from "./cells";
import { cellKeyRegex } from "./utils";

const cellsTree = {};

Object.keys(cells).forEach((key) => {
  const { expr } = cells[key];

  if (expr) {
    const matches = expr.match(cellKeyRegex);
    const uniqueMatches = [...new Set(matches)];

    uniqueMatches.forEach((uniqueMatchKey) => {
      cellsTree[uniqueMatchKey] = cellsTree[uniqueMatchKey]
        ? [...cellsTree[uniqueMatchKey], key]
        : [key];
    });
  }
});

export default cellsTree;
