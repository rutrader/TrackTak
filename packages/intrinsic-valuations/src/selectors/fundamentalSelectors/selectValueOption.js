import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import calculateBlackScholesModel from "../../shared/calculateBlackScholesModel";
import selectPrice from "./selectPrice";
import selectCurrentIndustry from "./selectCurrentIndustry";
import { isNil } from "lodash-es";
import { queryNames } from "../../discountedCashFlow/templates/freeCashFlowFirmSimple/inputQueryNames";

const selectValueOption = (inputQueryParams) =>
  createSelector(
    selectPrice,
    selectRiskFreeRate,
    selectCurrentIndustry,
    (price, riskFreeRate, currentIndustry) => {
      if (isNil(inputQueryParams[queryNames.averageStrikePrice])) return null;
      if (isNil(inputQueryParams[queryNames.averageMaturityOfOptions]))
        return null;

      return calculateBlackScholesModel(
        "call",
        price,
        inputQueryParams[queryNames.averageStrikePrice],
        inputQueryParams[queryNames.averageMaturityOfOptions],
        riskFreeRate,
        currentIndustry.standardDeviationInStockPrices,
      );
    },
  );

export default selectValueOption;
