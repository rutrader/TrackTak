import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash-es";
import selectEstimatedCostOfDebt from "./selectEstimatedCostOfDebt";

const selectPretaxCostOfDebt = (inputQueryParams) =>
  createSelector(selectEstimatedCostOfDebt, (estimatedCostOfDebt) =>
    isNil(inputQueryParams.pretaxCostOfDebt)
      ? estimatedCostOfDebt
      : inputQueryParams.pretaxCostOfDebt,
  );

export default selectPretaxCostOfDebt;
