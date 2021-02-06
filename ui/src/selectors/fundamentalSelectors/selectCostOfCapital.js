import { createSelector } from "@reduxjs/toolkit";
import selectRiskFreeRate from "./selectRiskFreeRate";
import selectQueryParams from "../routerSelectors/selectQueryParams";
import selectPretaxCostOfDebt from "./selectPretaxCostOfDebt";
import selectRecentIncomeStatement from "./selectRecentIncomeStatement";
import selectRecentBalanceSheet from "./selectRecentBalanceSheet";
import selectPrice from "./selectPrice";
import selectCurrentIndustry from "./selectCurrentIndustry";
import selectCurrentEquityRiskPremium from "./selectCurrentEquityRiskPremium";
import selectSharesStats from "./selectSharesStats";
import { evaluate } from "../../shared/math";
import {
  costOfComponentCalculation,
  estimatedMarketValueOfStraightDebtCalculation,
  estimatedValueOfStraightDebtInConvertibleDebtCalculation,
  leveredBetaCalculation,
  marketValueCalculation,
  weightInCostOfCapitalCalculation,
  costOfPreferredStockCalculation,
} from "../../discountedCashFlow/expressionCalculations";

const calculateCostOfCapital = (
  currentEquityRiskPremiumCountry,
  currentIndustry,
  incomeStatement,
  balanceSheet,
  price,
  sharesStats,
  query,
  pretaxCostOfDebt,
  riskFreeRate
) => {
  // TODO: Maybe calculate averageMaturityOfDebt automatically based on the average
  const averageMaturityOfDebt = query.averageMaturityOfDebt;
  const maturityOfConvertibleDebt = query.maturityOfConvertibleDebt;
  const interestExpenseOnConvertibleDebt =
    query.interestExpenseOnConvertibleDebt;
  const bookValueOfConvertibleDebt = query.bookValueOfConvertibleDebt;
  const numberOfPreferredShares = query.numberOfPreferredShares;
  const marketPricePerShare = query.marketPricePerShare;
  const annualDividendPerShare = query.annualDividendPerShare;
  const marginalTaxRate = currentEquityRiskPremiumCountry.marginalTaxRate;
  const estimatedMarketValueOfStraightDebt = evaluate(
    estimatedMarketValueOfStraightDebtCalculation,
    {
      interestExpense: incomeStatement.interestExpense,
      pretaxCostOfDebt,
      averageMaturityOfDebt,
      bookValueOfDebt: balanceSheet.bookValueOfDebt,
    }
  );

  let estimatedValueOfStraightDebtInConvertibleDebt = evaluate(
    estimatedValueOfStraightDebtInConvertibleDebtCalculation,
    {
      interestExpenseOnConvertibleDebt,
      pretaxCostOfDebt,
      maturityOfConvertibleDebt,
      bookValueOfConvertibleDebt,
    }
  );

  estimatedValueOfStraightDebtInConvertibleDebt = isNaN(
    estimatedValueOfStraightDebtInConvertibleDebt
  )
    ? 0
    : estimatedValueOfStraightDebtInConvertibleDebt;

  const marketValue = {};

  Object.keys(marketValueCalculation).forEach((key) => {
    const value = marketValueCalculation[key];
    const { totalMarketValue, ...restMarket } = marketValue;

    marketValue[key] = evaluate(value, {
      price,
      sharesOutstanding: sharesStats.SharesOutstanding,
      estimatedMarketValueOfStraightDebt,
      estimatedValueOfStraightDebtInConvertibleDebt,
      numberOfPreferredShares,
      marketPricePerShare,
      equityMarketValue: marketValue.equityMarketValue,
      debtMarketValue: marketValue.debtMarketValue,
      preferredStockMarketValue: marketValue.preferredStockMarketValue,
      ...restMarket,
    });
  });

  const weightInCostOfCapital = {};

  Object.keys(weightInCostOfCapitalCalculation).forEach((key) => {
    const value = weightInCostOfCapitalCalculation[key];
    const { totalWeight, ...restWeight } = weightInCostOfCapital;

    weightInCostOfCapital[key] = evaluate(value, {
      equityMarketValue: marketValue.equityMarketValue,
      debtMarketValue: marketValue.debtMarketValue,
      preferredStockMarketValue: marketValue.preferredStockMarketValue,
      totalMarketValue: marketValue.totalMarketValue,
      ...restWeight,
    });
  });

  const leveredBeta = evaluate(leveredBetaCalculation, {
    unleveredBeta: currentIndustry.unleveredBeta,
    marginalTaxRate,
    debtMarketValue: marketValue.debtMarketValue,
    equityMarketValue: marketValue.equityMarketValue,
  });

  let costOfPreferredStock =
    evaluate(costOfPreferredStockCalculation, {
      annualDividendPerShare,
      marketPricePerShare,
    }) ?? 0;

  const costOfComponent = {};

  Object.keys(costOfComponentCalculation).forEach((key) => {
    const value = costOfComponentCalculation[key];
    const { totalWeight, ...restWeight } = weightInCostOfCapital;
    const { totalCostOfCapital, ...restCost } = costOfComponent;

    costOfComponent[key] = evaluate(value, {
      riskFreeRate,
      leveredBeta,
      equityRiskPremium: currentEquityRiskPremiumCountry.equityRiskPremium,
      pretaxCostOfDebt,
      marginalTaxRate,
      costOfPreferredStock,
      ...restWeight,
      ...restCost,
    });
  });

  return {
    leveredBeta,
    totalCostOfCapital: costOfComponent.totalCostOfCapital,
  };
};

const selectCostOfCapital = createSelector(
  selectCurrentEquityRiskPremium,
  selectCurrentIndustry,
  selectRecentIncomeStatement,
  selectRecentBalanceSheet,
  selectPrice,
  selectSharesStats,
  selectQueryParams,
  selectPretaxCostOfDebt,
  selectRiskFreeRate,
  calculateCostOfCapital
);

export default selectCostOfCapital;
