import { createSelector } from "@reduxjs/toolkit";

export const cagrYearOneToFiveQueryName = "cagrYearOneToFive";
export const ebitTargetMarginInYearTenQueryName = "ebitTargetMarginInYearTen";
export const yearOfConvergenceQueryName = "yearOfConvergence";
export const salesToCapitalRatioQueryName = "salesToCapitalRatio";

export const inputQueryNames = [
  cagrYearOneToFiveQueryName,
  ebitTargetMarginInYearTenQueryName,
  yearOfConvergenceQueryName,
  salesToCapitalRatioQueryName,
  "numberOfOptionsOutstanding",
  "averageStrikePrice",
  "averageMaturityOfOptions",
  "averageMaturityOfDebt",
  "pretaxCostOfDebt",
  "bookValueOfConvertibleDebt",
  "interestExpenseOnConvertibleDebt",
  "maturityOfConvertibleDebt",
  "numberOfPreferredShares",
  "marketPricePerShare",
  "annualDividendPerShare",
];

const getInputQueryParams = (query) => {
  const inputQueryParams = {};

  inputQueryNames.forEach((inputQueryName) => {
    if (query[inputQueryName]) {
      inputQueryParams[inputQueryName] = parseFloat(query[inputQueryName]);
    }
  });

  return inputQueryParams;
};

const selectQueryParams = createSelector(
  (state) => state.router.location.query,
  getInputQueryParams
);

export default selectQueryParams;
