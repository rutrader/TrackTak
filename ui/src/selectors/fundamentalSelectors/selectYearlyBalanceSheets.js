import { createSelector } from "@reduxjs/toolkit";
import getBalanceSheet from "../../shared/getBalanceSheet";
import selectConvertCurrency from "./selectConvertCurrency";
import dateSortComparer from "../../shared/dateSortComparer";
import selectYearlyIncomeStatements from "./selectYearlyIncomeStatements";

export const selectSortedYearlyBalanceSheets = createSelector(
  (state) => state.fundamentals.data?.Financials.Balance_Sheet.yearly ?? {},
  (yearlyBalanceSheets) =>
    Object.values(yearlyBalanceSheets).sort(dateSortComparer)
);

export const selectSortedQuarterlyBalanceSheets = createSelector(
  (state) => state.fundamentals.data?.Financials.Balance_Sheet.quarterly ?? {},
  (quarterlyBalanceSheets) =>
    Object.values(quarterlyBalanceSheets).sort(dateSortComparer)
);

const selectYearlyBalanceSheets = createSelector(
  selectConvertCurrency,
  selectSortedYearlyBalanceSheets,
  selectYearlyIncomeStatements,
  (convertCurrency, yearlyBalanceSheets, yearlyIncomeStatements) => {
    if (!yearlyBalanceSheets.length) return null;

    const newYearlyBalanceSheets = {};

    yearlyBalanceSheets.forEach((balanceSheet) => {
      newYearlyBalanceSheets[balanceSheet.date] = getBalanceSheet(
        balanceSheet,
        convertCurrency,
        yearlyIncomeStatements[balanceSheet.date].totalRevenue,
        balanceSheet.date
      );
    });

    return newYearlyBalanceSheets;
  }
);

export default selectYearlyBalanceSheets;