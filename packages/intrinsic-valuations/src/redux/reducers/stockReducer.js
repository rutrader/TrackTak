import { createReducer } from "@reduxjs/toolkit";
import { setFundamentals } from "../actions/stockActions";
import { getFundamentalsThunk } from "../thunks/stockThunks";

const initialState = {
  financials: null,
  isLoading: null,
};

const setFundamentalsReducer = (state, action) => {
  state.financials = action.payload;
};

export const stockReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFundamentals, setFundamentalsReducer);
  builder.addCase(getFundamentalsThunk.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getFundamentalsThunk.fulfilled, (state) => {
    state.isLoading = false;
  });
});
