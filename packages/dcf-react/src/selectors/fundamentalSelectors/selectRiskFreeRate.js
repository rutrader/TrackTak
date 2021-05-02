import { createSelector } from "@reduxjs/toolkit";
import { debtCalculation } from "../../discountedCashFlow/expressionCalculations";
import selectCurrentEquityRiskPremium from "./selectCurrentEquityRiskPremium";
import selectGovernmentBondTenYearYield from "./selectGovernmentBondTenYearYield";
import { evaluate } from "../../shared/math";
import isNil from "lodash/isNil";

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

  const riskFreeRate = evaluate(debtCalculation.riskFreeRate, {
    governmentBondTenYearYield,
    adjDefaultSpread: currentEquityRiskPremium.adjDefaultSpread,
  });

  return riskFreeRate;
};

const selectRiskFreeRate = createSelector(
  selectGovernmentBondTenYearYield,
  selectCurrentEquityRiskPremium,
  calculateRiskFreeRate,
);

export default selectRiskFreeRate;
