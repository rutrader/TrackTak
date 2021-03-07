const getBookValueOfDebt = (balanceSheet) => {
  let bookValueOfDebt = 0;

  bookValueOfDebt += balanceSheet.shortLongTermDebt;

  bookValueOfDebt += balanceSheet.longTermDebt;

  bookValueOfDebt += balanceSheet.capitalLeaseObligations;

  return bookValueOfDebt;
};

const getCashAndShortTermInvestments = (balanceSheet) => {
  // Non U.S Stocks report cash + shortTermInvestments separately
  if (balanceSheet.cashAndShortTermInvestments !== null) {
    return balanceSheet.cashAndShortTermInvestments;
  } else if (
    balanceSheet.cash !== null ||
    balanceSheet.shortTermInvestments !== null
  ) {
    const cash = balanceSheet.cash;
    const shortTermInvestments = balanceSheet.shortTermInvestments;

    return cash + shortTermInvestments;
  } else {
    return 0;
  }
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
    cashAndShortTermInvestments: getCashAndShortTermInvestments(balanceSheet),
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
