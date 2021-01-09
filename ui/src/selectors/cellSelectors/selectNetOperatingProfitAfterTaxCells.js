import { createSelector } from "@reduxjs/toolkit";
import getCellKeysSelector from "./getCellKeysSelector";

const selectNetOperatingProfitAfterTaxCells = createSelector(
  getCellKeysSelector("B", "M", [7]),
  (...cells) => {
    return cells;
  }
);

export default selectNetOperatingProfitAfterTaxCells;
