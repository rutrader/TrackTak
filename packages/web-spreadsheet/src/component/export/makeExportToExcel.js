import { isNil } from "lodash-es";
import numfmt from "numfmt";
import { sharedOptions } from "../../core/defaultOptions";
import getFormatFromCell from "../../shared/getFormatFromCell";
import formatToExcelType from "./formatToExcelType";

/**
 * Transform a sheet index to it's column letter.
 * Warning: Begin at 1 ! 1=>A, 2=>B...
 *
 * @param  {number} column
 * @param  {string}
 */
function columnToLetter(column) {
  var temp,
    letter = "";
  letter = letter.toUpperCase();
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

/**
 * Transform coordinates to it's reference.
 * Warning: Begin at 1 ! row= 1 & col= 1 => A1
 *
 * @param  {string} row
 * @param  {string} col
 * @returns {string} a sheet like coordinate
 */
function coordinateToReference(row, col) {
  return columnToLetter(col) + String(row);
}

// Source: https://github.com/myliang/x-spreadsheet/issues/419
const xtos = async (
  hyperformula,
  sheetsDatas,
  formats,
  customFunctionNames,
) => {
  const { utils } = await import("xlsx/xlsx.mini");

  var workbook = utils.book_new();

  const appendWorksheet = (dataSheet) => {
    const sheet = hyperformula.getSheetId(dataSheet.name);

    var ws = {
      "!cols": [],
    };

    let minCoord, maxCoord;

    Object.keys(dataSheet.cellValues).forEach((rowKey) => {
      const row = dataSheet.cellValues[rowKey];
      const ri = parseInt(rowKey, 10);

      Object.keys(row).forEach((colKey) => {
        const value = row[colKey];
        const ci = parseInt(colKey, 10);

        const cellAddress = {
          sheet,
          row: ri,
          col: ci,
        };
        const cell = dataSheet.rows?.[ri]?.cells[ci];

        let newValue = value ?? "";

        const format = getFormatFromCell(value, cell, dataSheet.styles);

        var lastRef = coordinateToReference(ri + 1, ci + 1);
        if (minCoord === undefined) {
          minCoord = {
            r: ri,
            c: ci,
          };
        } else {
          if (ri < minCoord.r) minCoord.r = ri;
          if (ci < minCoord.c) minCoord.c = ci;
        }
        if (maxCoord === undefined) {
          maxCoord = {
            r: ri,
            c: ci,
          };
        } else {
          if (ri > maxCoord.r) maxCoord.r = ri;
          if (ci > maxCoord.c) maxCoord.c = ci;
        }

        let pattern = formats[format]?.pattern;

        const excelFormat = {
          t: formatToExcelType(formats[format]?.type),
          z: pattern,
        };

        if (isNil(newValue) || (newValue === "" && !format)) {
          excelFormat.t = "z";
        }

        // Already formatted to %
        if (numfmt.isPercent(newValue)) {
          newValue = parseFloat(newValue) / 100;
        }

        let formula;

        if (hyperformula.doesCellHaveFormula(cellAddress)) {
          formula = newValue.slice(1);

          customFunctionNames.forEach((customFunctionName) => {
            // TODO: Not perfect regex, doesn't handle nested custom functions
            const regex = new RegExp(`${customFunctionName}\\(.*?\\)`, "g");
            const matches = formula.match(regex) ?? [];

            // Replace any custom functon calls with
            // the actual value because excel won't support
            // custom functions natively
            matches.forEach((match) => {
              let value = hyperformula.calculateFormula(`=${match}`, sheet);

              if (typeof value === "string") {
                if (value) {
                  value = `"${value}"`;
                } else {
                  value = "0";
                }
              }

              formula = formula.replace(match, value);
            });

            excelFormat.t = "s";
          });
        }

        ws[lastRef] = {
          ...excelFormat,
          v: newValue,
          f: formula,
        };

        if (cell?.merge !== undefined) {
          if (ws["!merges"] === undefined) {
            ws["!merges"] = [];
          }

          ws["!merges"].push({
            s: {
              r: ri,
              c: ci,
            },
            e: {
              r: ri + cell.merge[0],
              c: ci + cell.merge[1],
            },
          });
        }
      });
    });

    ws["!ref"] =
      coordinateToReference(minCoord.r + 1, minCoord.c + 1) +
      ":" +
      coordinateToReference(maxCoord.r + 1, maxCoord.c + 1);

    // Set col widths
    for (let index = 0; index <= maxCoord.c; index++) {
      const col = dataSheet.cols[index];

      ws["!cols"].push({
        wpx: col?.width ?? sharedOptions.col.width,
      });
    }

    utils.book_append_sheet(workbook, ws, dataSheet.name);
  };

  // hyperformula.suspendEvaluation();

  sheetsDatas.variablesDatas.forEach((sheetData) => {
    appendWorksheet(sheetData);
  });

  sheetsDatas.datas.forEach((sheetData) => {
    appendWorksheet(sheetData);
  });

  // hyperformula.resumeEvaluation();

  utils.book_append_sheet(workbook);

  return workbook;
};

const makeExportToExcel = (hyperformula, datas) => async (
  workbookName,
  formats,
  customFunctionNames,
) => {
  const newFormats = {
    ...sharedOptions.formats,
    ...formats,
  };
  const { writeFile } = await import("xlsx/xlsx.mini");
  const workbook = await xtos(
    hyperformula,
    datas,
    newFormats,
    customFunctionNames,
  );

  writeFile(workbook, workbookName);
};

export default makeExportToExcel;
