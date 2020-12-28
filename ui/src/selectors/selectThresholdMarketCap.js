import { createSelector } from "@reduxjs/toolkit";

export const thresholdMarketCapUSD = 5000000000;

const calculateThresholdMarketCap = (mostRecentExchangeRate) => {
  const thresholdMarketCapConverted = mostRecentExchangeRate
    ? thresholdMarketCapUSD * mostRecentExchangeRate.close
    : thresholdMarketCapUSD;

  return thresholdMarketCapConverted;
};

const selectThresholdMarketCap = createSelector(
  (state) => state.fundamentals.mostRecentExchangeRate,
  calculateThresholdMarketCap
);

export default selectThresholdMarketCap;
