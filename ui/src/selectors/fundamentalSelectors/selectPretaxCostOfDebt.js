import { createSelector } from "@reduxjs/toolkit";
import selectEstimatedCostOfDebt from "./selectEstimatedCostOfDebt";
import selectInputQueryParams from "../routerSelectors/selectInputQueryParams";

const selectPretaxCostOfDebt = createSelector(
  selectInputQueryParams,
  selectEstimatedCostOfDebt,
  (queryParams, estimatedCostOfDebt) =>
    queryParams.pretaxCostOfDebt !== undefined
      ? queryParams.pretaxCostOfDebt
      : estimatedCostOfDebt
);

export default selectPretaxCostOfDebt;
