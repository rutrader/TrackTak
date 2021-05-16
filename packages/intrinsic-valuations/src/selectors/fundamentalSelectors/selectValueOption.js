import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import calculateBlackScholesModel from "../../shared/calculateBlackScholesModel";
import selectPrice from "./selectPrice";
import selectCurrentIndustry from "./selectCurrentIndustry";
import { isNil } from "lodash-es";

const selectValueOption = (inputQueryParams) =>
  createSelector(
    selectPrice,
    selectRiskFreeRate,
    selectCurrentIndustry,
    (price, riskFreeRate, currentIndustry) => {
      if (isNil(inputQueryParams.averageStrikePrice)) return null;
      if (isNil(inputQueryParams.averageMaturityOfOptions)) return null;

      return calculateBlackScholesModel(
        "call",
        price,
        inputQueryParams.averageStrikePrice,
        inputQueryParams.averageMaturityOfOptions,
        riskFreeRate,
        currentIndustry.standardDeviationInStockPrices,
      );
    },
  );

export default selectValueOption;
