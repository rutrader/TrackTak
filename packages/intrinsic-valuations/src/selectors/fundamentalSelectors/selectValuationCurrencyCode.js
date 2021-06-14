import { createSelector } from "@reduxjs/toolkit";
import convertSubCurrencyToCurrency from "../../shared/convertSubCurrencyToCurrency";
import selectGeneral from "./selectGeneral";

const selectValuationCurrencyCode = createSelector(selectGeneral, (general) =>
  convertSubCurrencyToCurrency(general?.currencyCode),
);

export default selectValuationCurrencyCode;
