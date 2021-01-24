import { createSelector } from "@reduxjs/toolkit";
import selectHighlights from "./selectHighlights";
import selectThresholdMarketCap from "./selectThresholdMarketCap";

const selectIsLargeCompany = createSelector(
  selectHighlights,
  selectThresholdMarketCap,
  (highlights, thresholdMarketCap) => {
    if (!highlights) return null;

    return highlights.MarketCapitalization >= thresholdMarketCap;
  }
);

export default selectIsLargeCompany;
