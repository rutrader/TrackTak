import getIsStockInUS from "./getIsStockInUS";
import getNonUSFinancialData from "./getNonUSFinancialData";
import getSortedStatements from "./getSortedStatements";
import getUSFinancialData from "./getUSFinancialData";

const getCashFlowStatement = (
  cashFlowStatement,
  convertCurrency,
  dateToConvertCurrencyAt,
) => {
  const convertedCashFlowStatement = {};

  Object.keys(cashFlowStatement).forEach((property) => {
    convertedCashFlowStatement[property] = convertCurrency(
      [dateToConvertCurrencyAt],
      cashFlowStatement[property],
    );
  });

  return convertedCashFlowStatement;
};

const getTTMCashFlowStatement = (
  fundamentals,
  quarterlyCashFlowStatements,
  yearlyCashFlowStatements,
  convertCurrency,
) => {
  if (!yearlyCashFlowStatements.length) return {};

  const cashFlowStatement = getIsStockInUS(fundamentals)
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
};

const getCashFlowStatements = (fundamentals, convertCurrency) => {
  const quarterlyCashFlowStatements = getSortedStatements(
    fundamentals.incomeStatement.quarterly,
  );
  const yearlyCashFlowStatements = getSortedStatements(
    fundamentals.incomeStatement.yearly,
  );

  if (!yearlyCashFlowStatements.length)
    return {
      ttm: {},
      yearly: {},
    };

  const ttm = getTTMCashFlowStatement(
    fundamentals,
    quarterlyCashFlowStatements,
    yearlyCashFlowStatements,
    convertCurrency,
  );

  const yearly = {};

  yearlyCashFlowStatements.forEach((cashFlowStatement) => {
    yearly[cashFlowStatement.date] = getCashFlowStatement(
      cashFlowStatement,
      convertCurrency,
      cashFlowStatement.date,
    );
  });

  return {
    ttm,
    yearly,
  };
};

export default getCashFlowStatements;
