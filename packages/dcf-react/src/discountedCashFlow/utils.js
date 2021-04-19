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

export const doesReferenceAnotherCell = (expr) =>
  isExpressionDependency(expr) && /([A-Z]+\d+)/.test(expr);

export const isExpressionDependency = (expr) =>
  typeof expr === "string" && expr && expr.charAt(0) === "=";

export const getExpressionWithoutEqualsSign = (expr) =>
  typeof expr === "string" && expr && expr.substring(1);

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

export const validateExp = (trailKeys, expr) => {
  let valid = true;
  const matches = (expr && expr.match(/[A-Z][1-9]+/g)) || [];
  matches.forEach((match) => {
    if (trailKeys.indexOf(match) > -1) {
      valid = false;
    } else {
      valid = true;
    }
  });
  return valid;
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

const arrayMove = (arr, fromIndex, toIndex) => {
  const element = arr[fromIndex];

  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
};

export const assignDependents = (
  cellsTree,
  cellsTreeDependencies,
  nodes,
  rootKey,
) => {
  let currentKeyArray = cellsTree[rootKey];

  nodes.readCells[rootKey] = true;

  // BFS as we must update the most recent
  // children before moving to grandchildren
  while (currentKeyArray.length > 0) {
    let next = [];

    currentKeyArray.forEach((key) => {
      // If we find the element again it means another is dependent
      // on it, so let's move it to the back of the array
      const existingIndex = nodes.allDependents[rootKey].findIndex(
        (x) => x === key,
      );

      if (existingIndex === -1) {
        nodes.allDependents[rootKey].push(key);
      } else {
        arrayMove(
          nodes.allDependents[rootKey],
          existingIndex,
          nodes.allDependents[rootKey].length - 1,
        );
      }

      // Cell is not read if all of the dependent cell keys are not read
      const cellNotRead = cellsTreeDependencies[key].some((key) => {
        return !nodes.readCells[key];
      });

      if (!cellNotRead) {
        nodes.readCells[key] = true;
      }

      if (cellsTree[key]) {
        next.push(...cellsTree[key]);
      }
    });

    currentKeyArray = next;
  }
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

export const getPreviousRowCellKey = (currentCellKey) => {
  const currentColumn = getColumnLetterFromCellKey(currentCellKey);
  const charCode = currentColumn.charCodeAt(0);
  const currentRow = getRowNumberFromCellKey(currentCellKey);

  const previousRowColumn = String.fromCharCode(charCode - 1);
  const previousCellKey = `${previousRowColumn}${currentRow}`;

  return previousCellKey;
};
