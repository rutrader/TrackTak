import { createSelector } from "@reduxjs/toolkit";
import getIncomeStatement from "../../shared/getIncomeStatement";
import selectConvertCurrency from "./selectConvertCurrency";
import dateSortComparer from "../../shared/dateSortComparer";

export const selectSortedYearlyIncomeStatements = createSelector(
  (state) => state.fundamentals.incomeStatement?.yearly ?? {},
  (yearlyIncomeStatements) =>
    Object.values(yearlyIncomeStatements).sort(dateSortComparer),
);

export const selectSortedQuarterlyIncomeStatements = createSelector(
  (state) => state.fundamentals.incomeStatement?.quarterly ?? {},
  (quarterlyIncomeStatements) =>
    Object.values(quarterlyIncomeStatements).sort(dateSortComparer),
);

const selectYearlyIncomeStatements = createSelector(
  selectConvertCurrency,
  selectSortedYearlyIncomeStatements,
  (convertCurrency, yearlyIncomeStatements) => {
    if (!yearlyIncomeStatements.length) return {};

    const newYearlyIncomeStatements = {};

    yearlyIncomeStatements.forEach((incomeStatement) => {
      newYearlyIncomeStatements[
        incomeStatement.date
      ] = getIncomeStatement(incomeStatement, convertCurrency, [
        incomeStatement.date,
      ]);
    });

    return newYearlyIncomeStatements;
  },
);

export default selectYearlyIncomeStatements;
