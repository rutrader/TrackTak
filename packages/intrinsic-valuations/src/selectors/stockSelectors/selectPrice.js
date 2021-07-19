import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash-es";
import selectGeneral from "./selectGeneral";
import selectPriceLastClose from "./selectPriceLastClose";

const selectPrice = createSelector(
  selectGeneral,
  selectPriceLastClose,
  (general, priceLastClose) => {
    return general?.currencyCode === "GBX" || general?.currencyCode === "ILA"
      ? isNil(priceLastClose)
        ? null
        : priceLastClose / 100
      : priceLastClose;
  },
);

export default selectPrice;
