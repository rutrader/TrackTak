import { createSelector } from "@reduxjs/toolkit";
import getBalanceSheet from "../../shared/getBalanceSheet";
import {
  selectSortedQuarterlyBalanceSheets,
  selectSortedYearlyBalanceSheets,
} from "./selectYearlyBalanceSheets";
import selectConvertCurrency from "./selectConvertCurrency";
import selectMostRecentQuarter from "./selectMostRecentQuarter";
import selectRecentIncomeStatement from "./selectRecentIncomeStatement";
import selectIsInUS from "./selectIsInUS";

const selectRecentBalanceSheet = createSelector(
  selectMostRecentQuarter,
  selectConvertCurrency,
  selectSortedQuarterlyBalanceSheets,
  selectSortedYearlyBalanceSheets,
  selectRecentIncomeStatement,
  selectIsInUS,
  (
    mostRecentQuarter,
    convertCurrency,
    quarterlyBalanceSheets,
    yearlyBalanceSheets,
    recentIncomeStatement,
    isInUS,
  ) => {
    if (!yearlyBalanceSheets.length) return null;

    const balanceSheet = isInUS
      ? quarterlyBalanceSheets[0]
      : yearlyBalanceSheets[0];

    return getBalanceSheet(
      balanceSheet,
      convertCurrency,
      recentIncomeStatement.totalRevenue,
      mostRecentQuarter,
    );
  },
);

export default selectRecentBalanceSheet;
