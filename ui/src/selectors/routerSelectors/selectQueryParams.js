import { createSelector } from "@reduxjs/toolkit";

export const inputQueryNames = [
  "cagrYearOneToFive",
  "ebitTargetMarginInYearTen",
  "yearOfConvergence",
  "salesToCapitalRatio",
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
