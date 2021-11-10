import convertCalculationToZeroIfNaN from "./convertCalculationToZeroIfNaN";
import getIsStockInUS from "./getIsStockInUS";
import getNonUSFinancialData from "./getNonUSFinancialData";
import getUSFinancialData from "./getUSFinancialData";
import getSortedStatements from "./getSortedStatements";
import defaultStatement from "./defaultStatement";

const getIncomeStatement = (
  incomeStatement,
  convertCurrency,
  datesToConvertCurrencyAt,
) => {
  const convertedIncomeStatement = {};

  Object.keys(incomeStatement).forEach((property) => {
    convertedIncomeStatement[property] = convertCurrency(
      datesToConvertCurrencyAt,
      incomeStatement[property],
    );
  });

  const calculations = {};

  calculations.grossMargin =
    convertedIncomeStatement.grossProfit / convertedIncomeStatement.revenue;

  calculations.operatingMargin =
    convertedIncomeStatement.operatingIncome / convertedIncomeStatement.revenue;

  calculations.effectiveTaxRate =
    convertedIncomeStatement.incomeTaxExpense /
    convertedIncomeStatement.incomeBeforeTax;

  calculations.netMargin =
    convertedIncomeStatement.netIncomeFromContinuingOps /
    convertedIncomeStatement.revenue;

  return {
    ...convertedIncomeStatement,
    ...convertCalculationToZeroIfNaN(calculations),
  };
};

const getTTMIncomeStatement = (
  fundamentals,
  quarterlyIncomeStatements,
  yearlyIncomeStatements,
  convertCurrency,
) => {
  if (!yearlyIncomeStatements.length) return {};

  const incomeStatement = getIsStockInUS(fundamentals)
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
};

const getIncomeStatements = (fundamentals, convertCurrency) => {
  const quarterlyIncomeStatements = getSortedStatements(
    fundamentals.incomeStatement.quarterly,
  );
  const yearlyIncomeStatements = getSortedStatements(
    fundamentals.incomeStatement.yearly,
  );

  if (!yearlyIncomeStatements.length) return defaultStatement;

  const ttm = getTTMIncomeStatement(
    fundamentals,
    quarterlyIncomeStatements,
    yearlyIncomeStatements,
    convertCurrency,
  );
  const yearly = {};

  yearlyIncomeStatements.forEach((incomeStatement) => {
    yearly[incomeStatement.date] = getIncomeStatement(
      incomeStatement,
      convertCurrency,
      [incomeStatement.date],
    );
  });

  return {
    ttm,
    yearly,
  };
};

export default getIncomeStatements;
