import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import selectPretaxCostOfDebt from "./selectPretaxCostOfDebt";
import selectRecentIncomeStatement from "./selectRecentIncomeStatement";
import selectRecentBalanceSheet from "./selectRecentBalanceSheet";
import selectPrice from "./selectPrice";
import selectCurrentIndustry from "./selectCurrentIndustry";
import selectCurrentEquityRiskPremium from "./selectCurrentEquityRiskPremium";
import selectSharesOutstanding from "./selectSharesOutstanding";

const calculateCostOfCapital = (queryParams) => (
  currentEquityRiskPremiumCountry,
  currentIndustry,
  incomeStatement,
  balanceSheet,
  price,
  sharesOutstanding,
  pretaxCostOfDebt,
  riskFreeRate,
) => {
  // TODO: Maybe calculate averageMaturityOfDebt automatically based on the average
  const averageMaturityOfDebt = queryParams.averageMaturityOfDebt;
  const maturityOfConvertibleDebt = queryParams.maturityOfConvertibleDebt;
  const interestExpenseOnConvertibleDebt =
    queryParams.interestExpenseOnConvertibleDebt;
  const bookValueOfConvertibleDebt = queryParams.bookValueOfConvertibleDebt;
  const numberOfPreferredShares = queryParams.numberOfPreferredShares;
  const marketPricePerShare = queryParams.marketPricePerShare;
  const annualDividendPerShare = queryParams.annualDividendPerShare;
  const marginalTaxRate = currentEquityRiskPremiumCountry.marginalTaxRate;

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

  estimatedValueOfStraightDebtInConvertibleDebt = isFinite(
    estimatedValueOfStraightDebtInConvertibleDebt,
  )
    ? estimatedValueOfStraightDebtInConvertibleDebt
    : 0;

  const marketValue = {
    equityMarketValue: price * sharesOutstanding,
    debtMarketValue:
      estimatedMarketValueOfStraightDebt +
      estimatedValueOfStraightDebtInConvertibleDebt,
    preferredStockMarketValue: numberOfPreferredShares * marketPricePerShare,
    get totalMarketValue() {
      return (
        this.equityMarketValue +
        this.debtMarketValue +
        this.preferredStockMarketValue
      );
    },
  };

  const weightInCostOfCapital = {
    equityWeight: marketValue.equityMarketValue / marketValue.totalMarketValue,
    debtWeight: marketValue.debtMarketValue / marketValue.totalMarketValue,
    preferredStockWeight:
      marketValue.preferredStockMarketValue / marketValue.totalMarketValue,
    get totalWeight() {
      return this.equityWeight + this.debtWeight + this.preferredStockWeight;
    },
  };

  const leveredBeta =
    currentIndustry.unleveredBeta *
    (1 +
      (1 - marginalTaxRate) *
        (marketValue.debtMarketValue / marketValue.equityMarketValue));

  let costOfPreferredStock = annualDividendPerShare / marketPricePerShare;

  costOfPreferredStock = isFinite(costOfPreferredStock)
    ? costOfPreferredStock
    : 0;

  const costOfComponent = {
    equityCostOfCapital:
      riskFreeRate +
      leveredBeta * currentEquityRiskPremiumCountry.equityRiskPremium,
    debtCostOfCapital: pretaxCostOfDebt * marginalTaxRate,
    preferredStockCostOfCapital: costOfPreferredStock,
    get totalCostOfCapital() {
      return (
        weightInCostOfCapital.equityWeight * this.equityCostOfCapital +
        weightInCostOfCapital.debtWeight * this.debtCostOfCapital +
        weightInCostOfCapital.preferredStockWeight *
          this.preferredStockCostOfCapital
      );
    },
  };

  return {
    leveredBeta,
    totalCostOfCapital: costOfComponent.totalCostOfCapital,
  };
};

const selectCostOfCapital = (inputQueryParams) =>
  createSelector(
    selectCurrentEquityRiskPremium,
    selectCurrentIndustry,
    selectRecentIncomeStatement,
    selectRecentBalanceSheet,
    selectPrice,
    selectSharesOutstanding,
    selectPretaxCostOfDebt(inputQueryParams),
    selectRiskFreeRate,
    calculateCostOfCapital(inputQueryParams),
  );

export default selectCostOfCapital;
