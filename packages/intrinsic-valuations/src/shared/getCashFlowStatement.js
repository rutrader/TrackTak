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

export default getCashFlowStatement;
