import convertCalculationToZeroIfNaN from "./convertCalculationToZeroIfNaN";

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

export default getIncomeStatement;
