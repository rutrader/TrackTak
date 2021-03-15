import { createReducer } from "@reduxjs/toolkit";
import { getFundamentalsThunk } from "../thunks/fundamentalsThunks";

const initialState = {
  isLoaded: null,
};

export const extendedFundamentalsReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(getFundamentalsThunk.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(getFundamentalsThunk.fulfilled, (state) => {
      state.isLoaded = true;
    });
    builder.addCase(getFundamentalsThunk.rejected, (state) => {
      state.isLoaded = false;
    });
  },
);
