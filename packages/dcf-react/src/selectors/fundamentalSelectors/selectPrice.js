import { createSelector } from "@reduxjs/toolkit";
import selectGeneral from "./selectGeneral";
import selectPriceLastClose from "./selectPriceLastClose";

const selectPrice = createSelector(
  selectGeneral,
  selectPriceLastClose,
  (general, priceLastClose) => {
    return general?.currencyCode === "GBX"
      ? priceLastClose / 100
      : priceLastClose;
  },
);

export default selectPrice;
