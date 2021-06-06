import { requiredInputsSheetName } from "./getRequiredInputs";

const cagrInYears_1_5QueryNameTT = `'${requiredInputsSheetName}'!$B$1`;
const ebitTargetMarginInYear_10QueryNameTT = `'${requiredInputsSheetName}'!$B$2`;
const yearOfConvergenceQueryNameTT = `'${requiredInputsSheetName}'!$B$3`;

export const getPreviousColumn = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = String.fromCharCode(column.charCodeAt(0) - 1);

  return previousColumn;
};

export const getEBITMarginCalculation = (cellKey) => {
  const column = cellKey.charAt(0);

  const falsyCondition = `${ebitTargetMarginInYear_10QueryNameTT} - ((${ebitTargetMarginInYear_10QueryNameTT} - B3) / ${yearOfConvergenceQueryNameTT}) * (${yearOfConvergenceQueryNameTT} - ${column}1)`;

  return `=IF(${column}1 > ${yearOfConvergenceQueryNameTT}, ${ebitTargetMarginInYear_10QueryNameTT}, ${falsyCondition})`;
};

export const getReinvestmentCalculation = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=(${column}2-${previousColumn}2)/${column}15`;
};

export const getRevenueCalculation = (cellKey, growthRate) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}2*(1+${growthRate})`;
};

export const getRevenueOneToFiveYrCalculation = (cellKey) =>
  getRevenueCalculation(cellKey, cagrInYears_1_5QueryNameTT);

export const getRevenueSixToTenYrCalculation = (index, cellKey) => {
  const formula = `${cagrInYears_1_5QueryNameTT} - ((${cagrInYears_1_5QueryNameTT}-riskFreeRate) / 5)`;
  const number = index + 1;
  const growthRevenueFormula = index === 0 ? formula : `${formula} * ${number}`;

  return getRevenueCalculation(cellKey, growthRevenueFormula);
};

export const getEBITCalculation = (cellKey) => {
  const column = cellKey.charAt(0);

  return `=${column}3*${column}2`;
};

export const getEBITAfterTax = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=IF(${column}4 > 0, IF(${column}4 < ${previousColumn}9, ${column}4, ${column}4 - (${column}4 - ${previousColumn}9) * ${column}5), ${column}4)`;
};

export const getFCFFCalculation = (cellKey) => {
  const column = cellKey.charAt(0);

  return `=${column}6 - ${column}7`;
};

export const getOneToFiveYrTaxCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}5`;
};

export const getSixToTenYrTaxCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}5+(M5-G5)/5`;
};

export const getNOLCalculation = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=IF(${column}4 < 0, ${previousColumn}9 - ${column}4, IF(${previousColumn}9 > ${column}4, ${previousColumn}9 - ${column}4, 0))`;
};

export const getOneToFiveYrCostOfCapitalCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}11`;
};

export const getSixToTenYrCostOfCapitalCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}11-(G11-M11)/5`;
};

export const getCumulatedDiscountFactorCalculation = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}12*(1/(1+${column}11))`;
};

export const getPVToFCFFCalculation = (cellKey) => {
  const column = cellKey.charAt(0);

  return `=${column}8*${column}12`;
};

export const getSalesToCapitalRatioCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}15`;
};

export const getInvestedCapitalCalculation = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}16+${column}7`;
};

export const getROICCalculation = (cellKey) => {
  const column = cellKey.charAt(0);

  return `=${column}6/${column}16`;
};

export const debtCalculation = {
  riskFreeRate: "=governmentBondTenYearYield - adjDefaultSpread",
  estimatedCostOfDebt: "=riskFreeRate + interestSpread + adjDefaultSpread",
  estimatedMarketValueOfStraightDebt:
    "=(interestExpense * (1 - (1 + pretaxCostOfDebt) ^ -averageMaturityOfDebt)) / pretaxCostOfDebt + bookValueOfDebt / (1 + pretaxCostOfDebt) ^ averageMaturityOfDebt",
  estimatedValueOfStraightDebtInConvertibleDebt:
    "=(interestExpenseOnConvertibleDebt * (1 - (1 + pretaxCostOfDebt) ^ -maturityOfConvertibleDebt)) / pretaxCostOfDebt + bookValueOfConvertibleDebt / (1 + pretaxCostOfDebt) ^ maturityOfConvertibleDebt",
  leveredBeta:
    "=unleveredBeta * (1 + (1 - marginalTaxRate) * (debtMarketValue / equityMarketValue))",
  costOfPreferredStock:
    "=IFERROR(annualDividendPerShare / marketPricePerShare, 0)",
};

export const marketValueCalculation = {
  equityMarketValue: "=price * sharesOutstanding",
  debtMarketValue:
    "=estimatedMarketValueOfStraightDebt + estimatedValueOfStraightDebtInConvertibleDebt",
  preferredStockMarketValue: "=numberOfPreferredShares * marketPricePerShare",
  totalMarketValue:
    "=equityMarketValue + debtMarketValue + preferredStockMarketValue",
};

export const weightInCostOfCapitalCalculation = {
  equityWeight: "=equityMarketValue / totalMarketValue",
  debtWeight: "=debtMarketValue / totalMarketValue",
  preferredStockWeight: "=preferredStockMarketValue / totalMarketValue",
  totalWeight: "=equityWeight + debtWeight + preferredStockWeight",
};

export const costOfComponentCalculation = {
  equityCostOfCapital: "=riskFreeRate + leveredBeta * equityRiskPremium",
  debtCostOfCapital: "=pretaxCostOfDebt * marginalTaxRate",
  preferredStockCostOfCapital: "=costOfPreferredStock",
  totalCostOfCapital:
    "=equityWeight * equityCostOfCapital + debtWeight * debtCostOfCapital + preferredStockWeight * preferredStockCostOfCapital",
};
