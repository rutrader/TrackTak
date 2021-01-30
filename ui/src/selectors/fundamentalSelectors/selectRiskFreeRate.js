import { createSelector } from "@reduxjs/toolkit";
import { riskFreeRateCalculation } from "../../discountedCashFlow/expressionCalculations";
import selectCurrentEquityRiskPremium from "./selectCurrentEquityRiskPremium";
import selectGovernmentBondTenYearLastClose from "./selectGovernmentBondTenYearLastClose";
import { evaluate } from "../../shared/math";

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

  const riskFreeRate = evaluate(riskFreeRateCalculation, {
    governmentBondTenYearLastClose,
    adjDefaultSpread: currentEquityRiskPremium.adjDefaultSpread,
  });

  return riskFreeRate;
};

const selectRiskFreeRate = createSelector(
  selectGovernmentBondTenYearLastClose,
  selectCurrentEquityRiskPremium,
  calculateRiskFreeRate
);

export default selectRiskFreeRate;
