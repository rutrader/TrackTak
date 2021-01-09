import { createSelector } from "@reduxjs/toolkit";
import getCellKeysSelector from "./getCellKeysSelector";

const selectCostOfCapitalCells = createSelector(
  getCellKeysSelector("C", "M", [12]),
  (...cells) => {
    return cells;
  }
);

export default selectCostOfCapitalCells;
