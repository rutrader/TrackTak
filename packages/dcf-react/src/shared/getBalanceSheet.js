const getBookValueOfDebt = (balanceSheet) => {
  let bookValueOfDebt = 0;

  bookValueOfDebt += balanceSheet.shortLongTermDebt;

  bookValueOfDebt += balanceSheet.longTermDebt;

  bookValueOfDebt += balanceSheet.capitalLeaseObligations;

  return bookValueOfDebt;
};

const getBalanceSheet = (
  balanceSheet,
  convertCurrency,
  totalRevenue,
  dateToConvertCurrencyAt,
) => {
  const newBalanceSheet = {
    bookValueOfDebt: getBookValueOfDebt(balanceSheet),
    bookValueOfEquity: balanceSheet.totalStockholderEquity,
    noncontrollingInterestInConsolidatedEntity:
      balanceSheet.noncontrollingInterestInConsolidatedEntity,
    cashAndShortTermInvestments:
      balanceSheet.cash + balanceSheet.shortTermInvestments,
  };

  Object.keys(newBalanceSheet).forEach((property) => {
    newBalanceSheet[property] = convertCurrency(
      [dateToConvertCurrencyAt],
      newBalanceSheet[property],
    );
  });

  newBalanceSheet.investedCapital =
    newBalanceSheet.bookValueOfEquity +
    newBalanceSheet.bookValueOfDebt -
    newBalanceSheet.cashAndShortTermInvestments;
  newBalanceSheet.salesToCapitalRatio =
    totalRevenue / newBalanceSheet.investedCapital;
  newBalanceSheet.date = balanceSheet.date;

  return newBalanceSheet;
};

export default getBalanceSheet;
