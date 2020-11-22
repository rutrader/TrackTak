import { createReducer } from "@reduxjs/toolkit";
import { getFundamentals } from "../actions/fundamentalsActions";

const initialState = {
  data: null,
  currentPrice: null,
};

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getFundamentals.fulfilled, (state, action) => {
    const fundamentalsData = action.payload;
    state.data = fundamentalsData;

    state.currentPrice =
      fundamentalsData.Highlights.MarketCapitalization /
      fundamentalsData.SharesStats.SharesOutstanding;
  });
});
