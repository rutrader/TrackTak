import { createSelector } from "@reduxjs/toolkit";
import makeCellKeysSelector from "./makeCellKeysSelector";

const selectNetOperatingProfitAfterTaxCells = createSelector(
  makeCellKeysSelector("B", "M", [7]),
  (...cells) => {
    return cells;
  }
);

export default selectNetOperatingProfitAfterTaxCells;
