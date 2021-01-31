import { createSelector } from "@reduxjs/toolkit";

export const cagrYearOneToFiveQueryName = "cagrYearOneToFive";
export const ebitTargetMarginInYearTenQueryName = "ebitTargetMarginInYearTen";
export const yearOfConvergenceQueryName = "yearOfConvergence";
export const salesToCapitalRatioQueryName = "salesToCapitalRatio";

export const inputQueries = [
  { name: cagrYearOneToFiveQueryName, type: "percent" },
  { name: ebitTargetMarginInYearTenQueryName, type: "percent" },
  { name: yearOfConvergenceQueryName, type: "year" },
  { name: salesToCapitalRatioQueryName, type: "number" },
  { name: "numberOfEmployeeOptionsOutstanding", type: "million" },
  { name: "averageStrikePrice", type: "currency" },
  { name: "averageMaturityOfOptions", type: "year" },
  { name: "averageMaturityOfDebt", type: "year" },
  { name: "pretaxCostOfDebt", type: "percent" },
  { name: "bookValueOfConvertibleDebt", type: "million-currency" },
  { name: "interestExpenseOnConvertibleDebt", type: "million-currency" },
  { name: "maturityOfConvertibleDebt", type: "year" },
  { name: "numberOfPreferredShares", type: "million" },
  { name: "marketPricePerShare", type: "currency" },
  { name: "annualDividendPerShare", type: "currency" },
  { name: "netOperatingLoss", type: "million-currency" },
  { name: "probabilityOfFailure", type: "percent" },
  { name: "proceedsAsAPercentageOfBookValue", type: "percent" },
];

const getInputQueryParams = (query) => {
  const inputQueryParams = {};

  inputQueries.forEach(({ name }) => {
    if (query[name]) {
      inputQueryParams[name] = parseFloat(query[name]);
    }
  });

  return inputQueryParams;
};

const selectQueryParams = createSelector(
  (state) => state.router.location.query,
  getInputQueryParams
);

export default selectQueryParams;
