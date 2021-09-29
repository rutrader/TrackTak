import { isEmpty } from "./util.js";

const getFrozenCell = (xCell) => {
  const col = parseInt(xCell.charAt(0), 36) - 10;
  const row = xCell.charAt(1) - 1;

  return {
    row,
    col,
  };
};

const getCellsData = (xSpreadsheetData) => {
  const cellsData = Object.keys(xSpreadsheetData.cellsSerialized).reduce(
    (all, rowKey) => {
      const data = xSpreadsheetData.cellsSerialized[rowKey];
      const colData = Object.keys(data).reduce((cols, colKey) => {
        const cellId = `${rowKey}_${colKey}`;
        return {
          ...cols,
          [cellId]: {
            value: xSpreadsheetData.cellsSerialized[rowKey][colKey],
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
  const row = {
    sizes: {},
  };
  const col = {
    sizes: {},
  };

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
        style: {
          ...(!!cellsData[cellId] && cellsData[cellId].style),
          ...style,
        },
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
      };
    }
  };

  Object.keys(xSpreadsheetData.cols).forEach((colKey) => {
    col.sizes[colKey] = xSpreadsheetData.cols[colKey].width;
  });

  Object.keys(xSpreadsheetData.rows).forEach((rowKey) => {
    const height = xSpreadsheetData.rows[rowKey].height;
    if (height) {
      row.sizes[rowKey] = height;
    }
    Object.keys(xSpreadsheetData.rows[rowKey].cells).forEach((colId) => {
      const cellId = `${rowKey}_${colId}`;
      const data = xSpreadsheetData.rows[rowKey].cells[colId];

      setComment(data, cellId);
      setStyles(data, cellId);

      setMergedCells(data, cellId, rowKey, colId);
    });
  });

  return { cellsData, mergedCells, row, col };
};

const getPowersheet = (xSpreadsheetData) => {
  const powersheetData = {};

  powersheetData.sheetName = xSpreadsheetData.name;

  if (!isEmpty(xSpreadsheetData.freeze)) {
    powersheetData.frozenCells = getFrozenCell(xSpreadsheetData.freeze);
  }

  const { cellsData, mergedCells, row, col } = getCellsData(xSpreadsheetData);
  if (!isEmpty(cellsData)) {
    powersheetData.cellsData = cellsData;
  }
  if (!isEmpty(mergedCells)) {
    powersheetData.mergedCells = mergedCells;
  }
  if (!isEmpty(row.sizes)) {
    powersheetData.row = row;
  }
  if (!isEmpty(col.sizes)) {
    powersheetData.col = col;
  }

  return powersheetData;
};

const mapper = (data) => {
  const xSpreadsheets = data.data.datas;
  const powersheets = xSpreadsheets.map((xSpreadsheet) =>
    getPowersheet(xSpreadsheet),
  );

  return {
    ...data,
    data: {
      datas: powersheets,
    },
  };
};

export default mapper;
