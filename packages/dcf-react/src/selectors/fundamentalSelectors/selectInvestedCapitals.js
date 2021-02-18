import { createSelector } from "@reduxjs/toolkit";
import selectReinvestmentCells from "./cellSelectors/selectReinvestmentCells";
import selectRecentBalanceSheet from "./selectRecentBalanceSheet";

const selectInvestedCapitals = createSelector(
  selectRecentBalanceSheet,
  selectReinvestmentCells,
  (balanceSheet, reinvestmentCells) => {
    const currentInvestedCapital = balanceSheet.investedCapital;
    const newReinvestmentCells = [...reinvestmentCells];
    const investedCapitals = {
      baseYear: currentInvestedCapital,
      terminalYear: null,
    };

    // Remove terminalYear
    newReinvestmentCells.pop();

    newReinvestmentCells.reduce((prev, _, i) => {
      const year = i + 1;
      const reinvestment = newReinvestmentCells[i].value;
      const investedCapital = prev + reinvestment;

      investedCapitals[year] = investedCapital;

      return investedCapital;
    }, currentInvestedCapital);

    return investedCapitals;
  }
);

export default selectInvestedCapitals;
