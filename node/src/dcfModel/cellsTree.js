import cells from "../../../packages/dcf-react/src/discountedCashFlow/cells";
import filterDuplicates from "../../../packages/dcf-react/src/shared/filterDuplicates";

const cellsTree = {};
// Parents
export const cellsTreeDependencies = {};

Object.keys(cells).forEach((key) => {
  const { expr } = cells[key];

  if (expr) {
    const matches = expr.match(/([A-Z]+\d+)/g);
    const uniqueMatches = filterDuplicates(matches);

    uniqueMatches.forEach((uniqueMatchKey) => {
      cellsTree[uniqueMatchKey] = cellsTree[uniqueMatchKey]
        ? [...cellsTree[uniqueMatchKey], key]
        : [key];
      cellsTreeDependencies[key] = cellsTreeDependencies[key]
        ? [...cellsTreeDependencies[key], uniqueMatchKey]
        : [uniqueMatchKey];
    });
  }
});

export default cellsTree;
