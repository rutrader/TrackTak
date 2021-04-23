import { createSelector } from "@reduxjs/toolkit";
import selectHighlights from "./selectHighlights";
import selectPrice from "./selectPrice";

const selectSharesOutstanding = createSelector(
  selectHighlights,
  selectPrice,
  (highlights, price) => {
    if (!highlights) return null;

    return highlights.marketCapitalization / price;
  },
);

export default selectSharesOutstanding;
