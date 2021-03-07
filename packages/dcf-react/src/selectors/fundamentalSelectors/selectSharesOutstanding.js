import { createSelector } from "@reduxjs/toolkit";
import selectSharesStats from "./selectSharesStats";
import selectHighlights from "./selectHighlights";
import selectPrice from "./selectPrice";

const selectSharesOutstanding = createSelector(
  selectSharesStats,
  selectHighlights,
  selectPrice,
  (sharesStats, highlights, price) => {
    if (!sharesStats) return null;

    if (sharesStats.sharesOutstanding === 0) {
      return highlights.marketCapitalization / price;
    }

    return sharesStats.sharesOutstanding;
  },
);

export default selectSharesOutstanding;
