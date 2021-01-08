import cells from "./cells";

const cellsTree = {};

Object.keys(cells).forEach((key) => {
  const { expr } = cells[key];

  if (expr) {
    const matches = expr.match(/([A-Z])\w+/g);
    const uniqueMatches = [...new Set(matches)];

    uniqueMatches.forEach((uniqueMatchKey) => {
      cellsTree[uniqueMatchKey] = cellsTree[uniqueMatchKey]
        ? [...cellsTree[uniqueMatchKey], key]
        : [key];
    });
  }
});

export default cellsTree;
