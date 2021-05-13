import { createSelector } from "@reduxjs/toolkit";
import selectIsInUS from "./selectIsInUS";
import {
  selectSortedQuarterlyIncomeStatements,
  selectSortedYearlyIncomeStatements,
} from "./selectYearlyIncomeStatements";
import selectConvertCurrency from "./selectConvertCurrency";
import getIncomeStatement from "../../shared/getIncomeStatement";
import getNonUSFinancialData from "../../shared/getNonUSFinancialData";
import getUSFinancialData from "../../shared/getUSFinancialData";

const selectRecentIncomeStatement = createSelector(
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

export default selectRecentIncomeStatement;
