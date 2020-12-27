import { createSelector } from "@reduxjs/toolkit";
import { selectRiskFreeRate } from "./calculateRiskFreeRate";
import { selectQueryParams } from "./getInputQueryParams";

const calculateCostOfCapital = (fundamentals, query, riskFreeRate) => {
  const marginalTaxRate =
    fundamentals.currentEquityRiskPremiumCountry.corporateTaxRate;
  const estimatedMarketValueOfStraightDebt =
    (fundamentals.incomeStatement.interestExpense *
      (1 - (1 + query.pretaxCostOfDebt) ** -query.averageMaturityOfDebt)) /
      query.pretaxCostOfDebt +
    fundamentals.balanceSheet.bookValueOfDebt /
      (1 + query.pretaxCostOfDebt) ** query.averageMaturityOfDebt;
  let estimatedValueOfStraightDebtInConvertibleDebt =
    (query.interestExpenseOnConvertibleDebt *
      (1 - (1 + query.pretaxCostOfDebt) ** -query.maturityOfConvertibleDebt)) /
      query.pretaxCostOfDebt +
    query.bookValueOfConvertibleDebt /
      (1 + query.pretaxCostOfDebt) ** query.maturityOfConvertibleDebt;

  estimatedValueOfStraightDebtInConvertibleDebt = isNaN(
    estimatedValueOfStraightDebtInConvertibleDebt
  )
    ? 0
    : estimatedValueOfStraightDebtInConvertibleDebt;

  const marketValue = {
    equity:
      fundamentals.price * fundamentals.data.SharesStats.SharesOutstanding,
    debt:
      estimatedMarketValueOfStraightDebt +
      estimatedValueOfStraightDebtInConvertibleDebt,
    preferredStock: query.numberOfPreferredShares * query.marketPricePerShare,
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
    fundamentals.currentIndustry.unleveredBeta *
    (1 + (1 - marginalTaxRate) * (marketValue.debt / marketValue.equity));

  let costOfPreferredStock =
    query.annualDividendPerShare / query.marketPricePerShare;

  costOfPreferredStock = isNaN(costOfPreferredStock) ? 0 : costOfPreferredStock;

  const costOfComponent = {
    equity:
      riskFreeRate +
      leveredBetaForEquity *
        fundamentals.currentEquityRiskPremiumCountry.equityRiskPremium,
    debt: query.pretaxCostOfDebt * marginalTaxRate,
    preferredStock: costOfPreferredStock,
    get total() {
      return (
        weightInCostOfCapital.equity * this.equity +
        weightInCostOfCapital.debt * this.debt +
        weightInCostOfCapital.preferredStock * this.preferredStock
      );
    },
  };

  return {
    leveredBetaForEquity,
    totalCostOfCapital: costOfComponent.total,
  };
};

export const selectCostOfCapital = createSelector(
  (state) => state.fundamentals,
  selectQueryParams,
  selectRiskFreeRate,
  calculateCostOfCapital
);

export default calculateCostOfCapital;
