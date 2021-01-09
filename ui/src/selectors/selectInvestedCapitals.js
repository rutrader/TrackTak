import { createSelector } from "@reduxjs/toolkit";
import selectReinvestmentCells from "./cellSelectors/selectReinvestmentCells";

const selectInvestedCapitals = createSelector(
  (state) => state.fundamentals.balanceSheet.investedCapital,
  selectReinvestmentCells,
  (currentInvestedCapital, reinvestmentCells) => {
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
