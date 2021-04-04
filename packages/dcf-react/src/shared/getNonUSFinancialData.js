const getNonUSFinancialData = (
  getStatementFunc,
  yearlyStatements,
  convertCurrency,
) => {
  const recentStatement = yearlyStatements[0];
  const statement = getStatementFunc(recentStatement, convertCurrency, [
    recentStatement.date,
  ]);

  return statement;
};

export default getNonUSFinancialData;
