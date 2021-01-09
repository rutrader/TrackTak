import { createSelector } from "@reduxjs/toolkit";
import selectNetOperatingProfitAfterTaxCells from "./cellSelectors/selectNetOperatingProfitAfterTaxCells";
import selectCostOfCapitals from "./selectCostOfCapitals";
import selectInvestedCapitals from "./selectInvestedCapitals";

const selectReturnOnInvestmentCapitals = createSelector(
  selectNetOperatingProfitAfterTaxCells,
  (state) => state.fundamentals.balanceSheet.investedCapital,
  selectInvestedCapitals,
  selectCostOfCapitals,
  (nopatCells, currentInvestedCapital, investedCapitals, costOfCapitals) => {
    const newNopatCells = [...nopatCells];
    const baseYear = newNopatCells.shift();

    // Remove terminalYear
    newNopatCells.pop();

    const returnOnInvestmentCapitals = {
      baseYear: baseYear.value / currentInvestedCapital,
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
