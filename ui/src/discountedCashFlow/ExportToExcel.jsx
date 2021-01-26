import { Button } from "@material-ui/core";
import React from "react";
import { getNumberOfColumns, padCellKeys } from "./utils";
import selectQueryParams, {
  inputQueries,
} from "../selectors/routerSelectors/selectQueryParams";
import { utils, writeFile } from "xlsx";
import { sentenceCase } from "change-case";
import makeFormatValueForExcelOutput from "./makeFormatValueForExcelOutput";
import makeFormatCellValueForExcelOutput from "./makeFormatCellValueForExcelOutput";
import setColumnWidths from "./setColumnWidths";
import sortAlphaNumeric from "./sortAlphaNumeric";
import getChunksOfArray from "../shared/getChunksOfArray";
import { useSelector } from "react-redux";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectGovernmentBondTenYearLastClose from "../selectors/fundamentalSelectors/selectGovernmentBondTenYearLastClose";
import selectScope from "../selectors/dcfSelectors/selectScope";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import cells from "./cells";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import {
  costOfComponentCalculation,
  estimatedCostOfDebtCalculation,
  estimatedMarketValueOfStraightDebtCalculation,
  estimatedValueOfStraightDebtInConvertibleDebtCalculation,
  leveredBetaCalculation,
  marketValueCalculation,
  riskFreeRateCalculation,
  weightInCostOfCapitalCalculation,
} from "./expressionCalculations";
import selectInterestSpread from "../selectors/fundamentalSelectors/selectInterestSpread";
import { getPretaxCostOfDebt } from "../selectors/fundamentalSelectors/selectPretaxCostOfDebt";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";

export const inputsWorksheetName = "Inputs";
export const costOfCapitalWorksheetName = "Cost of Capital";
export const valuationWorksheetName = "Valuation";

const ExportToExcel = () => {
  const general = useSelector(selectGeneral);
  const governmentBondTenYearLastClose = useSelector(
    selectGovernmentBondTenYearLastClose
  );
  const currentEquityRiskPremium = useSelector(selectCurrentEquityRiskPremium);
  const scope = useSelector(selectScope);
  const valuationCurrencySymbol = useSelector(selectValuationCurrencySymbol);
  const queryParams = useSelector(selectQueryParams);
  const interestSpread = useSelector(selectInterestSpread);
  const currentIndustry = useSelector(selectCurrentIndustry);

  const exportToCSVOnClick = () => {
    const formatValueForExcelOutput = makeFormatValueForExcelOutput(
      valuationCurrencySymbol
    );
    const formatCellValueForExcelOutput = makeFormatCellValueForExcelOutput(
      valuationCurrencySymbol
    );

    const cellKeysSorted = padCellKeys(
      Object.keys(cells).sort(sortAlphaNumeric)
    );
    const inputsData = [];
    const costOfCapitalData = {
      marginalTaxRate: {
        type: "percent",
        value: currentEquityRiskPremium.corporateTaxRate,
      },
      equityRiskPremium: {
        type: "percent",
        value: currentEquityRiskPremium.equityRiskPremium,
      },
      governmentBondTenYearPrice: {
        type: "currency",
        value: governmentBondTenYearLastClose,
      },
      adjustedDefaultSpread: {
        type: "percent",
        value: currentEquityRiskPremium.adjDefaultSpread,
      },
      riskFreeRate: { type: "percent", expr: riskFreeRateCalculation },
      interestSpread: { type: "percent", value: interestSpread.spread },
      pretaxCostOfDebt: {
        type: "percent",
        expr: getPretaxCostOfDebt(queryParams, estimatedCostOfDebtCalculation),
      },
      unleveredBeta: { type: "number", value: currentIndustry.unleveredBeta },
      leveredBeta: { type: "number", expr: leveredBetaCalculation },
      estimatedMarketValueOfStraightDebt: {
        type: "currency",
        expr: estimatedMarketValueOfStraightDebtCalculation,
      },
      estimatedValueOfStraightDebtInConvertibleDebt: {
        type: "currency",
        expr: estimatedValueOfStraightDebtInConvertibleDebtCalculation,
      },
    };

    Object.keys(marketValueCalculation).forEach((key) => {
      const expr = marketValueCalculation[key];

      costOfCapitalData.marketValue = {
        ...costOfCapitalData.marketValue[key],
        [key]: {
          type: "currency",
          expr,
        },
      };
    });

    Object.keys(weightInCostOfCapitalCalculation).forEach((key) => {
      const expr = weightInCostOfCapitalCalculation[key];

      costOfCapitalData.weightInCostOfCapital = {
        ...costOfCapitalData.weightInCostOfCapital[key],
        [key]: {
          type: "percent",
          expr,
        },
      };
    });

    Object.keys(costOfComponentCalculation).forEach((key) => {
      const expr = costOfComponentCalculation[key];

      costOfCapitalData.costOfComponent = {
        ...costOfCapitalData.costOfComponent[key],
        [key]: {
          type: "percent",
          expr,
        },
      };
    });

    inputQueries.forEach(({ name, type }) => {
      const value = queryParams[name];
      let newName = sentenceCase(name);

      if (type === "million") {
        newName += " (mln)";
      }

      inputsData.push(newName);
      inputsData.push(formatValueForExcelOutput(value, type));
    });
    const numberOfColumns = getNumberOfColumns(cells);

    const valuationChunkedData = getChunksOfArray(
      cellKeysSorted,
      numberOfColumns
    ).map((arr) => {
      return arr.map((cellKey) => {
        return formatCellValueForExcelOutput(cells[cellKey], scope);
      });
    });
    console.log(getChunksOfArray(cellKeysSorted, numberOfColumns));
    const inputsWorksheet = setColumnWidths(
      utils.aoa_to_sheet(getChunksOfArray(inputsData, 2))
    );
    const costOfCapitalWorksheet = setColumnWidths(
      utils.aoa_to_sheet(costOfCapitalData)
    );
    const valuationOutputWorksheet = setColumnWidths(
      utils.aoa_to_sheet(valuationChunkedData)
    );

    const workBook = utils.book_new();

    utils.book_append_sheet(workBook, inputsWorksheet, inputsWorksheetName);
    utils.book_append_sheet(
      workBook,
      costOfCapitalWorksheet,
      inputsWorksheetName
    );
    utils.book_append_sheet(
      workBook,
      valuationOutputWorksheet,
      valuationWorksheetName
    );

    writeFile(workBook, `${general.Code}.${general.Exchange}_DCF.xlsx`);
  };

  return (
    <Button variant="outlined" onClick={exportToCSVOnClick}>
      Export to Excel
    </Button>
  );
};

export default ExportToExcel;
