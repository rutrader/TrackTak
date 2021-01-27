import { Button } from "@material-ui/core";
import React from "react";
import { getNumberOfColumns, padCellKeys } from "./utils";
import selectQueryParams, {
  inputQueries,
} from "../selectors/routerSelectors/selectQueryParams";
import { utils, writeFile } from "xlsx";
import { sentenceCase } from "change-case";
import makeFormatCellForExcelOutput from "./makeFormatCellForExcelOutput";
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
import { getPretaxCostOfDebt } from "../selectors/fundamentalSelectors/selectPretaxCostOfDebt";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectSharesStats from "../selectors/fundamentalSelectors/selectSharesStats";
import { evaluate } from "../shared/math";

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
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const balanceSheet = useSelector(selectRecentBalanceSheet);
  const price = useSelector(selectPrice);
  const { SharesOutstanding } = useSelector(selectSharesStats);

  const exportToCSVOnClick = () => {
    const formatCellForExcelOutput = makeFormatCellForExcelOutput(
      valuationCurrencySymbol
    );
    const cellKeysSorted = padCellKeys(
      Object.keys(cells).sort(sortAlphaNumeric)
    );
    const transformedInputsData = [];
    const getNameFromKey = (key, type) => {
      let newName = sentenceCase(key);

      if (type === "million") {
        newName += " (mln)";
      }

      return newName;
    };

    inputQueries.forEach(({ name, type }) => {
      const value = queryParams[name];

      transformedInputsData.push(getNameFromKey(name));
      transformedInputsData.push(formatCellForExcelOutput({ value, type }));
    });

    const costOfCapitalData = {
      marginalTaxRate: {
        type: "percent",
        value: currentEquityRiskPremium.corporateTaxRate,
      },
      equityRiskPremium: {
        type: "percent",
        value: currentEquityRiskPremium.equityRiskPremium,
      },
      governmentBondTenYearLastClose: {
        type: "currency",
        value: governmentBondTenYearLastClose,
      },
      adjDefaultSpread: {
        type: "percent",
        value: currentEquityRiskPremium.adjDefaultSpread,
      },
      riskFreeRate: { type: "percent", expr: riskFreeRateCalculation },
      interestSpread: { type: "percent", value: interestSpread.spread },
      bookValueOfDebt: {
        type: "currency",
        value: balanceSheet.bookValueOfDebt,
      },
      interestExpense: {
        type: "currency",
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
        type: "currency",
        expr: evaluate(costOfPreferredStockCalculation, {
          marketPricePerShare: queryParams.marketPricePerShare ?? 0,
          annualDividendPerShare: queryParams.annualDividendPerShare ?? 0,
        }),
      },
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

      costOfCapitalData[key] = {
        type: "currency",
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

    const transformedCostOfCapitalData = [];
    const costOfCapitalDataKeys = Object.keys(costOfCapitalData);

    costOfCapitalDataKeys.forEach((key) => {
      const { value, expr } = costOfCapitalData[key];
      let formula = expr;

      transformedCostOfCapitalData.push(getNameFromKey(key));

      if (formula) {
        const matches = formula.match(/[A-Za-z]+/g);

        matches.forEach((match) => {
          let row = costOfCapitalDataKeys.indexOf(match) + 1;
          let cellDependency = `B${row}`;

          if (row === 0) {
            row = inputQueries.findIndex(({ name }) => name === match);
            cellDependency = `${inputsWorksheetName}!B${row}`;
          }

          formula = formula.replaceAll(match, cellDependency);
        });
      }

      transformedCostOfCapitalData.push(
        formatCellForExcelOutput({
          ...costOfCapitalData[key],
          expr: formula,
          value,
        })
      );
    });

    console.log(transformedCostOfCapitalData);

    const numberOfColumns = getNumberOfColumns(cells);

    const valuationChunkedData = getChunksOfArray(
      cellKeysSorted,
      numberOfColumns
    ).map((arr) => {
      return arr.map((cellKey) => {
        return formatCellForExcelOutput(cells[cellKey], scope);
      });
    });

    const inputsWorksheet = setColumnWidths(
      utils.aoa_to_sheet(getChunksOfArray(transformedInputsData, 2))
    );
    // const costOfCapitalWorksheet = setColumnWidths(
    //   utils.aoa_to_sheet(costOfCapitalData)
    // );
    const valuationOutputWorksheet = setColumnWidths(
      utils.aoa_to_sheet(valuationChunkedData)
    );

    const workBook = utils.book_new();

    utils.book_append_sheet(workBook, inputsWorksheet, inputsWorksheetName);
    utils.book_append_sheet(
      workBook,
      // costOfCapitalWorksheet,
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
