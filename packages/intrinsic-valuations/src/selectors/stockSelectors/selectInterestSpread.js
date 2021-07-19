import { createSelector } from "@reduxjs/toolkit";
import selectIsLargeCompany from "./selectIsLargeCompany";
import selectInterestCoverage from "./selectInterestCoverage";
import companiesInterestSpreads from "../../shared/companiesInterestSpreads";

const calculateInterestSpread = (isLargeCompany, interestCoverage) => {
  const findCurrentSpread = (key) => {
    return companiesInterestSpreads.find((spread) => {
      const parsedFrom = parseFloat(spread[key].from);
      const parsedTo = parseFloat(spread[key].to);

      return interestCoverage >= parsedFrom && interestCoverage <= parsedTo;
    });
  };

  return isLargeCompany
    ? findCurrentSpread("large")
    : findCurrentSpread("small");
};

const selectInterestSpread = createSelector(
  selectIsLargeCompany,
  selectInterestCoverage,
  calculateInterestSpread,
);

export default selectInterestSpread;
