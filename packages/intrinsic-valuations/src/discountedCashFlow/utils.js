export const getColumnsBetween = (columns, startColumn, endColumn) => {
  const start = columns.indexOf(startColumn);
  const end = columns.indexOf(endColumn);

  // + 1 to make it inclusive
  return columns.slice(start, end + 1);
};

export const getCellsForRows = (columns, rows) => {
  return rows.flatMap((row) => columns.map((column) => column + row));
};

export const isExpressionDependency = (expr) =>
  typeof expr === "string" && expr && expr.charAt(0) === "=";

export const getRowNumberFromCellKey = (cellKey) =>
  parseInt(cellKey.replace(/[A-Z]+/gi, ""), 10);

export const getColumnLetterFromCellKey = (cellKey) =>
  cellKey.replace(/[0-9]/gi, "");

export const getCellsForRowsBetween = (
  columns,
  startColumn,
  endColumn,
  rows,
) => {
  const columnsSliced = getColumnsBetween(columns, startColumn, endColumn);
  const cells = getCellsForRows(columnsSliced, rows);

  return cells;
};

export const getNumberOfRows = (cells) => {
  let highestNumberRow = 0;

  Object.keys(cells).forEach((key) => {
    const currentNumber = getRowNumberFromCellKey(key);

    if (currentNumber > highestNumberRow) {
      highestNumberRow = currentNumber;
    }
  });

  return highestNumberRow;
};

export const getNumberOfColumns = (cells) =>
  getColumnsTo(getHighestColumn(cells)).length;

export const startColumn = "A";

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
    const currentColumn = getColumnLetterFromCellKey(key);
    const charCode = currentColumn.charCodeAt(0);

    if (charCode > highestColumnCharCode) {
      highestColumnCharCode = charCode;
    }
  });

  return String.fromCharCode(highestColumnCharCode);
};

export const padCellKeys = (sortedCellKeys) => {
  const paddedCellKeys = [];

  sortedCellKeys.forEach((cellKey, i) => {
    paddedCellKeys.push(cellKey);

    if (!sortedCellKeys[i + 1]) return;

    const columnCharCode = getColumnLetterFromCellKey(cellKey).charCodeAt(0);
    const nextColumnCharCode = getColumnLetterFromCellKey(
      sortedCellKeys[i + 1],
    ).charCodeAt(0);

    const column = String.fromCharCode(columnCharCode);
    const isNextColumnAlphabetically =
      nextColumnCharCode === columnCharCode + 1;

    if (!isNextColumnAlphabetically && column !== "M") {
      const row = getRowNumberFromCellKey(cellKey);
      const diffInColumnsToEnd =
        parseInt("M".charCodeAt(0), 10) - columnCharCode;

      for (let index = 1; index <= diffInColumnsToEnd; index++) {
        const nextColumn = String.fromCharCode(columnCharCode + index);
        const nextCellKey = `${nextColumn}${row}`;

        paddedCellKeys.push(nextCellKey);
      }
    }
  });
  return paddedCellKeys;
};

export const getCellsBetween = (
  startColumnCharCode,
  endColumnCharCode,
  startRowNumber,
  endRowNumber,
  cells,
) => {
  const cellsBetween = [];

  Object.keys(cells).forEach((key) => {
    const startCharCode = startColumnCharCode.charCodeAt(0);
    const endCharCode = endColumnCharCode.charCodeAt(0);
    const currentColumn = getColumnLetterFromCellKey(key);
    const charCode = currentColumn.charCodeAt(0);
    const currentRow = getRowNumberFromCellKey(key);

    if (
      charCode >= startCharCode &&
      charCode <= endCharCode &&
      currentRow >= startRowNumber &&
      currentRow <= endRowNumber
    ) {
      cellsBetween.push(key);
    }
  });
  return cellsBetween;
};
