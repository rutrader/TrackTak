import getValueFromString from "./getValueFromString";

const getBookValueOfDebt = (balanceSheet) => {
  let bookValueOfDebt = 0;

  bookValueOfDebt += getValueFromString(balanceSheet.shortLongTermDebt);

  bookValueOfDebt += getValueFromString(balanceSheet.longTermDebt);

  bookValueOfDebt += getValueFromString(balanceSheet.capitalLeaseObligations);

  return bookValueOfDebt;
};

const getCashAndShortTermInvestments = (balanceSheet) => {
  // Non U.S Stocks report cash + shortTermInvestments seperately
  if (balanceSheet.cashAndShortTermInvestments !== null) {
    return balanceSheet.cashAndShortTermInvestments;
  } else if (
    balanceSheet.cash !== null ||
    balanceSheet.shortTermInvestments !== null
  ) {
    const cash = getValueFromString(balanceSheet.cash);
    const shortTermInvestments = getValueFromString(
      balanceSheet.shortTermInvestments
    );

    return cash + shortTermInvestments;
  } else {
    return 0;
  }
};

const getBalanceSheet = (
  balanceSheet,
  convertCurrency,
  totalRevenue,
  dateToConvertCurrencyAt
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
      newBalanceSheet[property]
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
