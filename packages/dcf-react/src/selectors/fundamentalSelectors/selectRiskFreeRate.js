import { createSelector } from "@reduxjs/toolkit";
import { riskFreeRateCalculation } from "../../discountedCashFlow/expressionCalculations";
import selectCurrentEquityRiskPremium from "./selectCurrentEquityRiskPremium";
import selectGovernmentBondTenYearYield from "./selectGovernmentBondTenYearYield";
import { evaluate } from "../../shared/math";

const calculateRiskFreeRate = (
  governmentBondTenYearYield,
  currentEquityRiskPremium
) => {
  if (
    governmentBondTenYearYield === null ||
    currentEquityRiskPremium?.adjDefaultSpread === null ||
    currentEquityRiskPremium?.adjDefaultSpread === undefined
  ) {
    return null;
  }

  const riskFreeRate = evaluate(riskFreeRateCalculation, {
    governmentBondTenYearYield,
    adjDefaultSpread: currentEquityRiskPremium.adjDefaultSpread,
  });

  return riskFreeRate;
};

const selectRiskFreeRate = createSelector(
  selectGovernmentBondTenYearYield,
  selectCurrentEquityRiskPremium,
  calculateRiskFreeRate
);

export default selectRiskFreeRate;
