const mockUnleveredBeta = 0.7;

const calculateCostOfCapital = (
  fundamentals,
  input,
  SharesStats,
  equityRiskPremium,
  riskFreeRate
) => {
  const marginalTaxRate = equityRiskPremium.currentCountry.corporateTaxRate;
  const estimatedMarketValueOfStraightDebt =
    (fundamentals.ttm.interestExpense *
      (1 - input.pretaxCostOfDebt ** -input.averageMaturity)) /
      input.pretaxCostOfDebt +
    fundamentals.currentBookValueOfDebt /
      input.pretaxCostOfDebt ** input.averageMaturity;
  const estimatedValueOfStraightDebtInConvertibleDebt =
    (input.interestExpenseOnConvertibleDebt *
      (1 - input.pretaxCostOfDebt ** -input.maturityOfConvertibleDebt)) /
      input.pretaxCostOfDebt +
    input.bookValueOfConvertibleDebt /
      input.pretaxCostOfDebt ** input.maturityOfConvertibleDebt;
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
    mockUnleveredBeta *
    (1 + marginalTaxRate) *
    (marketValue.debt / marketValue.equity);

  const costOfComponent = {
    equity:
      riskFreeRate +
      leveredBetaForEquity * equityRiskPremium.currentEquityRiskPremium,
    debt: input.pretaxCostOfDebt * marginalTaxRate,
    preferredStock: input.annualDividendPerShare / input.marketPricePerShare,
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
