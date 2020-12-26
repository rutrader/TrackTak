import { createSelector } from "@reduxjs/toolkit";

const calculateRiskFreeRate = (
  governmentBondTenYearLastClose,
  adjustedDefaultSpread
) => {
  if (
    governmentBondTenYearLastClose === null ||
    adjustedDefaultSpread === null
  ) {
    return null;
  }

  const riskFreeRate =
    governmentBondTenYearLastClose / 100 - adjustedDefaultSpread;

  return riskFreeRate;
};

export const selectRiskFreeRate = createSelector(
  (state) => state.fundamentals.governmentBondTenYearLastClose,
  (state) =>
    state.fundamentals.currentEquityRiskPremiumCountry?.adjDefaultSpread ??
    null,
  calculateRiskFreeRate
);

export default calculateRiskFreeRate;
