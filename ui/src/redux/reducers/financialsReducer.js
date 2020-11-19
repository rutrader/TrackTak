import { createReducer } from "@reduxjs/toolkit";
import { getFinancials } from "../actions/financialsActions";

const initialState = {
  data: null,
  isLoading: false,
};

export const financialsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getFinancials.fulfilled, (state, action) => {
    state.data = action.payload;
    state.isLoading = false;
  });
  builder.addCase(getFinancials.rejected, (state) => {
    state.isLoading = false;
  });
  builder.addCase(getFinancials.pending, (state) => {
    state.isLoading = true;
  });
});
