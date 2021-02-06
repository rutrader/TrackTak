import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import selectInputQueryParams from "../routerSelectors/selectInputQueryParams";
import calculateBlackScholesModel from "../../shared/calculateBlackScholesModel";
import selectPrice from "./selectPrice";
import selectCurrentIndustry from "./selectCurrentIndustry";

const selectValueOption = createSelector(
  selectPrice,
  selectInputQueryParams,
  selectRiskFreeRate,
  selectCurrentIndustry,
  (price, queryParams, riskFreeRate, currentIndustry) => {
    if (queryParams.averageStrikePrice === undefined) return null;
    if (queryParams.averageMaturityOfOptions === undefined) return null;

    return calculateBlackScholesModel(
      "call",
      price,
      queryParams.averageStrikePrice,
      queryParams.averageMaturityOfOptions,
      riskFreeRate,
      currentIndustry.standardDeviationInStockPrices
    );
  }
);

export default selectValueOption;
