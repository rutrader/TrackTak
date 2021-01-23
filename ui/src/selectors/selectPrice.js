import { createSelector } from "@reduxjs/toolkit";

const selectPrice = createSelector(
  (state) => state.fundamentals.data?.General.CurrencyCode,
  (state) => state.fundamentals.priceLastClose,
  (currencyCode, priceLastClose) => {
    return currencyCode === "GBX" ? priceLastClose / 100 : priceLastClose;
  }
);

export default selectPrice;
