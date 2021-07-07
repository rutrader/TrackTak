import { Box, IconButton, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectScope from "../selectors/dcfSelectors/selectScope";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import scopeNameTypeMapping from "./scopeNameTypeMapping";
import selectSheetsDatas from "../selectors/dcfSelectors/selectSheetsDatas";
import replaceAll from "../shared/replaceAll";
import { sharedOptions } from "../../../web-spreadsheet/src/core/defaultOptions";
import formatToExcelType from "./formatToExcelType";
import { isNil } from "lodash-es";
import { getFormats } from "./Spreadsheet";
import getFormatFromCell from "../../../web-spreadsheet/src/shared/getFormatFromCell";
import numfmt from "numfmt";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";

// TODO: Once we put in variables sheet then remove this
const apiVariablesWorksheetName = "API Variables";

export const DCFControlTypography = (props) => {
  return (
    <Typography
      variant="body2"
      whiteSpace="nowrap"
      sx={{
        cursor: "default",
      }}
      {...props}
    />
  );
};

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
  sheetsDatas,
  scope,
  currencySymbol,
  keepMerges,
  keepFormulas,
) => {
  const { utils } = await import("xlsx/xlsx.mini");
  const scopeIndexes = {};

  // TEMP
  const newScope = {
    ...scope,
    name: scope.general.name,
    description: scope.general.description,
    currencyCode: scope.general.currencyCode,
    industryName: scope.currentIndustry.industryName,
    code: scope.general.code,
    exchange: scope.general.exchange,
    annualAverageCAGRLastFiveYears:
      scope.currentIndustry.annualAverageCAGRLastFiveYears,
    preTaxOperatingMarginUnadjusted:
      scope.currentIndustry.preTaxOperatingMarginUnadjusted,
    afterTaxROIC: scope.currentIndustry.afterTaxROIC,
    "sales/Capital": scope.currentIndustry["sales/Capital"],
    costOfCapital: scope.currentIndustry.costOfCapital,
    unleveredBeta: scope.currentIndustry.unleveredBeta,
    equityLeveredBeta: scope.currentIndustry.equityLeveredBeta,
    revenue: scope.incomeStatements.ttm.revenue,
    interestExpense: scope.incomeStatements.ttm.interestExpense,
    operatingIncome: scope.incomeStatements.ttm.operatingIncome,
    investedCapital: scope.balanceSheets.ttm.investedCapital,
    bookValueOfDebt: scope.balanceSheets.ttm.bookValueOfDebt,
    bookValueOfEquity: scope.balanceSheets.ttm.bookValueOfEquity,
    cashAndShortTermInvestments:
      scope.balanceSheets.ttm.cashAndShortTermInvestments,
    minorityInterest: scope.balanceSheets.ttm.minorityInterest,
    capitalLeaseObligations: scope.balanceSheets.ttm.capitalLeaseObligations,
    standardDeviationInStockPrices:
      scope.currentIndustry.standardDeviationInStockPrices,
    equityRiskPremium: scope.currentEquityRiskPremium.equityRiskPremium,
    marginalTaxRate: scope.currentEquityRiskPremium.marginalTaxRate,
    adjDefaultSpread: scope.currentEquityRiskPremium.adjDefaultSpread,
    matureMarketEquityRiskPremium,
    marketCapitalization: scope.highlights.marketCapitalization,
  };

  delete newScope.general;
  delete newScope.highlights;
  delete newScope.incomeStatements;
  delete newScope.balanceSheets;
  delete newScope.cashFlowStatements;
  delete newScope.currentIndustry;
  delete newScope.currentEquityRiskPremium;

  const scopeArray = Object.keys(newScope);
  // TODO: Remove later
  const formats = {
    ...sharedOptions.formats,
    ...getFormats(currencySymbol),
  };

  scopeArray.forEach((key, i) => {
    scopeIndexes[key] = i;
  });

  keepMerges = keepMerges === undefined ? false : keepMerges;
  keepFormulas = keepFormulas === undefined ? false : keepFormulas;

  var workbook = utils.book_new();

  const appendWorksheet = (dataSheet) => {
    var ws = {
      "!cols": [],
    };

    let minCoord, maxCoord;

    dataSheet.serializedValues.forEach((row, ri) => {
      row.forEach((value, ci) => {
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
          t: formatToExcelType(format),
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

        if (keepFormulas && newValue?.[0] === "=") {
          formula = newValue.slice(1);

          scopeArray.forEach((key) => {
            const cellRow = scopeIndexes[key] + 1;

            // set it to the API sheet cell instead
            formula = replaceAll(
              formula,
              `FIN\\("\\b${key}\\b"\\)`,
              `'${apiVariablesWorksheetName}'!$B$${cellRow}`,
            );
          });
          excelFormat.t = "s";
        }

        ws[lastRef] = {
          ...excelFormat,
          v: newValue,
          f: formula,
        };

        if (keepMerges && cell?.merge !== undefined) {
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

  sheetsDatas.variablesDatas.forEach((sheetData) => {
    appendWorksheet(sheetData);
  });

  sheetsDatas.datas.forEach((sheetData) => {
    appendWorksheet(sheetData);
  });

  const apiVariablesWorksheet = {};

  scopeArray.forEach((key, i) => {
    let value = newScope[key];
    const cellRow = scopeIndexes[key] + 1;
    const format = scopeNameTypeMapping[key];
    let z = formats[format]?.pattern;

    if (format === "million") {
      z = sharedOptions.formats.number.pattern;
    }

    if (format === "million-currency") {
      z = sharedOptions.formats.currency.pattern;
    }

    if (format && value !== null) {
      let t = formatToExcelType(format);

      // Already formatted to %
      if (numfmt.isPercent(value)) {
        value = parseFloat(value) / 100;
      }

      apiVariablesWorksheet[`B${cellRow}`] = {
        t,
        z,
        v: value,
      };

      apiVariablesWorksheet[`A${cellRow}`] = {
        t: "s",
        v: key,
      };
    }

    if (i === scopeArray.length - 1) {
      apiVariablesWorksheet["!ref"] = `A1:B${cellRow}`;
    }
  });

  apiVariablesWorksheet["!cols"] = [{ wpx: 350 }, { wpx: 150 }];

  utils.book_append_sheet(
    workbook,
    apiVariablesWorksheet,
    apiVariablesWorksheetName,
  );

  return workbook;
};

const ExportToExcel = () => {
  const general = useSelector(selectGeneral);
  const scope = useSelector(selectScope);
  const valuationCurrencySymbol = useSelector(selectValuationCurrencySymbol);
  const sheetsDatas = useSelector(selectSheetsDatas);

  const exportToExcel = async () => {
    const { writeFile } = await import("xlsx/xlsx.mini");
    const workbook = await xtos(
      sheetsDatas,
      scope,
      valuationCurrencySymbol,
      true,
      true,
    );

    writeFile(workbook, `${general.code}.${general.exchange}_DCF.xlsx`);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton variant="outlined" onClick={exportToExcel}>
        <CloudDownloadIcon />
      </IconButton>
      <DCFControlTypography>Excel</DCFControlTypography>
    </Box>
  );
};

export default ExportToExcel;
