import { createSelector } from "@reduxjs/toolkit";
import selectCurrentEquityRiskPremium from "./selectCurrentEquityRiskPremium";
import selectGovernmentBondTenYearYield from "./selectGovernmentBondTenYearYield";
import { isNil } from "lodash-es";

const calculateRiskFreeRate = (
  governmentBondTenYearYield,
  currentEquityRiskPremium,
) => {
  if (
    isNil(governmentBondTenYearYield) ||
    isNil(currentEquityRiskPremium?.adjDefaultSpread)
  ) {
    return null;
  }

  const riskFreeRate =
    governmentBondTenYearYield - currentEquityRiskPremium.adjDefaultSpread;

  return riskFreeRate;
};

const selectRiskFreeRate = createSelector(
  selectGovernmentBondTenYearYield,
  selectCurrentEquityRiskPremium,
  calculateRiskFreeRate,
);

export default selectRiskFreeRate;
