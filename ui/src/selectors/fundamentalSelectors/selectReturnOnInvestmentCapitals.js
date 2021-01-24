import { createSelector } from "@reduxjs/toolkit";
import selectNetOperatingProfitAfterTaxCells from "./cellSelectors/selectNetOperatingProfitAfterTaxCells";
import selectCostOfCapitals from "./selectCostOfCapitals";
import selectInvestedCapitals from "./selectInvestedCapitals";
import selectRecentBalanceSheet from "./selectRecentBalanceSheet";

const selectReturnOnInvestmentCapitals = createSelector(
  selectNetOperatingProfitAfterTaxCells,
  selectRecentBalanceSheet,
  selectInvestedCapitals,
  selectCostOfCapitals,
  (nopatCells, balanceSheet, investedCapitals, costOfCapitals) => {
    const investedCapital = balanceSheet.investedCapital;
    const newNopatCells = [...nopatCells];
    const baseYear = newNopatCells.shift();

    // Remove terminalYear
    newNopatCells.pop();

    const returnOnInvestmentCapitals = {
      baseYear: baseYear.value / investedCapital,
      terminalYear: costOfCapitals[10],
    };

    newNopatCells.forEach((cell, i) => {
      const year = i + 1;

      returnOnInvestmentCapitals[year] = cell.value / investedCapitals[year];
    });

    return returnOnInvestmentCapitals;
  }
);

export default selectReturnOnInvestmentCapitals;
