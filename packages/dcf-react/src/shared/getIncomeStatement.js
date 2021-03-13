const getIncomeStatement = (
  incomeStatement,
  convertCurrency,
  dateToConvertCurrencyAt
) => {
  const newIncomeStatement = {
    totalRevenue: incomeStatement.totalRevenue,
    operatingIncome: incomeStatement.operatingIncome,
    interestExpense: incomeStatement.interestExpense,
    minorityInterest: incomeStatement.minorityInterest,
  };

  Object.keys(newIncomeStatement).forEach((property) => {
    newIncomeStatement[property] = convertCurrency(
      [dateToConvertCurrencyAt],
      newIncomeStatement[property]
    );
  });

  newIncomeStatement.operatingMargin =
    newIncomeStatement.operatingIncome / newIncomeStatement.totalRevenue;
  newIncomeStatement.date = incomeStatement.date;

  return newIncomeStatement;
};

export default getIncomeStatement;
