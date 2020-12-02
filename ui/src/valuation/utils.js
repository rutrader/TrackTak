export const getColumnsBetween = (columns, startColumn, endColumn) => {
  const start = columns.indexOf(startColumn);
  const end = columns.indexOf(endColumn);

  // + 1 to make it inclusive
  return columns.slice(start, end + 1);
};

export const getCellsForColumns = (columns, rows) => {
  return columns.flatMap((column) => rows.map((row) => column + row));
};

export const getCellsForRows = (columns, rows) => {
  return rows.flatMap((row) => columns.map((column) => column + row));
};

export const validateExp = (trailKeys, expr) => {
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

export const getNumberOfRows = (data) => {
  let highestNumberRow = 0;

  Object.keys(data).forEach((key) => {
    const currentNumber = parseInt(key.replace(/[A-Za-z]/, ""));

    if (currentNumber > highestNumberRow) {
      highestNumberRow = currentNumber;
    }
  });

  return highestNumberRow;
};

const startColumn = "A";

export const getColumnsTo = (endColumnLetter) => {
  const endCharCode = endColumnLetter.charCodeAt(0);
  const columns = [];

  for (
    let currentCharCode = startColumn.charCodeAt(0);
    currentCharCode <= endCharCode;
    currentCharCode++
  ) {
    const column = String.fromCharCode(currentCharCode);

    columns.push(column);
  }

  return columns;
};

export const getHighestColumn = (data) => {
  let highestColumnCharCode = 0;

  Object.keys(data).forEach((key) => {
    const currentColumn = key.replace(/[0-9]/, "");
    const charCode = currentColumn.charCodeAt(0);

    if (charCode > highestColumnCharCode) {
      highestColumnCharCode = charCode;
    }
  });

  return String.fromCharCode(highestColumnCharCode);
};

export const replacePlaceholderWithValue = (cell, placeholder, value) =>
  cell.expr.replace(`{${placeholder}}`, value);
