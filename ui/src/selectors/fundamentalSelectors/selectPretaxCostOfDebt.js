import { createSelector } from "@reduxjs/toolkit";
import selectEstimatedCostOfDebt from "./selectEstimatedCostOfDebt";

const selectPretaxCostOfDebt = (inputQueryParams) =>
  createSelector(selectEstimatedCostOfDebt, (estimatedCostOfDebt) =>
    inputQueryParams.pretaxCostOfDebt !== undefined
      ? inputQueryParams.pretaxCostOfDebt
      : estimatedCostOfDebt,
  );

export default selectPretaxCostOfDebt;
