import { isEmpty } from "./util.js";

const getFrozenCell = (xCell, id) => {
  let frozenCell = {
    id,
  };
  const col = parseInt(xCell.charAt(0), 36) - 11;
  const row = xCell.charAt(1) - 2;
  if (col >= 0) {
    frozenCell.col = col;
  }
  if (row >= 0) {
    frozenCell.row = row;
  }

  if (frozenCell.col === undefined && frozenCell.row === undefined) {
    return null;
  }

  return frozenCell;
};

const getCellsData = (xSpreadsheetData, sheetId, sheet) => {
  const cellsData = Object.keys(xSpreadsheetData.cellsSerialized).reduce(
    (all, rowKey) => {
      const data = xSpreadsheetData.cellsSerialized[rowKey];
      const colData = Object.keys(data).reduce((cols, colKey) => {
        const cellId = `${sheetId}_${rowKey}_${colKey}`;
        sheet.cells[cellId] = cellId;

        const value = xSpreadsheetData.cellsSerialized[rowKey][colKey];

        return {
          ...cols,
          [cellId]: {
            value:
              value === null || value === undefined
                ? undefined
                : value.toString(),
            id: cellId,
          },
        };
      }, {});
      return {
        ...all,
        ...colData,
      };
    },
    {},
  );
  const mergedCells = {};
  const row = {};
  const col = {};

  const setComment = (source, cellId) => {
    const comment = source.comment;
    if (comment) {
      cellsData[cellId] = {
        ...cellsData[cellId],
        comment: source.comment,
      };
    }
  };

  const setStyles = (source, cellId) => {
    const styleIndex = source.style;
    const xStyles = xSpreadsheetData.styles[styleIndex];
    const setStyle = (style) => {
      sheet.cells[cellId] = cellId;
      cellsData[cellId] = {
        ...cellsData[cellId],
        ...(!!cellsData[cellId] && cellsData[cellId].style),
        ...style,
        id: cellId,
      };
    };
    if (xStyles) {
      Object.keys(xStyles).forEach((styleKey) => {
        switch (styleKey) {
          case "font": {
            if (xStyles.font.size) {
              // + 2 to it because x-spreadsheets is 2 lower incorrectly
              setStyle({
                fontSize: xStyles.font.size + 2,
              });
            }
            if (xStyles.font.bold) {
              setStyle({
                bold: true,
              });
            }
            if (xStyles.font.italic) {
              setStyle({
                italic: true,
              });
            }
            break;
          }
          case "underline": {
            setStyle({
              [styleKey]: xStyles[styleKey],
            });
            break;
          }
          case "strike":
            setStyle({
              strikeThrough: xStyles[styleKey],
            });
            break;
          case "color":
            setStyle({
              fontColor: xStyles[styleKey],
            });
            break;
          case "bgcolor":
            setStyle({
              backgroundColor: xStyles[styleKey],
            });
            break;
          case "align":
            setStyle({
              horizontalTextAlign: xStyles[styleKey],
            });
            break;
          case "valign":
            setStyle({
              verticalTextAlign: xStyles[styleKey],
            });
            break;
          case "textwrap":
            if (xStyles[styleKey]) {
              setStyle({
                textWrap: "wrap",
              });
            }
            break;
          case "border": {
            const xBorder = xStyles[styleKey];
            const borders = [];
            if (xBorder.right) {
              borders.push("borderRight");
            }
            if (xBorder.left) {
              borders.push("borderLeft");
            }
            if (xBorder.top) {
              borders.push("borderTop");
            }
            if (xBorder.bottom) {
              borders.push("borderBottom");
            }
            break;
          }
          case "format": {
            if (xStyles[styleKey] === "normal") {
              break;
            }
            if (xStyles[styleKey] === "number") {
              setStyle({
                textFormatPattern: "#,##0.00",
              });
            } else if (xStyles[styleKey] === "percent") {
              setStyle({
                textFormatPattern: "0.00%",
              });
            } else if (xStyles[styleKey] === "million") {
              break;
            } else if (xStyles[styleKey] === "million-currency") {
              setStyle({
                textFormatPattern: "#,###.##,,",
                dynamicFormat: "currency",
              });
            } else if (xStyles[styleKey] === "currency") {
              setStyle({
                textFormatPattern: "#,##0.##",
                dynamicFormat: "currency",
              });
            } else {
              console.warn("unknown format", xStyles[styleKey]);
            }
            break;
          }
          default:
            console.warn("unknown style", styleKey, xStyles[styleKey]);
            break;
        }
      });
    }
  };

  const setMergedCells = (source, cellId, rowId, colId) => {
    const merge = source.merge;
    if (merge && merge.length) {
      // x-spreadsheet mergedCell y is the amount
      // of subsequent rows/cols to merge. Not the index
      // So we convert y to the index

      mergedCells[cellId] = {
        col: { x: parseInt(colId), y: parseInt(colId) + merge[1] },
        row: { x: parseInt(rowId), y: parseInt(rowId) + merge[0] },
        id: cellId,
      };
      sheet.mergedCells[cellId] = cellId;
    }
  };

  Object.keys(xSpreadsheetData.cols).forEach((colKey) => {
    if (colKey !== "len") {
      const id = `${sheetId}_${colKey}`;
      col[id] = {
        size: xSpreadsheetData.cols[colKey].width,
        id,
      };
      sheet.cols[id] = id;
    }
  });

  Object.keys(xSpreadsheetData.rows).forEach((rowKey) => {
    const height = xSpreadsheetData.rows[rowKey].height;
    const id = `${sheetId}_${rowKey}`;
    if (height) {
      row[id] = {
        size: height,
        id,
      };
      sheet.rows[id] = id;
    }
    Object.keys(xSpreadsheetData.rows[rowKey].cells).forEach((colId) => {
      const cellId = `${sheetId}_${rowKey}_${colId}`;
      const data = xSpreadsheetData.rows[rowKey].cells[colId];

      setComment(data, cellId);
      setStyles(data, cellId);

      setMergedCells(data, cellId, rowKey, colId);
    });
  });

  return { cellsData, mergedCells, row, col };
};

const getPowersheet = (xSpreadsheets) => {
  const powersheetData = {
    sheets: {},
  };

  xSpreadsheets.forEach((xSpreadsheetData, sheetId) => {
    const sheet = {
      cells: {},
      cols: {},
      rows: {},
      mergedCells: {},
    };

    if (
      !isEmpty(xSpreadsheetData.freeze) &&
      xSpreadsheetData.name !== "Required Inputs" &&
      xSpreadsheetData.name !== "Optional Inputs"
    ) {
      const frozenCell = getFrozenCell(xSpreadsheetData.freeze, sheetId);
      if (frozenCell) {
        sheet.frozenCell = sheetId;
        powersheetData.frozenCells = {
          ...powersheetData.frozenCells,
          [sheetId]: frozenCell,
        };
      }
    }
    const { cellsData, mergedCells, row, col } = getCellsData(
      xSpreadsheetData,
      sheetId,
      sheet,
    );

    if (!isEmpty(cellsData)) {
      powersheetData.cells = {
        ...powersheetData.cells,
        ...cellsData,
      };
    }

    if (!isEmpty(mergedCells)) {
      powersheetData.mergedCells = {
        ...powersheetData.mergedCells,
        ...mergedCells,
      };
    }

    if (!isEmpty(row)) {
      powersheetData.rows = {
        ...powersheetData.rows,
        ...row,
      };
    }
    if (!isEmpty(col)) {
      powersheetData.cols = {
        ...powersheetData.cols,
        ...col,
      };
    }

    Object.keys(sheet).forEach((key) => {
      if (isEmpty(sheet[key])) {
        delete sheet[key];
      }
    });

    powersheetData.sheets[sheetId] = {
      ...sheet,
      sheetName: xSpreadsheetData.name,
      id: sheetId,
    };

    if (powersheetData.mergedCells) {
      // Delete any cell data for mergedCells that isn't
      // top left cell as x-spreadsheet was duplicating it
      Object.keys(powersheetData.mergedCells).forEach((key) => {
        const value = powersheetData.mergedCells[key];

        const sections = key.split("_");
        const sheet = parseInt(sections[0], 10);

        for (let ri = value.row.x; ri <= value.row.y; ri++) {
          for (let ci = value.col.x; ci <= value.col.y; ci++) {
            const associatedMergedCellId = `${sheet}_${ri}_${ci}`;

            if (!powersheetData.mergedCells[associatedMergedCellId]) {
              delete powersheetData.cells[associatedMergedCellId];
              delete powersheetData.sheets[sheet].cells[associatedMergedCellId];
            }
          }
        }
      });
    }
  });

  return powersheetData;
};

const mapper = (data, name) => {
  const xSpreadsheets = data.data.datas;

  const powersheetData = getPowersheet(xSpreadsheets);

  return {
    name,
    data: powersheetData,
  };
};

export default mapper;
