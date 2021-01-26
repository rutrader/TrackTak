import { createSelector } from "@reduxjs/toolkit";
import selectEstimatedCostOfDebt from "./selectEstimatedCostOfDebt";
import selectQueryParams from "../routerSelectors/selectQueryParams";

export const getPretaxCostOfDebt = (queryParams, estimatedCostOfDebt) =>
  queryParams.pretaxCostOfDebt !== undefined
    ? queryParams.pretaxCostOfDebt
    : estimatedCostOfDebt;

const selectPretaxCostOfDebt = createSelector(
  selectQueryParams,
  selectEstimatedCostOfDebt,
  getPretaxCostOfDebt
);

export default selectPretaxCostOfDebt;
