import {
  costOfComponentCalculation,
  marketValueCalculation,
  weightInCostOfCapitalCalculation,
} from "./templates/freeCashFlowFirmSimple/expressionCalculations";
import { queryNames } from "./templates/freeCashFlowFirmSimple/inputQueryNames";

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
  [queryNames.cagrInYears_1_5]: "percent",
  [queryNames.ebitTargetMarginInYear_10]: "percent",
  [queryNames.yearOfConvergence]: "year",
  [queryNames.salesToCapitalRatio]: "number",
};

export const optionalInputNameTypeMapping = {
  [queryNames.employeeOptionsOutstanding]: "million",
  [queryNames.averageStrikePrice]: "currency",
  [queryNames.averageMaturityOfOptions]: "year",
  [queryNames.averageMaturityOfDebt]: "year",
  [queryNames.pretaxCostOfDebt]: "percent",
  [queryNames.bookValueOfConvertibleDebt]: "million-currency",
  [queryNames.interestExpenseOnConvertibleDebt]: "million-currency",
  [queryNames.maturityOfConvertibleDebt]: "year",
  [queryNames.numberOfPreferredShares]: "million",
  [queryNames.marketPricePerShare]: "currency",
  [queryNames.annualDividendPerShare]: "currency",
  [queryNames.netOperatingLoss]: "million-currency",
  [queryNames.nonOperatingAssets]: "million-currency",
  [queryNames.probabilityOfFailure]: "percent",
  [queryNames.proceedsAsAPercentageOfBookValue]: "percent",
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

export const marketValueNameTypeMapping = {};

Object.keys(marketValueCalculation).forEach((key) => {
  marketValueNameTypeMapping[key] = "million-currency";
});

export const weightInCostOfCapitalValueNameTypeMapping = {};

Object.keys(weightInCostOfCapitalCalculation).forEach((key) => {
  weightInCostOfCapitalValueNameTypeMapping[key] = "percent";
});

export const costOfComponentValueNameTypeMapping = {};

Object.keys(costOfComponentCalculation).forEach((key) => {
  costOfComponentValueNameTypeMapping[key] = "percent";
});

const scopeNameTypeMapping = {
  ...costOfCapitalNameTypeMapping,
  ...allInputNameTypeMappings,
  ...incomeStatementTypeMappings,
  ...balanceSheetTypeMappings,
  ...miscTypeMappings,
  ...marketValueNameTypeMapping,
  ...weightInCostOfCapitalValueNameTypeMapping,
  ...costOfComponentValueNameTypeMapping,
};

export default scopeNameTypeMapping;
