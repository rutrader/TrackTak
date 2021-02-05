import { createSelector } from "@reduxjs/toolkit";
import selectMostRecentExchangeRate from "./selectMostRecentExchangeRate";

export const thresholdMarketCapUSD = 5000000000;

const calculateThresholdMarketCap = (mostRecentExchangeRate) => {
  const thresholdMarketCapConverted = mostRecentExchangeRate
    ? thresholdMarketCapUSD * mostRecentExchangeRate.close
    : thresholdMarketCapUSD;

  return thresholdMarketCapConverted;
};

const selectThresholdMarketCap = createSelector(
  selectMostRecentExchangeRate,
  calculateThresholdMarketCap
);

export default selectThresholdMarketCap;
