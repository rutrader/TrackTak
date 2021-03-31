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

  convertedIncomeStatement.grossMargin =
    convertedIncomeStatement.grossProfit /
    convertedIncomeStatement.totalRevenue;

  convertedIncomeStatement.operatingMargin =
    convertedIncomeStatement.operatingIncome /
    convertedIncomeStatement.totalRevenue;

  convertedIncomeStatement.effectiveTaxRate =
    convertedIncomeStatement.incomeTaxExpense /
    convertedIncomeStatement.incomeBeforeTax;

  convertedIncomeStatement.netMargin =
    convertedIncomeStatement.netIncomeFromContinuingOps /
    convertedIncomeStatement.totalRevenue;

  return convertedIncomeStatement;
};

export default getIncomeStatement;
