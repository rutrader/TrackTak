import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import selectInterestSpread from "./selectInterestSpread";

const selectEstimatedCostOfDebt = createSelector(
  selectRiskFreeRate,
  selectInterestSpread,
  (state) =>
    state.fundamentals.currentEquityRiskPremiumCountry.adjDefaultSpread,
  (riskFreeRate, interestSpread, adjDefaultSpread) =>
    riskFreeRate + interestSpread.spread + adjDefaultSpread
);

export default selectEstimatedCostOfDebt;
