const getEstimatedCostOfDebt = (
  riskFreeRate,
  interestSpread,
  currentEquityRiskPremium,
) => {
  if (
    riskFreeRate === null ||
    interestSpread === null ||
    !currentEquityRiskPremium
  )
    return null;

  const value =
    riskFreeRate +
    interestSpread.spread +
    currentEquityRiskPremium.adjDefaultSpread;

  return value;
};

export default getEstimatedCostOfDebt;
