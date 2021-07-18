import { createSelector } from "@reduxjs/toolkit";
import getIncomeStatement from "../../shared/getIncomeStatement";
import selectConvertCurrency from "./selectConvertCurrency";
import dateSortComparer from "../../shared/dateSortComparer";
import selectIsInUS from "./selectIsInUS";
import getUSFinancialData from "../../shared/getUSFinancialData";
import getNonUSFinancialData from "../../shared/getNonUSFinancialData";

export const selectSortedYearlyIncomeStatements = createSelector(
  (state) => state.stock.fundamentals?.incomeStatement?.yearly ?? {},
  (yearlyIncomeStatements) =>
    Object.values(yearlyIncomeStatements).sort(dateSortComparer),
);

export const selectSortedQuarterlyIncomeStatements = createSelector(
  (state) => state.stock.fundamentals?.incomeStatement?.quarterly ?? {},
  (quarterlyIncomeStatements) =>
    Object.values(quarterlyIncomeStatements).sort(dateSortComparer),
);

export const selectTTMIncomeStatement = createSelector(
  selectConvertCurrency,
  selectIsInUS,
  selectSortedQuarterlyIncomeStatements,
  selectSortedYearlyIncomeStatements,
  (
    convertCurrency,
    isInUS,
    quarterlyIncomeStatements,
    yearlyIncomeStatements,
  ) => {
    if (!yearlyIncomeStatements.length) return {};

    const incomeStatement = isInUS
      ? getUSFinancialData(
          getIncomeStatement,
          quarterlyIncomeStatements,
          convertCurrency,
        )
      : getNonUSFinancialData(
          getIncomeStatement,
          yearlyIncomeStatements,
          convertCurrency,
        );

    return incomeStatement;
  },
);

const selectIncomeStatements = createSelector(
  selectConvertCurrency,
  selectTTMIncomeStatement,
  selectSortedYearlyIncomeStatements,
  (convertCurrency, ttm, yearlyIncomeStatements) => {
    if (!yearlyIncomeStatements.length)
      return {
        ttm: {},
        yearly: {},
      };

    const yearly = {};

    yearlyIncomeStatements.forEach((incomeStatement) => {
      yearly[incomeStatement.date] = getIncomeStatement(
        incomeStatement,
        convertCurrency,
        [incomeStatement.date],
      );
    });

    return {
      ttm,
      yearly,
    };
  },
);

export default selectIncomeStatements;
