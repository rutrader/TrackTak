import { createSelector } from "@reduxjs/toolkit";
import selectIsLargeCompany from "./selectIsLargeCompany";
import selectInterestCoverage from "./selectInterestCoverage";

const calculateInterestSpread = (
  companiesInterestSpreads,
  isLargeCompany,
  interestCoverage
) => {
  const findCurrentSpread = (spreads, key) => {
    return spreads.find((spread) => {
      const parsedFrom = parseFloat(spread[key].from);
      const parsedTo = parseFloat(spread[key].to);

      return interestCoverage >= parsedFrom && interestCoverage <= parsedTo;
    });
  };

  return isLargeCompany
    ? findCurrentSpread(companiesInterestSpreads, "large")
    : findCurrentSpread(companiesInterestSpreads, "small");
};

const selectInterestSpread = createSelector(
  (state) => state.fundamentals.companiesInterestSpreads,
  selectIsLargeCompany,
  selectInterestCoverage,
  calculateInterestSpread
);

export default selectInterestSpread;
