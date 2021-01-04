import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import selectQueryParams from "./selectQueryParams";
import calculateBlackScholesModel from "../shared/calculateBlackScholesModel";

const selectValueOption = createSelector(
  (state) => state.fundamentals.price,
  selectQueryParams,
  selectRiskFreeRate,
  (state) => state.fundamentals.currentIndustry?.standardDeviationInStockPrices,
  (price, queryParams, riskFreeRate, standardDeviationInStockPrices) => {
    if (queryParams.averageStrikePrice === undefined) return null;
    if (queryParams.averageMaturityOfOptions === undefined) return null;

    return calculateBlackScholesModel(
      "call",
      price,
      queryParams.averageStrikePrice,
      queryParams.averageMaturityOfOptions,
      riskFreeRate,
      standardDeviationInStockPrices
    );
  }
);

export default selectValueOption;
