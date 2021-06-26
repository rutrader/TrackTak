import {
  costOfComponentCalculation,
  marketValueCalculation,
  weightInCostOfCapitalCalculation,
} from "./templates/freeCashFlowFirmSimple/expressionCalculations";
import { queryNames } from "./templates/freeCashFlowFirmSimple/inputQueryNames";

// TODO: Remove most of this and share the remaining ones with
// queryNames file
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
  estimatedCostOfDebt: "percent",
  standardDeviationInStockPrices: "percent",
  capitalLeaseObligations: "million-currency",
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
  [queryNames.employeeOptionsOutstanding]: "number",
  [queryNames.averageStrikePrice]: "currency",
  [queryNames.averageMaturityOfOptions]: "year",
  [queryNames.averageMaturityOfDebt]: "year",
  [queryNames.pretaxCostOfDebt]: "percent",
  [queryNames.marketValueOfConvertibleBond]: "currency",
  [queryNames.bookValueOfConvertibleDebt]: "currency",
  [queryNames.interestExpenseOnConvertibleDebt]: "currency",
  [queryNames.maturityOfConvertibleDebt]: "year",
  [queryNames.numberOfPreferredShares]: "number",
  [queryNames.marketPricePerShare]: "currency",
  [queryNames.annualDividendPerShare]: "currency",
  [queryNames.netOperatingLoss]: "currency",
  [queryNames.nonOperatingAssets]: "currency",
  [queryNames.probabilityOfFailure]: "percent",
  [queryNames.proceedsAsAPercentageOfBookValue]: "percent",
};

export const allInputNameTypeMappings = {
  ...requiredInputNameTypeMapping,
  ...optionalInputNameTypeMapping,
};

export const incomeStatementTypeMappings = {
  revenue: "million-currency",
  operatingIncome: "million-currency",
};

export const balanceSheetTypeMappings = {
  investedCapital: "million-currency",
  bookValueOfDebt: "million-currency",
  cashAndShortTermInvestments: "million-currency",
  minorityInterest: "million-currency",
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
