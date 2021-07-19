import { createAction } from "@reduxjs/toolkit";

export const setFundamentals = createAction("fundamentals/setFundamentals");
export const setExchangeRates = createAction("fundamentals/setExchangeRates");
export const setTenYearGovernmentBondLastClose = createAction(
  "fundamentals/setTenYearGovernmentBondLastClose",
);
export const setLastPriceClose = createAction("fundamentals/setLastPriceClose");
