import { createSelector } from "@reduxjs/toolkit";
import selectEstimatedCostOfDebt from "./selectEstimatedCostOfDebt";
import selectQueryParams from "../routerSelectors/selectQueryParams";

const selectPretaxCostOfDebt = createSelector(
  selectQueryParams,
  selectEstimatedCostOfDebt,
  (queryParams, estimatedCostOfDebt) =>
    queryParams.pretaxCostOfDebt !== undefined
      ? queryParams.pretaxCostOfDebt
      : estimatedCostOfDebt
);

export default selectPretaxCostOfDebt;
