import { createSelector } from "@reduxjs/toolkit";
import getBalanceSheet from "../../shared/getBalanceSheet";
import selectConvertCurrency from "./selectConvertCurrency";
import dateSortComparer from "../../shared/dateSortComparer";
import selectIncomeStatements, {
  selectTTMIncomeStatement,
} from "./selectIncomeStatements";
import selectIsInUS from "./selectIsInUS";
import selectMostRecentQuarter from "./selectMostRecentQuarter";

export const selectSortedYearlyBalanceSheets = createSelector(
  (state) => state.stock.fundamentals?.balanceSheet?.yearly ?? {},
  (yearlyBalanceSheets) =>
    Object.values(yearlyBalanceSheets).sort(dateSortComparer),
);

export const selectSortedQuarterlyBalanceSheets = createSelector(
  (state) => state.stock.fundamentals?.balanceSheet?.quarterly ?? {},
  (quarterlyBalanceSheets) =>
    Object.values(quarterlyBalanceSheets).sort(dateSortComparer),
);

export const selectTTMBalanceSheet = createSelector(
  selectMostRecentQuarter,
  selectConvertCurrency,
  selectIsInUS,
  selectSortedQuarterlyBalanceSheets,
  selectSortedYearlyBalanceSheets,
  selectTTMIncomeStatement,
  (
    mostRecentQuarter,
    convertCurrency,
    isInUS,
    quarterlyBalanceSheets,
    yearlyBalanceSheets,
    ttmIncomeStatement,
  ) => {
    if (!yearlyBalanceSheets.length) return {};

    const balanceSheet = isInUS
      ? quarterlyBalanceSheets[0]
      : yearlyBalanceSheets[0];

    return getBalanceSheet(
      balanceSheet,
      convertCurrency,
      ttmIncomeStatement.revenue,
      mostRecentQuarter,
    );
  },
);

const selectBalanceSheets = createSelector(
  selectConvertCurrency,
  selectTTMBalanceSheet,
  selectSortedYearlyBalanceSheets,
  selectIncomeStatements,
  (convertCurrency, ttm, yearlyBalanceSheets, incomeStatements) => {
    if (!yearlyBalanceSheets.length)
      return {
        ttm: {},
        yearly: {},
      };

    const yearly = {};

    yearlyBalanceSheets.forEach((balanceSheet) => {
      const incomeStatement = incomeStatements.yearly[balanceSheet.date];

      yearly[balanceSheet.date] = getBalanceSheet(
        balanceSheet,
        convertCurrency,
        incomeStatement?.revenue ?? 0,
        balanceSheet.date,
      );
    });

    return {
      ttm,
      yearly,
    };
  },
);

export default selectBalanceSheets;
