import { Box, IconButton, Typography } from "@material-ui/core";
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
import { isNil } from "lodash-es";
import scopeNameTypeMapping, {
  allInputNameTypeMappings,
} from "./scopeNameTypeMapping";
import {
  costOfComponentCalculation,
  debtCalculation,
  marketValueCalculation,
  weightInCostOfCapitalCalculation,
} from "./expressionCalculations";

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

  const exportToCSVOnClick = async () => {
    const { utils, writeFile } = await import("xlsx/xlsx.mini");

    const cellKeysSorted = padCellKeys(
      Object.keys(cells).sort(sortAlphaNumeric),
    );
    const getNameFromKey = (key, type) => {
      let newName = sentenceCase(key);

      if (type === "million" || type === "million-currency") {
        newName += " (mln)";
      }

      if (type === "year") {
        newName += " (yr)";
      }

      return newName;
    };

    const costOfCapitalData = {
      marginalTaxRate: currentEquityRiskPremium.marginalTaxRate,
      equityRiskPremium: currentEquityRiskPremium.equityRiskPremium,
      governmentBondTenYearYield,
      adjDefaultSpread: currentEquityRiskPremium.adjDefaultSpread,
      interestSpread: interestSpread.spread,
      bookValueOfDebt: balanceSheet.bookValueOfDebt,
      interestExpense: incomeStatement.interestExpense,
      price,
      sharesOutstanding,
      pretaxCostOfDebt: isNil(inputQueryParams.pretaxCostOfDebt)
        ? debtCalculation.estimatedCostOfDebt
        : inputQueryParams.pretaxCostOfDebt,
      unleveredBeta: currentIndustry.unleveredBeta,
      ...debtCalculation,
      ...marketValueCalculation,
      ...weightInCostOfCapitalCalculation,
      ...costOfComponentCalculation,
    };

    // Used in pretaxCostOfDebt so delete it
    delete costOfCapitalData.estimatedCostOfDebt;

    const costOfCapitalDataKeys = Object.keys(costOfCapitalData);

    const formatCellForExcelOutput = makeFormatCellForExcelOutput(
      valuationCurrencySymbol,
      Object.keys(allInputNameTypeMappings),
      costOfCapitalDataKeys,
      scope,
    );
    const formatValueForExcelOutput = makeFormatValueForExcelOutput(
      valuationCurrencySymbol,
    );

    const transformedInputsData = [];

    Object.keys(allInputNameTypeMappings).forEach((name) => {
      const type = allInputNameTypeMappings[name];
      const value = inputQueryParams[name];

      transformedInputsData.push(getNameFromKey(name, type));
      // Undefined is treated as blank cell in excel
      transformedInputsData.push(
        formatValueForExcelOutput(value === null ? undefined : value, type),
      );
    });

    const transformedCostOfCapitalData = [];

    costOfCapitalDataKeys.forEach((key) => {
      const type = scopeNameTypeMapping[key];
      let expr;
      let value;

      if (
        typeof costOfCapitalData[key] === "string" &&
        costOfCapitalData[key].charAt(0) === "="
      ) {
        expr = costOfCapitalData[key];
      } else {
        value = costOfCapitalData[key];
      }

      transformedCostOfCapitalData.push(getNameFromKey(key, type));
      transformedCostOfCapitalData.push(
        formatCellForExcelOutput(
          {
            type,
            expr,
            value,
          },
          costOfCapitalWorksheetName,
        ),
      );
    });

    const numberOfValuationColumns = getNumberOfColumns(cells);

    const transformedValuationData = cellKeysSorted.map((cellKey) => {
      const cell = cells[cellKey];

      return formatCellForExcelOutput(cell, valuationWorksheetName);
    });
    const chunkedInputsData = getChunksOfArray(transformedInputsData, 2);
    const chunkedCostOfCapitalData = getChunksOfArray(
      transformedCostOfCapitalData,
      2,
    );
    const chunkedValuationData = getChunksOfArray(
      transformedValuationData,
      numberOfValuationColumns,
    );

    const inputsWorksheet = utils.aoa_to_sheet(chunkedInputsData);
    const costOfCapitalWorksheet = utils.aoa_to_sheet(chunkedCostOfCapitalData);
    const valuationOutputWorksheet = utils.aoa_to_sheet(chunkedValuationData);

    inputsWorksheet["!cols"] = [{ width: 39 }, { width: 15 }];
    costOfCapitalWorksheet["!cols"] = [{ width: 47 }, { width: 20 }];
    valuationOutputWorksheet["!cols"] = Array.from(
      new Array(numberOfValuationColumns),
    ).map((_, i) => {
      if (i === 0) {
        return { width: 23 };
      }
      return { width: 15 };
    });

    const workBook = utils.book_new();

    utils.book_append_sheet(workBook, inputsWorksheet, inputsWorksheetName);
    utils.book_append_sheet(
      workBook,
      costOfCapitalWorksheet,
      costOfCapitalWorksheetName,
    );
    utils.book_append_sheet(
      workBook,
      valuationOutputWorksheet,
      valuationWorksheetName,
    );

    writeFile(workBook, `${general.code}.${general.exchange}_DCF.xlsx`);
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
