import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import selectInterestSpread from "./selectInterestSpread";
import selectCurrentEquityRiskPremium from "./selectCurrentEquityRiskPremium";

const selectEstimatedCostOfDebt = createSelector(
  selectRiskFreeRate,
  selectInterestSpread,
  selectCurrentEquityRiskPremium,
  (riskFreeRate, interestSpread, currentEquityRiskPremium) => {
    const value =
      riskFreeRate +
      interestSpread?.spread +
      currentEquityRiskPremium?.adjDefaultSpread;

    return value;
  },
);

export default selectEstimatedCostOfDebt;
