import {
  cagrYearOneToFiveQueryName,
  ebitTargetMarginInYearTenQueryName,
  yearOfConvergenceQueryName,
} from "../selectors/routerSelectors/selectQueryParams";

export const getPreviousColumn = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = String.fromCharCode(column.charCodeAt(0) - 1);

  return previousColumn;
};

export const getEBITMarginCalculation = (cellKey) => {
  const column = cellKey.charAt(0);

  const falsyCondition = `${ebitTargetMarginInYearTenQueryName} - ((${ebitTargetMarginInYearTenQueryName} - B3) / ${yearOfConvergenceQueryName}) * (${yearOfConvergenceQueryName} - ${column}1)`;

  return `=IF(${column}1 > ${yearOfConvergenceQueryName}, ${ebitTargetMarginInYearTenQueryName}, ${falsyCondition})`;
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
  getRevenueCalculation(cellKey, cagrYearOneToFiveQueryName);

export const getRevenueSixToTenYrCalculation = (index, cellKey) => {
  const formula = `${cagrYearOneToFiveQueryName} - ((${cagrYearOneToFiveQueryName}-riskFreeRate) / 5)`;
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
