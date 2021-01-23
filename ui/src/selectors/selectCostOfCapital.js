import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import selectQueryParams from "./selectQueryParams";
import selectPretaxCostOfDebt from "./selectPretaxCostOfDebt";
import selectRecentIncomeStatement from "./selectRecentIncomeStatement";
import selectRecentBalanceSheet from "./selectRecentBalanceSheet";
import selectPrice from "./selectPrice";

const calculateCostOfCapital = (
  currentEquityRiskPremiumCountry,
  currentIndustry,
  incomeStatement,
  balanceSheet,
  price,
  sharesOutstanding,
  query,
  pretaxCostOfDebt,
  riskFreeRate
) => {
  // TODO: Maybe calculate averageMaturityOfDebt automatically based on the average
  const averageMaturityOfDebt = query.averageMaturityOfDebt ?? 0;
  const maturityOfConvertibleDebt = query.maturityOfConvertibleDebt ?? 0;
  const interestExpenseOnConvertibleDebt =
    query.interestExpenseOnConvertibleDebt ?? 0;
  const bookValueOfConvertibleDebt = query.bookValueOfConvertibleDebt ?? 0;
  const numberOfPreferredShares = query.numberOfPreferredShares ?? 0;
  const marketPricePerShare = query.marketPricePerShare ?? 0;
  const annualDividendPerShare = query.annualDividendPerShare ?? 0;

  const marginalTaxRate = currentEquityRiskPremiumCountry.corporateTaxRate;
  const estimatedMarketValueOfStraightDebt =
    (incomeStatement.interestExpense *
      (1 - (1 + pretaxCostOfDebt) ** -averageMaturityOfDebt)) /
      pretaxCostOfDebt +
    balanceSheet.bookValueOfDebt /
      (1 + pretaxCostOfDebt) ** averageMaturityOfDebt;
  let estimatedValueOfStraightDebtInConvertibleDebt =
    (interestExpenseOnConvertibleDebt *
      (1 - (1 + pretaxCostOfDebt) ** -maturityOfConvertibleDebt)) /
      pretaxCostOfDebt +
    bookValueOfConvertibleDebt /
      (1 + pretaxCostOfDebt) ** maturityOfConvertibleDebt;

  estimatedValueOfStraightDebtInConvertibleDebt = isNaN(
    estimatedValueOfStraightDebtInConvertibleDebt
  )
    ? 0
    : estimatedValueOfStraightDebtInConvertibleDebt;

  const marketValue = {
    equity: price * sharesOutstanding,
    debt:
      estimatedMarketValueOfStraightDebt +
      estimatedValueOfStraightDebtInConvertibleDebt,
    preferredStock: numberOfPreferredShares * marketPricePerShare,
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
    (1 + (1 - marginalTaxRate) * (marketValue.debt / marketValue.equity));

  let costOfPreferredStock = annualDividendPerShare / marketPricePerShare;

  costOfPreferredStock = isNaN(costOfPreferredStock) ? 0 : costOfPreferredStock;

  const costOfComponent = {
    equity:
      riskFreeRate +
      leveredBetaForEquity * currentEquityRiskPremiumCountry.equityRiskPremium,
    debt: pretaxCostOfDebt * marginalTaxRate,
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
    leveredBetaForEquity: isNaN(leveredBetaForEquity)
      ? null
      : leveredBetaForEquity,
    totalCostOfCapital: isNaN(costOfComponent.total)
      ? null
      : costOfComponent.total,
  };
};

const selectCostOfCapital = createSelector(
  (state) => state.fundamentals.currentEquityRiskPremiumCountry,
  (state) => state.fundamentals.currentIndustry,
  selectRecentIncomeStatement,
  selectRecentBalanceSheet,
  selectPrice,
  (state) => state.fundamentals.data.SharesStats.SharesOutstanding,
  selectQueryParams,
  selectPretaxCostOfDebt,
  selectRiskFreeRate,
  calculateCostOfCapital
);

export default selectCostOfCapital;
