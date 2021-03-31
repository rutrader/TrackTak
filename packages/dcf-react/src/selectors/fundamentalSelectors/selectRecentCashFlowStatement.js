import { createSelector } from "@reduxjs/toolkit";
import getCashFlowStatement from "../../shared/getCashFlowStatement";
import {
  selectSortedQuarterlCashFlowStatements,
  selectSortedYearlyCashFlowStatements,
} from "./selectYearlyCashFlowStatements";
import selectConvertCurrency from "./selectConvertCurrency";
import selectIsInUS from "./selectIsInUS";
import getUSFinancialData from "../../shared/getUSFinancialData";
import getNonUSFinancialData from "../../shared/getNonUSFinancialData";

const selectRecentCashFlowStatement = createSelector(
  selectConvertCurrency,
  selectIsInUS,
  selectSortedQuarterlCashFlowStatements,
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

export default selectRecentCashFlowStatement;
