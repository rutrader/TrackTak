import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import selectInterestSpread from "./selectInterestSpread";

const selectEstimatedCostOfDebt = createSelector(
  selectRiskFreeRate,
  selectInterestSpread,
  (state) =>
    state.fundamentals.currentEquityRiskPremiumCountry?.adjDefaultSpread,
  (riskFreeRate, interestSpread, adjDefaultSpread) => {
    const value = riskFreeRate + interestSpread?.spread + adjDefaultSpread;

    if (isNaN(value)) return null;

    return value;
  }
);

export default selectEstimatedCostOfDebt;
