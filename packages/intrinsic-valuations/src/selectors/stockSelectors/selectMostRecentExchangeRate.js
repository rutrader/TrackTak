import { createSelector } from "@reduxjs/toolkit";
import selectExchangeRates from "./selectExchangeRates";

const selectMostRecentExchangeRate = createSelector(
  selectExchangeRates,
  (exchangeRates) => {
    if (!exchangeRates?.length) return null;

    return exchangeRates[0];
  },
);

export default selectMostRecentExchangeRate;
