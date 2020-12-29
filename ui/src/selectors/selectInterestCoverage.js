import { createSelector } from "@reduxjs/toolkit";

const calculateInterestCoverage = (operatingIncome, interestExpense) => {
  if (operatingIncome === undefined || interestExpense === undefined)
    return null;
  if (interestExpense === 0) return Infinity;
  if (operatingIncome < 0) return -Infinity;

  return operatingIncome / interestExpense;
};

const selectInterestCoverage = createSelector(
  (state) => state.fundamentals.incomeStatement.operatingIncome,
  (state) => state.fundamentals.incomeStatement.interestExpense,
  calculateInterestCoverage
);

export default selectInterestCoverage;
