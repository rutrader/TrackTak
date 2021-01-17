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
  ((${ebitTargetMarginInYearTen} - B4) /
    ${yearOfConvergence}) *
    (${yearOfConvergence} - ${column}1)`;

  return `=IF(${column}1 > ${yearOfConvergence}, ${ebitTargetMarginInYearTen}, ${falsyCondition})`;
};

export const getReinvestmentCalculation = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=(${column}3-${previousColumn}3)/${column}16`;
};

export const getRevenueCalculation = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}3*(1+${column}2)`;
};

export const getEBITCalculation = (cellKey) => {
  const column = cellKey.charAt(0);

  return `=${column}4*${column}3`;
};

export const getEBITAfterTax = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=IF(${column}5 > 0, IF(${column}5 < ${previousColumn}10, ${column}5, ${column}5 - (${column}5 - ${previousColumn}10) * ${column}6), ${column}5)`;
};

export const getFCFFCalculation = (cellKey) => {
  const column = cellKey.charAt(0);

  return `=${column}7 - ${column}8`;
};

export const getOneToFiveYrTaxCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}6`;
};

export const getSixToTenYrTaxCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}6+(M6-G6)/5`;
};

export const getOneToFiveYrRevenueGrowthCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}2`;
};

export const getSixToTenYrRevenueGrowthCalculation = (index) => {
  const formula = "=G2 - ((G2-M2) / 5)";
  const number = index + 1;

  return index === 0 ? formula : `${formula} * ${number}`;
};

export const getNOLCalculation = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=IF(${column}5 < 0, ${previousColumn}10 - ${column}5, IF(${previousColumn}10 > ${column}5, ${previousColumn}10 - ${column}5, 0))`;
};

export const getOneToFiveYrCostOfCapitalCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}12`;
};

export const getSixToTenYrCostOfCapitalCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}12-(G12-M12)/5`;
};

export const getCumulatedDiscountFactorCalculation = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=TRUNC(${previousColumn}13*(1/(1+${column}12)), ${cumulatedDiscountFactorFixedDecimalScale})`;
};

export const getPVToFCFFCalculation = (cellKey) => {
  const column = cellKey.charAt(0);

  return `=${column}9*${column}13`;
};

export const getSalesToCapitalRatioCalculation = (cellKey) => {
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}16`;
};

export const getInvestedCapitalCalculation = (cellKey) => {
  const column = cellKey.charAt(0);
  const previousColumn = getPreviousColumn(cellKey);

  return `=${previousColumn}17+${column}8`;
};

export const getROICCalculation = (cellKey) => {
  const column = cellKey.charAt(0);

  return `=${column}7/${column}17`;
};
