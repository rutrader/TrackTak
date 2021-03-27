import { createSelector } from "@reduxjs/toolkit";
import getBalanceSheet from "../../shared/getBalanceSheet";
import selectConvertCurrency from "./selectConvertCurrency";
import dateSortComparer from "../../shared/dateSortComparer";
import selectYearlyIncomeStatements from "./selectYearlyIncomeStatements";

export const selectSortedYearlyBalanceSheets = createSelector(
  (state) => state.fundamentals.balanceSheet?.yearly ?? {},
  (yearlyBalanceSheets) =>
    Object.values(yearlyBalanceSheets).sort(dateSortComparer),
);

export const selectSortedQuarterlyBalanceSheets = createSelector(
  (state) => state.fundamentals.balanceSheet?.quarterly ?? {},
  (quarterlyBalanceSheets) =>
    Object.values(quarterlyBalanceSheets).sort(dateSortComparer),
);

const selectYearlyBalanceSheets = createSelector(
  selectConvertCurrency,
  selectSortedYearlyBalanceSheets,
  selectYearlyIncomeStatements,
  (convertCurrency, yearlyBalanceSheets, yearlyIncomeStatements) => {
    if (!yearlyBalanceSheets.length) return {};

    const newYearlyBalanceSheets = {};

    yearlyBalanceSheets.forEach((balanceSheet) => {
      const incomeStatement = yearlyIncomeStatements[balanceSheet.date];

      newYearlyBalanceSheets[balanceSheet.date] = getBalanceSheet(
        balanceSheet,
        convertCurrency,
        incomeStatement?.totalRevenue ?? 0,
        balanceSheet.date,
      );
    });

    return newYearlyBalanceSheets;
  },
);

export default selectYearlyBalanceSheets;
