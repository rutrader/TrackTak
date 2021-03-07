import { createSelector } from "@reduxjs/toolkit";
import convertGBXToGBP from "../../shared/convertGBXToGBP";
import selectGeneral from "./selectGeneral";

const selectValuationCurrencyCode = createSelector(selectGeneral, (general) =>
  convertGBXToGBP(general?.currencyCode),
);

export default selectValuationCurrencyCode;
