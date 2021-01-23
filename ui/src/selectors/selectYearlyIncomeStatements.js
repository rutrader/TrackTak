import { createSelector } from "@reduxjs/toolkit";
import getIncomeStatement from "../shared/getIncomeStatement";
import selectConvertCurrency from "./selectConvertCurrency";
import dateSortComparer from "../shared/dateSortComparer";

export const sortedQuarterlyIncomeStatements = createSelector(
  (state) =>
    state.fundamentals.data?.Financials.Income_Statement.quarterly ?? {},
  (quarterlyIncomeStatements) =>
    Object.values(quarterlyIncomeStatements).sort(dateSortComparer)
);

export const selectSortedYearlyIncomeStatements = createSelector(
  (state) => state.fundamentals.data?.Financials.Income_Statement.yearly ?? {},
  (yearlyIncomeStatements) =>
    Object.values(yearlyIncomeStatements).sort(dateSortComparer)
);

const selectYearlyIncomeStatements = createSelector(
  selectConvertCurrency,
  selectSortedYearlyIncomeStatements,
  (convertCurrency, yearlyIncomeStatements) => {
    if (!yearlyIncomeStatements.length) return null;

    const newYearlyIncomeStatements = {};

    yearlyIncomeStatements.forEach((incomeStatement) => {
      newYearlyIncomeStatements[incomeStatement.date] = getIncomeStatement(
        incomeStatement,
        convertCurrency,
        incomeStatement.date
      );
    });

    return newYearlyIncomeStatements;
  }
);

export default selectYearlyIncomeStatements;
