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

    if (sharesStats.SharesOutstanding === 0) {
      return highlights.MarketCapitalization / price;
    }

    return sharesStats.SharesOutstanding;
  },
);

export default selectSharesOutstanding;
