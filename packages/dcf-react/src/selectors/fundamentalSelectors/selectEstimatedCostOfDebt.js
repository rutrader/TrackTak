import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import selectInterestSpread from "./selectInterestSpread";
import selectCurrentEquityRiskPremium from "./selectCurrentEquityRiskPremium";
import { evaluate } from "../../shared/math";
import { estimatedCostOfDebtCalculation } from "../../discountedCashFlow/expressionCalculations";

const selectEstimatedCostOfDebt = createSelector(
  selectRiskFreeRate,
  selectInterestSpread,
  selectCurrentEquityRiskPremium,
  (riskFreeRate, interestSpread, currentEquityRiskPremium) => {
    const value = evaluate(estimatedCostOfDebtCalculation, {
      riskFreeRate,
      interestSpread: interestSpread?.spread,
      adjDefaultSpread: currentEquityRiskPremium?.adjDefaultSpread,
    });

    return value;
  }
);

export default selectEstimatedCostOfDebt;
