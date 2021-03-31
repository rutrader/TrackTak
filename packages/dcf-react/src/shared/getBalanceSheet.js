const getBalanceSheet = (
  balanceSheet,
  convertCurrency,
  totalRevenue,
  dateToConvertCurrencyAt,
) => {
  const convertedBalanceSheet = {};

  Object.keys(balanceSheet).forEach((property) => {
    convertedBalanceSheet[property] = convertCurrency(
      [dateToConvertCurrencyAt],
      balanceSheet[property],
    );
  });

  convertedBalanceSheet.longTermDebtAndCapitalLeases =
    convertedBalanceSheet.longTermDebtTotal +
    convertedBalanceSheet.capitalLeaseObligations;

  convertedBalanceSheet.bookValueOfDebt =
    convertedBalanceSheet.longTermDebtAndCapitalLeases;

  convertedBalanceSheet.bookValueOfEquity =
    convertedBalanceSheet.totalStockholderEquity;

  convertedBalanceSheet.investedCapital =
    convertedBalanceSheet.bookValueOfEquity +
    convertedBalanceSheet.bookValueOfDebt -
    convertedBalanceSheet.cashAndShortTermInvestments;

  convertedBalanceSheet.salesToCapitalRatio =
    totalRevenue / convertedBalanceSheet.investedCapital;

  // Take it out here because we show it as a seperate line
  // on the balance statement
  convertedBalanceSheet.nonCurrentLiabilitiesOther -=
    convertedBalanceSheet.capitalLeaseObligations;

  return convertedBalanceSheet;
};

export default getBalanceSheet;
