import {
  Box,
  IconButton,
  listItemClasses,
  Typography,
} from "@material-ui/core";
import React from "react";
import { getNumberOfColumns, padCellKeys } from "./utils";
import useInputQueryParams from "../hooks/useInputQueryParams";
import { sentenceCase } from "change-case";
import makeFormatCellForExcelOutput, {
  costOfCapitalWorksheetName,
  inputsWorksheetName,
  valuationWorksheetName,
} from "./makeFormatCellForExcelOutput";
import makeFormatValueForExcelOutput from "./makeFormatValueForExcelOutput";
import sortAlphaNumeric from "./sortAlphaNumeric";
import getChunksOfArray from "../shared/getChunksOfArray";
import { useSelector } from "react-redux";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectGovernmentBondTenYearYield from "../selectors/fundamentalSelectors/selectGovernmentBondTenYearYield";
import selectScope from "../selectors/dcfSelectors/selectScope";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import cells from "./cells";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import selectInterestSpread from "../selectors/fundamentalSelectors/selectInterestSpread";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import selectSharesOutstanding from "../selectors/fundamentalSelectors/selectSharesOutstanding";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import { range, replace } from "lodash-es";
import scopeNameTypeMapping, {
  allInputNameTypeMappings,
} from "./scopeNameTypeMapping";
import {
  costOfComponentCalculation,
  debtCalculation,
  marketValueCalculation,
  weightInCostOfCapitalCalculation,
} from "./templates/freeCashFlowFirmSimple/expressionCalculations";
import { queryNames } from "./templates/freeCashFlowFirmSimple/inputQueryNames";
import selectSheetsValues from "../selectors/dcfSelectors/selectSheetsValues";
import selectSheetsSerializedValues from "../selectors/dcfSelectors/selectSheetsSerializedValues";
import selectSheetsDatas from "../selectors/dcfSelectors/selectSheetsDatas";
import replaceAll from "../shared/replaceAll";

// TODO: Once we put in variables sheet then remove this
const apiVariablesWorksheetName = "API Variables";

export const DCFControlTypography = (props) => {
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();

  return (
    <Typography
      variant="body2"
      color={hasAllRequiredInputsFilledIn ? "textPrimary" : "textSecondary"}
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
const xtos = async (sheetsDatas, scope, keepMerges, keepFormulas) => {
  const { utils } = await import("xlsx/xlsx.mini");
  const scopeIndexes = {};

  Object.keys(scope).forEach((key, i) => {
    scopeIndexes[key] = i;
  });

  keepMerges = keepMerges === undefined ? false : keepMerges;
  keepFormulas = keepFormulas === undefined ? false : keepFormulas;

  var workbook = utils.book_new();

  const appendWorksheet = (dataSheet) => {
    var ws = {
      ["!cols"]: [],
    };
    var rowobj = dataSheet.rows;
    for (var ri = 0; ri < rowobj.len; ++ri) {
      var row = rowobj[ri];
      if (!row) continue;

      var minCoord, maxCoord;
      // eslint-disable-next-line no-loop-func
      Object.keys(row.cells).forEach(function (k) {
        var idx = +k;
        if (isNaN(idx)) return;

        const cell = row.cells[k];
        let cellText = cell.text;
        let type = "s";

        var lastRef = coordinateToReference(ri + 1, idx + 1);
        if (minCoord == undefined) {
          minCoord = {
            r: ri,
            c: idx,
          };
        } else {
          if (ri < minCoord.r) minCoord.r = ri;
          if (idx < minCoord.c) minCoord.c = idx;
        }
        if (maxCoord == undefined) {
          maxCoord = {
            r: ri,
            c: idx,
          };
        } else {
          if (ri > maxCoord.r) maxCoord.r = ri;
          if (idx > maxCoord.c) maxCoord.c = idx;
        }

        if (!cellText) {
          cellText = "";
          type = "z";
        } else if (!isNaN(parseFloat(cellText))) {
          cellText = parseFloat(cellText);
          type = "n";
        } else if (cellText === "true" || cellText === "false") {
          cellText = Boolean(cellText);
          type = "b";
        }

        ws[lastRef] = {
          v: cellText,
          t: type,
        };

        if (keepFormulas && type == "s" && cellText[0] == "=") {
          let formula = cellText.slice(1);

          // Match a camelCase tracktak variable
          const matches =
            formula.match(/\b([a-z][a-z0-9]+[A-Z])+[a-z0-9]+\b|\b[a-z]+\b/g) ??
            [];

          matches.forEach((match) => {
            const cellRow = scopeIndexes[match] + 1;

            // set it to the API sheet cell instead
            formula = replaceAll(
              formula,
              match,
              `'${apiVariablesWorksheetName}'!$B$${cellRow}`,
            );
          });
          ws[lastRef].f = formula;
        }

        if (keepMerges && cell.merge != undefined) {
          if (ws["!merges"] == undefined) ws["!merges"] = [];

          ws["!merges"].push({
            s: {
              r: ri,
              c: idx,
            },
            e: {
              r: ri + cell.merge[0],
              c: idx + cell.merge[1],
            },
          });
        }
      });

      ws["!ref"] =
        coordinateToReference(minCoord.r + 1, minCoord.c + 1) +
        ":" +
        coordinateToReference(maxCoord.r + 1, maxCoord.c + 1);
    }

    Object.keys(dataSheet.cols).forEach((key) => {
      const value = dataSheet.cols[key];

      ws["!cols"].push({
        wpx: value?.width,
      });
    });

    utils.book_append_sheet(workbook, ws, dataSheet.name);
  };

  sheetsDatas.variablesDatas.forEach((sheetData) => {
    appendWorksheet(sheetData);
  });

  sheetsDatas.datas.forEach((sheetData) => {
    appendWorksheet(sheetData);
  });

  return workbook;
};

const ExportToExcel = () => {
  const general = useSelector(selectGeneral);
  const governmentBondTenYearYield = useSelector(
    selectGovernmentBondTenYearYield,
  );
  const currentEquityRiskPremium = useSelector(selectCurrentEquityRiskPremium);
  const scope = useSelector(selectScope);
  const valuationCurrencySymbol = useSelector(selectValuationCurrencySymbol);
  const inputQueryParams = useInputQueryParams();
  const interestSpread = useSelector(selectInterestSpread);
  const currentIndustry = useSelector(selectCurrentIndustry);
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const balanceSheet = useSelector(selectRecentBalanceSheet);
  const price = useSelector(selectPrice);
  const sharesOutstanding = useSelector(selectSharesOutstanding);
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();
  const sheetsValues = useSelector(selectSheetsValues);
  const sheetsDatas = useSelector(selectSheetsDatas);

  const exportToCSVOnClick = async () => {
    const { utils, writeFile } = await import("xlsx/xlsx.mini");
    const workbook = await xtos(sheetsDatas, scope, true, true);

    const scopeData = Object.keys(scope).map((key) => {
      const value = scope[key];

      return [key, value];
    });

    const apiVariablesWorksheet = utils.aoa_to_sheet(scopeData);

    apiVariablesWorksheet["!cols"] = [{ wpx: 350 }, { wpx: 150 }];

    utils.book_append_sheet(
      workbook,
      apiVariablesWorksheet,
      apiVariablesWorksheetName,
    );

    writeFile(workbook, `${general.code}.${general.exchange}_DCF.xlsx`);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        variant="outlined"
        onClick={exportToCSVOnClick}
        disabled={!hasAllRequiredInputsFilledIn}
      >
        <CloudDownloadIcon />
      </IconButton>
      <DCFControlTypography>Excel</DCFControlTypography>
    </Box>
  );
};

export default ExportToExcel;
