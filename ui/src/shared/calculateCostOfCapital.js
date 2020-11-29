const calculateCostOfCapital = (
  fundamentals,
  input,
  SharesStats,
  equityRiskPremium,
  riskFreeRate,
  currentIndustry
) => {
  const marginalTaxRate = equityRiskPremium.currentCountry.corporateTaxRate;
  const estimatedMarketValueOfStraightDebt =
    (fundamentals.ttm.interestExpense *
      (1 - (1 + input.pretaxCostOfDebt) ** -input.averageMaturityOfDebt)) /
      input.pretaxCostOfDebt +
    fundamentals.currentBookValueOfDebt /
      (1 + input.pretaxCostOfDebt) ** input.averageMaturityOfDebt;
  let estimatedValueOfStraightDebtInConvertibleDebt =
    (input.interestExpenseOnConvertibleDebt *
      (1 - (1 + input.pretaxCostOfDebt) ** -input.maturityOfConvertibleDebt)) /
      input.pretaxCostOfDebt +
    input.bookValueOfConvertibleDebt /
      (1 + input.pretaxCostOfDebt) ** input.maturityOfConvertibleDebt;

  estimatedValueOfStraightDebtInConvertibleDebt = isNaN(
    estimatedValueOfStraightDebtInConvertibleDebt
  )
    ? 0
    : estimatedValueOfStraightDebtInConvertibleDebt;

  const marketValue = {
    equity: fundamentals.currentPrice * SharesStats.SharesOutstanding,
    debt:
      estimatedMarketValueOfStraightDebt +
      estimatedValueOfStraightDebtInConvertibleDebt,
    preferredStock: input.numberOfPreferredShares * input.marketPricePerShare,
    get total() {
      return this.equity + this.debt + this.preferredStock;
    },
  };
  const weightInCostOfCapital = {
    equity: marketValue.equity / marketValue.total,
    debt: marketValue.debt / marketValue.total,
    preferredStock: marketValue.preferredStock / marketValue.total,
    get total() {
      return this.equity + this.debt + this.preferredStock;
    },
  };
  const leveredBetaForEquity =
    currentIndustry.unleveredBeta *
    (1 + (1 - marginalTaxRate)) *
    (marketValue.debt / marketValue.equity);

  const costOfPreferredStock =
    input.annualDividendPerShare / input.marketPricePerShare;

  const costOfComponent = {
    equity:
      riskFreeRate +
      leveredBetaForEquity * equityRiskPremium.currentCountry.equityRiskPremium,
    debt: input.pretaxCostOfDebt * marginalTaxRate,
    preferredStock: isNaN(costOfPreferredStock) ? 0 : costOfPreferredStock,
    get total() {
      return (
        weightInCostOfCapital.equity * this.equity +
        weightInCostOfCapital.debt * this.debt +
        weightInCostOfCapital.preferredStock * this.preferredStock
      );
    },
  };

  return costOfComponent.total;
};

export default calculateCostOfCapital;
