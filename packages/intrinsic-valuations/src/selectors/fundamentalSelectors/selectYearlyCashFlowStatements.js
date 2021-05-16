import { createSelector } from "@reduxjs/toolkit";
import getCashFlowStatement from "../../shared/getCashFlowStatement";
import selectConvertCurrency from "./selectConvertCurrency";
import dateSortComparer from "../../shared/dateSortComparer";

export const selectSortedYearlyCashFlowStatements = createSelector(
  (state) => state.fundamentals.cashFlowStatement?.yearly ?? {},
  (yearlyCashFlowStatements) =>
    Object.values(yearlyCashFlowStatements).sort(dateSortComparer),
);

export const selectSortedQuarterlCashFlowStatements = createSelector(
  (state) => state.fundamentals.cashFlowStatement?.quarterly ?? {},
  (quarterlyCashFlowStatements) =>
    Object.values(quarterlyCashFlowStatements).sort(dateSortComparer),
);

const selectYearlyBalanceSheets = createSelector(
  selectConvertCurrency,
  selectSortedYearlyCashFlowStatements,
  (convertCurrency, yearlyCashFlowStatements) => {
    if (!yearlyCashFlowStatements.length) return {};

    const newYearlyCashFlowStatements = {};

    yearlyCashFlowStatements.forEach((cashFlowStatement) => {
      newYearlyCashFlowStatements[
        cashFlowStatement.date
      ] = getCashFlowStatement(
        cashFlowStatement,
        convertCurrency,
        cashFlowStatement.date,
      );
    });

    return newYearlyCashFlowStatements;
  },
);

export default selectYearlyBalanceSheets;
