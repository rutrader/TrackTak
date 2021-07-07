import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash-es";
import { queryNames } from "../../spreadsheet/templates/freeCashFlowFirmSimple/inputQueryNames";
import selectEstimatedCostOfDebt from "./selectEstimatedCostOfDebt";

const selectPretaxCostOfDebt = (inputQueryParams) =>
  createSelector(selectEstimatedCostOfDebt, (estimatedCostOfDebt) =>
    isNil(inputQueryParams[queryNames.pretaxCostOfDebt])
      ? estimatedCostOfDebt
      : inputQueryParams[queryNames.pretaxCostOfDebt],
  );

export default selectPretaxCostOfDebt;
