import { createSelector } from "@reduxjs/toolkit";
import makeCellKeysSelector from "./makeCellKeysSelector";

const selectCostOfCapitalCells = createSelector(
  makeCellKeysSelector("C", "M", [12]),
  (...cells) => {
    return cells;
  }
);

export default selectCostOfCapitalCells;
