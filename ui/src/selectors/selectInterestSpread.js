import { createSelector } from "@reduxjs/toolkit";
import smallCompaniesInterestSpreads from "../data/smallCompaniesInterestSpreads.json";
import largeCompaniesInterestSpreads from "../data/largeCompaniesInterestSpreads.json";
import selectIsLargeCompany from "./selectIsLargeCompany";
import selectInterestCoverage from "./selectInterestCoverage";

const calculateInterestSpread = (isLargeCompany, interestCoverage) => {
  const findCurrentSpread = (spreads) => {
    return spreads.find((spread) => {
      const parsedFrom = parseFloat(spread.from);
      const parsedTo = parseFloat(spread.to);

      return interestCoverage >= parsedFrom && interestCoverage <= parsedTo;
    });
  };

  return isLargeCompany
    ? findCurrentSpread(largeCompaniesInterestSpreads)
    : findCurrentSpread(smallCompaniesInterestSpreads);
};

const selectInterestSpread = createSelector(
  selectIsLargeCompany,
  selectInterestCoverage,
  calculateInterestSpread
);

export default selectInterestSpread;
