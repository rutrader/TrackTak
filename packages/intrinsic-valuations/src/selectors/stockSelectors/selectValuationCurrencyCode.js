import { createSelector } from "@reduxjs/toolkit";
import convertSubCurrencyToCurrency from "../../shared/convertSubCurrencyToCurrency";
import selectFinancials from "./selectFinancials";

const selectValuationCurrencyCode = createSelector(
  selectFinancials,
  (financials) =>
    convertSubCurrencyToCurrency(financials?.general.currencyCode),
);

export default selectValuationCurrencyCode;
