import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash";
import selectRecentIncomeStatement from "./selectRecentIncomeStatement";

const calculateInterestCoverage = ({ operatingIncome, interestExpense }) => {
  if (isNil(operatingIncome) || isNil(interestExpense)) return null;
  if (interestExpense === 0) return Infinity;
  if (operatingIncome < 0) return -Infinity;

  return operatingIncome / interestExpense;
};

const selectInterestCoverage = createSelector(
  selectRecentIncomeStatement,
  calculateInterestCoverage,
);

export default selectInterestCoverage;
