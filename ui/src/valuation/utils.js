import { all } from "mathjs";
import { generatedCells } from "./initialData";

export const getColumnsBetween = (startColumn, endColumn) => {
  const columns = generatedCells.columns;
  const start = columns.indexOf(startColumn);
  const end = columns.indexOf(endColumn);

  // + 1 to make it inclusive
  return columns.slice(start, end + 1);
};

export const getCellsForColumns = (columns) => {
  return columns.flatMap((column) =>
    generatedCells.rows.map((row) => column + row)
  );
};

export const getCellsForRows = (rows) => {
  return rows.flatMap((row) =>
    generatedCells.columns.map((column) => column + row)
  );
};

export const validateExp = (data, trailKeys, expr) => {
  let valid = true;
  const matches = expr?.match(/[A-Z][1-9]+/g) || [];
  matches.forEach((match) => {
    if (trailKeys.indexOf(match) > -1) {
      valid = false;
    } else {
      valid = true;
    }
  });
  return valid;
};

export const setAllDependents = (key, dataDependentsTree, allDependents) => {
  const cellsToUpdate = dataDependentsTree[key] || [];

  cellsToUpdate.forEach((key) => {
    if (!allDependents[key]) {
      allDependents[key] = key;

      setAllDependents(key, dataDependentsTree, allDependents);
    }
  });
};
