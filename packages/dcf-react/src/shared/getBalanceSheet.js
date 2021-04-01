import convertCalculationToZeroIfNaN from "./convertCalculationToZeroIfNaN";

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

  const calculations = {};

  // API returns wrong value for this property for non-us stocks
  // so we overwrite it
  calculations.cashAndShortTermInvestments =
    convertedBalanceSheet.cash + convertedBalanceSheet.shortTermInvestments;

  calculations.longTermDebtAndCapitalLeases =
    convertedBalanceSheet.shortLongTermDebt +
    convertedBalanceSheet.longTermDebt +
    convertedBalanceSheet.capitalLeaseObligations;

  calculations.bookValueOfDebt = calculations.longTermDebtAndCapitalLeases;

  calculations.bookValueOfEquity = convertedBalanceSheet.totalStockholderEquity;

  calculations.investedCapital =
    calculations.bookValueOfEquity +
    calculations.bookValueOfDebt -
    calculations.cashAndShortTermInvestments;

  calculations.salesToCapitalRatio =
    totalRevenue / calculations.investedCapital;

  // Take it out here because we show it as a separate line
  // on the balance statement
  calculations.nonCurrentLiabilitiesOther -=
    convertedBalanceSheet.capitalLeaseObligations;

  return {
    ...convertedBalanceSheet,
    ...convertCalculationToZeroIfNaN(calculations),
  };
};

export default getBalanceSheet;
