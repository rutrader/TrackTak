import { isNil } from "lodash-es";

const getRiskFreeRate = (
  governmentBondTenYearYield,
  currentEquityRiskPremium,
) => {
  if (
    isNil(governmentBondTenYearYield) ||
    isNil(currentEquityRiskPremium.adjDefaultSpread)
  ) {
    return null;
  }

  const riskFreeRate =
    governmentBondTenYearYield - currentEquityRiskPremium.adjDefaultSpread;

  return riskFreeRate;
};

export default getRiskFreeRate;
