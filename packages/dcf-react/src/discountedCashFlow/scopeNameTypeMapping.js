import {
  costOfComponentCalculation,
  marketValueCalculation,
  weightInCostOfCapitalCalculation,
} from "./expressionCalculations";
import {
  cagrYearOneToFiveQueryName,
  ebitTargetMarginInYearTenQueryName,
  yearOfConvergenceQueryName,
  salesToCapitalRatioQueryName,
} from "../shared/inputQueryNames";

export const costOfCapitalNameTypeMapping = {
  marginalTaxRate: "percent",
  equityRiskPremium: "percent",
  governmentBondTenYearYield: "percent",
  adjDefaultSpread: "percent",
  riskFreeRate: "percent",
  interestSpread: "percent",
  bookValueOfDebt: "million-currency",
  interestExpense: "million-currency",
  price: "currency",
  sharesOutstanding: "million",
  costOfPreferredStock: "percent",
  pretaxCostOfDebt: "percent",
  unleveredBeta: "number",
  leveredBeta: "number",
  estimatedMarketValueOfStraightDebt: "million-currency",
  estimatedValueOfStraightDebtInConvertibleDebt: "million-currency",
};

export const requiredInputNameTypeMapping = {
  [cagrYearOneToFiveQueryName]: "percent",
  [ebitTargetMarginInYearTenQueryName]: "percent",
  [yearOfConvergenceQueryName]: "year",
  [salesToCapitalRatioQueryName]: "number",
};

export const optionalInputNameTypeMapping = {
  numberOfEmployeeOptionsOutstanding: "million",
  averageStrikePrice: "currency",
  averageMaturityOfOptions: "year",
  averageMaturityOfDebt: "year",
  pretaxCostOfDebt: "percent",
  bookValueOfConvertibleDebt: "million-currency",
  interestExpenseOnConvertibleDebt: "million-currency",
  maturityOfConvertibleDebt: "year",
  numberOfPreferredShares: "million",
  marketPricePerShare: "currency",
  annualDividendPerShare: "currency",
  netOperatingLoss: "million-currency",
  nonOperatingAssets: "million-currency",
  probabilityOfFailure: "percent",
  proceedsAsAPercentageOfBookValue: "percent",
};

export const allInputNameTypeMappings = {
  ...requiredInputNameTypeMapping,
  ...optionalInputNameTypeMapping,
};

export const incomeStatementTypeMappings = {
  totalRevenue: "million-currency",
  operatingIncome: "million-currency",
};

export const balanceSheetTypeMappings = {
  investedCapital: "million-currency",
  bookValueOfDebt: "million-currency",
  cashAndShortTermInvestments: "million-currency",
  minorityInterest: "million-currency",
  totalRevenue: "million-currency",
  bookValueOfEquity: "million-currency",
};

export const miscTypeMappings = {
  matureMarketEquityRiskPremium: "percent",
  pastThreeYearsAverageEffectiveTaxRate: "percent",
  sharesOutstanding: "million",
  price: "currency",
  riskFreeRate: "percent",
  valueOfAllOptionsOutstanding: "million-currency",
};

const scopeNameTypeMapping = {
  ...costOfCapitalNameTypeMapping,
  ...allInputNameTypeMappings,
  ...incomeStatementTypeMappings,
  ...balanceSheetTypeMappings,
  ...miscTypeMappings,
};

Object.keys(marketValueCalculation).forEach((key) => {
  scopeNameTypeMapping[key] = "million-currency";
});

Object.keys(weightInCostOfCapitalCalculation).forEach((key) => {
  scopeNameTypeMapping[key] = "percent";
});

Object.keys(costOfComponentCalculation).forEach((key) => {
  scopeNameTypeMapping[key] = "percent";
});

export default scopeNameTypeMapping;
