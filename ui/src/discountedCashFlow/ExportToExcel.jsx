import { Button } from "@material-ui/core";
import React from "react";
import { getNumberOfColumns, padCellKeys } from "./utils";
import selectInputQueryParams, {
  inputQueries,
} from "../selectors/routerSelectors/selectInputQueryParams";
import { utils, writeFile } from "xlsx";
import { sentenceCase } from "change-case";
import makeFormatCellForExcelOutput from "./makeFormatCellForExcelOutput";
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
import {
  costOfComponentCalculation,
  costOfPreferredStockCalculation,
  estimatedCostOfDebtCalculation,
  estimatedMarketValueOfStraightDebtCalculation,
  estimatedValueOfStraightDebtInConvertibleDebtCalculation,
  leveredBetaCalculation,
  marketValueCalculation,
  riskFreeRateCalculation,
  weightInCostOfCapitalCalculation,
} from "./expressionCalculations";
import selectInterestSpread from "../selectors/fundamentalSelectors/selectInterestSpread";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectSharesStats from "../selectors/fundamentalSelectors/selectSharesStats";

export const inputsWorksheetName = "Inputs";
export const costOfCapitalWorksheetName = "Cost of Capital";
export const valuationWorksheetName = "Valuation";

const ExportToExcel = () => {
  const general = useSelector(selectGeneral);
  const governmentBondTenYearYield = useSelector(
    selectGovernmentBondTenYearYield
  );
  const currentEquityRiskPremium = useSelector(selectCurrentEquityRiskPremium);
  const scope = useSelector(selectScope);
  const valuationCurrencySymbol = useSelector(selectValuationCurrencySymbol);
  const queryParams = useSelector(selectInputQueryParams);
  const interestSpread = useSelector(selectInterestSpread);
  const currentIndustry = useSelector(selectCurrentIndustry);
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const balanceSheet = useSelector(selectRecentBalanceSheet);
  const price = useSelector(selectPrice);
  const { SharesOutstanding } = useSelector(selectSharesStats);

  const exportToCSVOnClick = () => {
    const cellKeysSorted = padCellKeys(
      Object.keys(cells).sort(sortAlphaNumeric)
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
      marginalTaxRate: {
        type: "percent",
        value: currentEquityRiskPremium.marginalTaxRate,
      },
      equityRiskPremium: {
        type: "percent",
        value: currentEquityRiskPremium.equityRiskPremium,
      },
      governmentBondTenYearYield: {
        type: "percent",
        value: governmentBondTenYearYield,
      },
      adjDefaultSpread: {
        type: "percent",
        value: currentEquityRiskPremium.adjDefaultSpread,
      },
      riskFreeRate: { type: "percent", expr: riskFreeRateCalculation },
      interestSpread: { type: "percent", value: interestSpread.spread },
      bookValueOfDebt: {
        type: "million-currency",
        value: balanceSheet.bookValueOfDebt,
      },
      interestExpense: {
        type: "million-currency",
        value: incomeStatement.interestExpense,
      },
      price: {
        type: "currency",
        value: price,
      },
      sharesOutstanding: {
        type: "million",
        value: SharesOutstanding,
      },
      costOfPreferredStock: {
        type: "percent",
        expr: costOfPreferredStockCalculation,
      },
      pretaxCostOfDebt: {
        type: "percent",
      },
      unleveredBeta: { type: "number", value: currentIndustry.unleveredBeta },
      leveredBeta: { type: "number", expr: leveredBetaCalculation },
      estimatedMarketValueOfStraightDebt: {
        type: "million-currency",
        expr: estimatedMarketValueOfStraightDebtCalculation,
      },
      estimatedValueOfStraightDebtInConvertibleDebt: {
        type: "million-currency",
        expr: estimatedValueOfStraightDebtInConvertibleDebtCalculation,
      },
    };

    if (queryParams.pretaxCostOfDebt !== undefined) {
      costOfCapitalData.pretaxCostOfDebt.value = queryParams.pretaxCostOfDebt;
    } else {
      costOfCapitalData.pretaxCostOfDebt.expr = estimatedCostOfDebtCalculation;
    }

    Object.keys(marketValueCalculation).forEach((key) => {
      const expr = marketValueCalculation[key];

      costOfCapitalData[key] = {
        type: "million-currency",
        expr,
      };
    });

    Object.keys(weightInCostOfCapitalCalculation).forEach((key) => {
      const expr = weightInCostOfCapitalCalculation[key];

      costOfCapitalData[key] = {
        type: "percent",
        expr,
      };
    });

    Object.keys(costOfComponentCalculation).forEach((key) => {
      const expr = costOfComponentCalculation[key];

      costOfCapitalData[key] = {
        type: "percent",
        expr,
      };
    });
    const costOfCapitalDataKeys = Object.keys(costOfCapitalData);
    const formatCellForExcelOutput = makeFormatCellForExcelOutput(
      valuationCurrencySymbol,
      inputQueries.map(({ name }) => name),
      costOfCapitalDataKeys,
      scope
    );
    const formatValueForExcelOutput = makeFormatValueForExcelOutput(
      valuationCurrencySymbol
    );

    const transformedInputsData = [];

    inputQueries.forEach(({ name, type }) => {
      const value = queryParams[name];

      transformedInputsData.push(getNameFromKey(name, type));
      transformedInputsData.push(formatValueForExcelOutput(value, type));
    });

    const transformedCostOfCapitalData = [];

    costOfCapitalDataKeys.forEach((key) => {
      const { value, expr, type } = costOfCapitalData[key];
      let formula = expr;

      transformedCostOfCapitalData.push(getNameFromKey(key, type));
      transformedCostOfCapitalData.push(
        formatCellForExcelOutput(
          {
            ...costOfCapitalData[key],
            expr: formula,
            value,
          },
          costOfCapitalWorksheetName
        )
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
      2
    );
    const chunkedValuationData = getChunksOfArray(
      transformedValuationData,
      numberOfValuationColumns
    );
    const inputsWorksheet = utils.aoa_to_sheet(chunkedInputsData);
    const costOfCapitalWorksheet = utils.aoa_to_sheet(chunkedCostOfCapitalData);
    const valuationOutputWorksheet = utils.aoa_to_sheet(chunkedValuationData);

    inputsWorksheet["!cols"] = [{ width: 39 }, { width: 15 }];
    costOfCapitalWorksheet["!cols"] = [{ width: 47 }, { width: 20 }];
    valuationOutputWorksheet["!cols"] = [
      ...new Array(numberOfValuationColumns),
    ].map((_, i) => {
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
      costOfCapitalWorksheetName
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
