import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash-es";
import selectRecentIncomeStatement from "./selectRecentIncomeStatement";

const calculateInterestCoverage = ({ operatingIncome, interestExpense }) => {
  if (isNil(operatingIncome) || isNil(interestExpense)) return null;
  if (interestExpense === 0) return Infinity;
  if (operatingIncome < 0) return -Infinity;

  // Cap it to 0 otherwise the coverage will be wrong.
  const cappedInterestExpense = interestExpense < 0 ? 0 : interestExpense;

  return operatingIncome / cappedInterestExpense;
};

const selectInterestCoverage = createSelector(
  selectRecentIncomeStatement,
  calculateInterestCoverage,
);

export default selectInterestCoverage;
