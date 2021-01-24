import { createSelector } from "@reduxjs/toolkit";
import selectCurrentEquityRiskPremium from "./selectCurrentEquityRiskPremium";
import selectGovernmentBondTenYearLastClose from "./selectGovernmentBondTenYearLastClose";

const calculateRiskFreeRate = (
  governmentBondTenYearLastClose,
  currentEquityRiskPremium
) => {
  if (
    governmentBondTenYearLastClose === null ||
    currentEquityRiskPremium?.adjDefaultSpread === null ||
    currentEquityRiskPremium?.adjDefaultSpread === undefined
  ) {
    return null;
  }

  const riskFreeRate =
    governmentBondTenYearLastClose / 100 -
    currentEquityRiskPremium.adjDefaultSpread;

  return riskFreeRate;
};

const selectRiskFreeRate = createSelector(
  selectGovernmentBondTenYearLastClose,
  selectCurrentEquityRiskPremium,
  calculateRiskFreeRate
);

export default selectRiskFreeRate;
