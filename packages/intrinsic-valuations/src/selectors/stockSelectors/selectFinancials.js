import { createSelector } from "@reduxjs/toolkit";

const selectFinancials = createSelector((state) => state.stock.financials);

export default selectFinancials;
