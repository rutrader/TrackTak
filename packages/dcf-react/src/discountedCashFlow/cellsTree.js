import cells from "./cells";
import filterDuplicates from "../shared/filterDuplicates";

const cellsTree = {};

Object.keys(cells).forEach((key) => {
  const { expr } = cells[key];

  if (expr) {
    const matches = expr.match(/([A-Z]+\d+)/g);
    const uniqueMatches = filterDuplicates(matches);

    uniqueMatches.forEach((uniqueMatchKey) => {
      cellsTree[uniqueMatchKey] = cellsTree[uniqueMatchKey]
        ? [...cellsTree[uniqueMatchKey], key]
        : [key];
    });
  }
});

export default cellsTree;
