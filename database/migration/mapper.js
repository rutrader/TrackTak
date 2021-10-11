import { isEmpty } from "./util.js";

const getFrozenCell = (xCell, id) => {
  const col = parseInt(xCell.charAt(0), 36) - 10;
  const row = xCell.charAt(1) - 1;

  return {
    row,
    col,
    id,
  };
};

const getCellsData = (xSpreadsheetData, sheetId, sheet) => {
  const cellsData = Object.keys(xSpreadsheetData.cellsSerialized).reduce(
    (all, rowKey) => {
      const data = xSpreadsheetData.cellsSerialized[rowKey];
      const colData = Object.keys(data).reduce((cols, colKey) => {
        const cellId = `${sheetId}_${rowKey}_${colKey}`;
        sheet.cells[cellId] = cellId;
        return {
          ...cols,
          [cellId]: {
            value: xSpreadsheetData.cellsSerialized[rowKey][colKey],
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
      cellsData[cellId] = {
        ...cellsData[cellId],
        ...(!!cellsData[cellId] && cellsData[cellId].style),
        ...style,
      };
    };
    if (xStyles) {
      Object.keys(xStyles).forEach((styleKey) => {
        switch (styleKey) {
          case "font": {
            if (xStyles.font.size) {
              setStyle({
                fontSize: xStyles.font.size,
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
            } else if (
              xStyles[styleKey] === "million" ||
              xStyles[styleKey] === "million-currency"
            ) {
              setStyle({
                textFormatPattern: "#,###.##,,",
              });
            } else if (xStyles[styleKey] === "currency") {
              setStyle({
                textFormatPattern: "#,##0.##",
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
      mergedCells[cellId] = {
        col: { x: parseInt(colId), y: merge[1] },
        row: { x: parseInt(rowId), y: merge[0] },
        id: cellId,
      };
    }
    sheet.mergedCells[cellId] = cellId;
  };

  Object.keys(xSpreadsheetData.cols).forEach((colKey) => {
    const id = `${sheetId}_${colKey}`;
    col[id] = {
      size: xSpreadsheetData.cols[colKey].width,
      id,
    };
    sheet.cols[id] = id;
  });

  Object.keys(xSpreadsheetData.rows).forEach((rowKey) => {
    const height = xSpreadsheetData.rows[rowKey].height;
    const id = `${sheetId}_${rowKey}`;
    if (height) {
      row[id] = {
        size: height,
        id,
      };
    }
    sheet.rows[id] = id;
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
      sheetName: xSpreadsheetData.name,
      id: sheetId,
      cells: {},
      cols: {},
      rows: {},
      mergedCells: {},
    };

    if (!isEmpty(xSpreadsheetData.freeze)) {
      sheet.frozenCell = sheetId;
      powersheetData.frozenCells = {
        ...powersheetData.frozenCells,
        [sheetId]: getFrozenCell(xSpreadsheetData.freeze, sheetId),
      };
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
      powersheetData.row = row;
      powersheetData.rows = {
        ...powersheetData.rows,
        ...row,
      };
    }
    if (!isEmpty(col)) {
      powersheetData.cols = col;
      powersheetData.cols = {
        ...powersheetData.cols,
        ...col,
      };
    }

    powersheetData.sheets[sheetId] = sheet;
  });

  return powersheetData;
};

const mapper = (data) => {
  const xSpreadsheets = data.data.datas;

  const powersheetData = getPowersheet(xSpreadsheets);

  return {
    ...data,
    data: {
      datas: powersheetData,
    },
  };
};

export default mapper;
