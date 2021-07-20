import { createSelector } from "@reduxjs/toolkit";

const selectFinancialsIsLoading = createSelector(
  (state) => state.stock.isLoading,
);

export default selectFinancialsIsLoading;
