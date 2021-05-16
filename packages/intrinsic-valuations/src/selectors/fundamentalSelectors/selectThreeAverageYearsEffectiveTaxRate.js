import { createSelector } from "@reduxjs/toolkit";
import getFinancialSheetPastValues from "../../shared/getFinancialSheetPastValues";
import selectIsInUS from "./selectIsInUS";
import {
  selectSortedQuarterlyIncomeStatements,
  selectSortedYearlyIncomeStatements,
} from "./selectYearlyIncomeStatements";

const pastPeriodsToGet = 3;
const quarters = 4;
const pastThreeYearQuarterPeriod = pastPeriodsToGet * quarters;

const selectThreeAverageYearsEffectiveTaxRate = createSelector(
  selectIsInUS,
  selectSortedYearlyIncomeStatements,
  selectSortedQuarterlyIncomeStatements,
  (isInUS, yearlyIncomeStatements, quarterlyIncomeStatements) => {
    let pastThreeYearIncomeBeforeTax;
    let pastThreeYearIncomeTaxExpense;

    if (isInUS) {
      const pastThreeYearsQuarterlyIncomeStatements = quarterlyIncomeStatements.slice(
        0,
        pastThreeYearQuarterPeriod,
      );

      pastThreeYearIncomeBeforeTax = getFinancialSheetPastValues(
        pastThreeYearsQuarterlyIncomeStatements,
        "incomeBeforeTax",
      );
      pastThreeYearIncomeTaxExpense = getFinancialSheetPastValues(
        pastThreeYearsQuarterlyIncomeStatements,
        "incomeTaxExpense",
      );
    } else {
      const pastThreeYearsYearlyIncomeStatements = yearlyIncomeStatements.slice(
        0,
        pastPeriodsToGet,
      );

      pastThreeYearIncomeBeforeTax = getFinancialSheetPastValues(
        pastThreeYearsYearlyIncomeStatements,
        "incomeBeforeTax",
      );
      pastThreeYearIncomeTaxExpense = getFinancialSheetPastValues(
        pastThreeYearsYearlyIncomeStatements,
        "incomeTaxExpense",
      );
    }
    return pastThreeYearIncomeTaxExpense / pastThreeYearIncomeBeforeTax;
  },
);

export default selectThreeAverageYearsEffectiveTaxRate;
