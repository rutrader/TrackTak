import { createSelector } from "@reduxjs/toolkit";
import selectCostOfCapitalCells from "./cellSelectors/selectCostOfCapitalCells";

const selectCostOfCapitals = createSelector(
  selectCostOfCapitalCells,
  (costOfCapitalCells) => {
    const newCostOfCapitalCells = [...costOfCapitalCells];
    const terminalCostOfCapitalCell = newCostOfCapitalCells.pop();

    const costOfCapitals = {
      baseYear: null,
      terminalYear: terminalCostOfCapitalCell.value,
    };

    newCostOfCapitalCells.forEach((_, i) => {
      const year = i + 1;
      const costOfCapital = newCostOfCapitalCells[i].value;

      costOfCapitals[year] = costOfCapital;
    });

    return costOfCapitals;
  }
);

export default selectCostOfCapitals;
