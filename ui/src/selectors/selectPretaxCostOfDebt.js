import { createSelector } from "@reduxjs/toolkit";
import selectEstimatedCostOfDebt from "./selectEstimatedCostOfDebt";
import selectQueryParams from "./selectQueryParams";

const selectPretaxCostOfDebt = createSelector(
  selectQueryParams,
  selectEstimatedCostOfDebt,
  (queryParams, estimatedCostOfDebt) => {
    return queryParams.pretaxCostOfDebt ?? estimatedCostOfDebt;
  }
);

export default selectPretaxCostOfDebt;
