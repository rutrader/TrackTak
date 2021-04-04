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
    convertedBalanceSheet.longTermDebt +
    convertedBalanceSheet.capitalLeaseObligations;

  calculations.bookValueOfDebt =
    convertedBalanceSheet.shortLongTermDebt +
    calculations.longTermDebtAndCapitalLeases;

  // Minority interest is called noncontrollingInterestInConsolidatedEntity
  // on the API
  calculations.minorityInterest =
    convertedBalanceSheet.noncontrollingInterestInConsolidatedEntity;

  calculations.totalEquity =
    convertedBalanceSheet.totalStockholderEquity +
    calculations.minorityInterest;

  calculations.bookValueOfEquity = calculations.totalEquity;

  calculations.investedCapital =
    calculations.bookValueOfEquity +
    calculations.bookValueOfDebt -
    calculations.cashAndShortTermInvestments;

  calculations.salesToCapitalRatio =
    totalRevenue / calculations.investedCapital;

  // Take it out here because we show capital leases as a separate line
  // on the balance statement
  calculations.nonCurrentLiabilitiesOther =
    convertedBalanceSheet.nonCurrentLiabilitiesOther -
    convertedBalanceSheet.capitalLeaseObligations;

  return {
    ...convertedBalanceSheet,
    ...convertCalculationToZeroIfNaN(calculations),
  };
};

export default getBalanceSheet;
