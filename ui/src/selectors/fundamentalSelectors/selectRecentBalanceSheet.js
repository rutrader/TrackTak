import { createSelector } from "@reduxjs/toolkit";
import getBalanceSheet from "../../shared/getBalanceSheet";
import { selectSortedQuarterlyBalanceSheets } from "./selectYearlyBalanceSheets";
import selectConvertCurrency from "./selectConvertCurrency";
import selectMostRecentQuarter from "./selectMostRecentQuarter";
import selectRecentIncomeStatement from "./selectRecentIncomeStatement";

const selectRecentBalanceSheet = createSelector(
  selectMostRecentQuarter,
  selectConvertCurrency,
  selectSortedQuarterlyBalanceSheets,
  selectRecentIncomeStatement,
  (
    mostRecentQuarter,
    convertCurrency,
    quarterlyBalanceSheets,
    recentIncomeStatement
  ) => {
    if (!quarterlyBalanceSheets.length) return null;

    const mostRecentBalanceSheet = quarterlyBalanceSheets.find(
      (x) => x.date === mostRecentQuarter
    );

    return getBalanceSheet(
      mostRecentBalanceSheet,
      convertCurrency,
      recentIncomeStatement.totalRevenue,
      mostRecentQuarter
    );
  }
);

export default selectRecentBalanceSheet;
