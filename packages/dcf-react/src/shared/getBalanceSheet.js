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

  // API returns wrong value for this property for non-us stocks
  // so we overwrite it
  convertedBalanceSheet.cashAndShortTermInvestments =
    convertedBalanceSheet.cash + convertedBalanceSheet.shortTermInvestments;

  convertedBalanceSheet.longTermDebtAndCapitalLeases =
    convertedBalanceSheet.shortLongTermDebt +
    convertedBalanceSheet.longTermDebt +
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
