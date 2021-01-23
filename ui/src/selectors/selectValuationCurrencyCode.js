import { createSelector } from "@reduxjs/toolkit";
import convertGBXToGBP from "../shared/convertGBXToGBP";

const selectValuationCurrencyCode = createSelector(
  (state) => state.fundamentals.data?.General.CurrencyCode,
  (currencyCode) => convertGBXToGBP(currencyCode)
);

export default selectValuationCurrencyCode;
