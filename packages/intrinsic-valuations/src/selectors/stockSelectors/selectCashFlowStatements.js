import { createSelector } from "@reduxjs/toolkit";
import getCashFlowStatement from "../../shared/getCashFlowStatement";
import selectConvertCurrency from "./selectConvertCurrency";
import dateSortComparer from "../../shared/dateSortComparer";
import selectIsInUS from "./selectIsInUS";
import getUSFinancialData from "../../shared/getUSFinancialData";
import getNonUSFinancialData from "../../shared/getNonUSFinancialData";

export const selectSortedYearlyCashFlowStatements = createSelector(
  (state) => state.stock.fundamentals?.cashFlowStatement?.yearly ?? {},
  (yearlyCashFlowStatements) =>
    Object.values(yearlyCashFlowStatements).sort(dateSortComparer),
);

export const selectSortedQuarterlyCashFlowStatements = createSelector(
  (state) => state.stock.fundamentals?.cashFlowStatement?.quarterly ?? {},
  (quarterlyCashFlowStatements) =>
    Object.values(quarterlyCashFlowStatements).sort(dateSortComparer),
);

export const selectTTMCashFlowStatement = createSelector(
  selectConvertCurrency,
  selectIsInUS,
  selectSortedQuarterlyCashFlowStatements,
  selectSortedYearlyCashFlowStatements,
  (
    convertCurrency,
    isInUS,
    quarterlyCashFlowStatements,
    yearlyCashFlowStatements,
  ) => {
    if (!yearlyCashFlowStatements.length) return {};

    const cashFlowStatement = isInUS
      ? getUSFinancialData(
          getCashFlowStatement,
          quarterlyCashFlowStatements,
          convertCurrency,
        )
      : getNonUSFinancialData(
          getCashFlowStatement,
          yearlyCashFlowStatements,
          convertCurrency,
        );

    return cashFlowStatement;
  },
);

const selectCashFlowStatements = createSelector(
  selectConvertCurrency,
  selectTTMCashFlowStatement,
  selectSortedYearlyCashFlowStatements,
  (convertCurrency, ttm, yearlyCashFlowStatements) => {
    if (!yearlyCashFlowStatements.length)
      return {
        ttm: {},
        yearly: {},
      };

    const yearly = {};

    yearlyCashFlowStatements.forEach((cashFlowStatement) => {
      yearly[cashFlowStatement.date] = getCashFlowStatement(
        cashFlowStatement,
        convertCurrency,
        cashFlowStatement.date,
      );
    });

    return {
      ttm,
      yearly,
    };
  },
);

export default selectCashFlowStatements;
