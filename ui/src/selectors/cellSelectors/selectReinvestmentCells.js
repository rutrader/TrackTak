import { createSelector } from "@reduxjs/toolkit";
import getCellKeysSelector from "./getCellKeysSelector";

const selectReinvestmentCells = createSelector(
  getCellKeysSelector("C", "M", [8]),
  (...cells) => {
    return cells;
  }
);

export default selectReinvestmentCells;
