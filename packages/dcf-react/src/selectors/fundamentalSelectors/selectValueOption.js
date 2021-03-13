import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import calculateBlackScholesModel from "../../shared/calculateBlackScholesModel";
import selectPrice from "./selectPrice";
import selectCurrentIndustry from "./selectCurrentIndustry";

const selectValueOption = (inputQueryParams) =>
  createSelector(
    selectPrice,
    selectRiskFreeRate,
    selectCurrentIndustry,
    (price, riskFreeRate, currentIndustry) => {
      if (inputQueryParams.averageStrikePrice === undefined) return null;
      if (inputQueryParams.averageMaturityOfOptions === undefined) return null;

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
