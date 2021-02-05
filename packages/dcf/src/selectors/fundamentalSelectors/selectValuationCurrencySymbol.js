import selectValuationCurrencyCode from "./selectValuationCurrencyCode";
import getSymbolFromCurrency from "currency-symbol-map";
import { createSelector } from "@reduxjs/toolkit";

const selectValuationCurrencySymbol = createSelector(
  selectValuationCurrencyCode,
  (currencyCode) => getSymbolFromCurrency(currencyCode)
);

export default selectValuationCurrencySymbol;
