import { createSelector } from "@reduxjs/toolkit";
import makeCellKeysSelector from "./makeCellKeysSelector";

const selectReinvestmentCells = createSelector(
  makeCellKeysSelector("C", "M", [8]),
  (...cells) => {
    return cells;
  }
);

export default selectReinvestmentCells;
