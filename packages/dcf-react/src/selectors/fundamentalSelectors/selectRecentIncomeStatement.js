import { createSelector } from "@reduxjs/toolkit";
import selectIsInUS from "./selectIsInUS";
import getFinancialSheetPastValues from "../../shared/getFinancialSheetPastValues";
import {
  selectSortedQuarterlyIncomeStatements,
  selectSortedYearlyIncomeStatements,
} from "./selectYearlyIncomeStatements";
import selectConvertCurrency from "./selectConvertCurrency";
import getIncomeStatement from "../../shared/getIncomeStatement";

const pastPeriodsToGet = 3;
const quarters = 4;
const pastThreeYearPeriods = pastPeriodsToGet * quarters;

const getPastThreeYearsAverageEffectiveTaxRate = (
  pastThreeYearIncomeTaxExpense,
  pastThreeYearIncomeBeforeTax,
) => pastThreeYearIncomeTaxExpense / pastThreeYearIncomeBeforeTax;

// TODO: Fix when the API fixes the TTM for non-US stocks
const getUSFinancialData = (quarterlyIncomeStatements, convertCurrency) => {
  const pastThreeYearIncomeBeforeTax = getFinancialSheetPastValues(
    quarterlyIncomeStatements,
    "incomeBeforeTax",
    pastThreeYearPeriods,
  );
  const pastThreeYearIncomeTaxExpense = getFinancialSheetPastValues(
    quarterlyIncomeStatements,
    "incomeTaxExpense",
    pastThreeYearPeriods,
  );
  const incomeSheetDates = [...quarterlyIncomeStatements]
    .slice(0, 4)
    .map(({ date }) => date);
  const incomeStatement = {
    totalRevenue: getFinancialSheetPastValues(
      quarterlyIncomeStatements,
      "totalRevenue",
      quarters,
    ),
    operatingIncome: getFinancialSheetPastValues(
      quarterlyIncomeStatements,
      "operatingIncome",
      quarters,
    ),
    interestExpense: getFinancialSheetPastValues(
      quarterlyIncomeStatements,
      "interestExpense",
      quarters,
    ),
    minorityInterest: getFinancialSheetPastValues(
      quarterlyIncomeStatements,
      "minorityInterest",
      quarters,
    ),
  };

  Object.keys(incomeStatement).forEach((property) => {
    incomeStatement[property] = convertCurrency(
      incomeSheetDates,
      incomeStatement[property],
    );
  });

  incomeStatement.operatingMargin =
    incomeStatement.operatingIncome / incomeStatement.totalRevenue;

  return {
    pastThreeYearsAverageEffectiveTaxRate: getPastThreeYearsAverageEffectiveTaxRate(
      pastThreeYearIncomeTaxExpense,
      pastThreeYearIncomeBeforeTax,
    ),
    ...incomeStatement,
  };
};

const getNonUSFinancialData = (yearlyIncomeStatements, convertCurrency) => {
  const recentYearlyIncomeStatement = yearlyIncomeStatements[0];
  const pastThreeYearIncomeBeforeTax = getFinancialSheetPastValues(
    yearlyIncomeStatements,
    "incomeBeforeTax",
    pastPeriodsToGet,
  );
  const pastThreeYearIncomeTaxExpense = getFinancialSheetPastValues(
    yearlyIncomeStatements,
    "incomeTaxExpense",
    pastPeriodsToGet,
  );

  const incomeStatement = getIncomeStatement(
    recentYearlyIncomeStatement,
    convertCurrency,
    recentYearlyIncomeStatement.date,
  );

  return {
    pastThreeYearsAverageEffectiveTaxRate: getPastThreeYearsAverageEffectiveTaxRate(
      pastThreeYearIncomeTaxExpense,
      pastThreeYearIncomeBeforeTax,
    ),
    ...incomeStatement,
  };
};

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
    if (!yearlyIncomeStatements.length) return null;

    const incomeStatement = isInUS
      ? getUSFinancialData(quarterlyIncomeStatements, convertCurrency)
      : getNonUSFinancialData(yearlyIncomeStatements, convertCurrency);

    return incomeStatement;
  },
);

export default selectRecentIncomeStatement;
