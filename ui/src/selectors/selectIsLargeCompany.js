import { createSelector } from "@reduxjs/toolkit";
import selectThresholdMarketCap from "./selectThresholdMarketCap";

const selectIsLargeCompany = createSelector(
  (state) => state.fundamentals.data.Highlights.MarketCapitalization,
  selectThresholdMarketCap,
  (marketCapitalization, thresholdMarketCap) =>
    marketCapitalization >= thresholdMarketCap
);

export default selectIsLargeCompany;
