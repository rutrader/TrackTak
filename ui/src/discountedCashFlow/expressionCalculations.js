export const cumulatedDiscountFactorFixedDecimalScale = 4;

export const getPreviousColumn = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = String.fromCharCode(column.charCodeAt(0) - 1);

  return previousColumn;
};

export const getEBITMarginCalculation = (
  yearOfConvergence,
  ebitTargetMarginInYearTen,
  cellKey
) => {
  const column = cellKey.charAt(0);
  const falsyCondition = `${ebitTargetMarginInYearTen} -
  ((${ebitTargetMarginInYearTen} - B3) /
    ${yearOfConvergence}) *
    (${yearOfConvergence} - ${column}1)`;

  return `=IF(${column}1 > ${yearOfConvergence}, ${ebitTargetMarginInYearTen}, ${falsyCondition})`;
};

export const getReinvestmentCalculation = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=(${column}2-${previousColumn}2)/${column}15`;
};

export const getRevenueCalculation = (growthRate, cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}2*(1+${growthRate})`;
};

export const getRevenueOneToFiveYrCalculation = getRevenueCalculation;

export const getRevenueSixToTenYrCalculation = (
  growthRate,
  riskFreeRate,
  index,
  cellKey
) => {
  const formula = `${growthRate} - ((${growthRate}-${riskFreeRate}) / 5)`;
  const number = index + 1;
  const growthRevenueFormula = index === 0 ? formula : `${formula} * ${number}`;

  return getRevenueCalculation(growthRevenueFormula, cellKey);
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

  return `=TRUNC(${previousColumn}12*(1/(1+${column}11)), ${cumulatedDiscountFactorFixedDecimalScale})`;
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
