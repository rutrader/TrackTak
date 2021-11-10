import convertCalculationToZeroIfNaN from "./convertCalculationToZeroIfNaN";
import defaultStatement from "./defaultStatement";
import getIsStockInUS from "./getIsStockInUS";
import getSortedStatements from "./getSortedStatements";

const getBalanceSheet = (
  balanceSheet,
  convertCurrency,
  revenue,
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

  calculations.salesToCapitalRatio = revenue / calculations.investedCapital;

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

const getTTMBalanceSheet = (
  fundamentals,
  quarterlyBalanceSheets,
  yearlyBalanceSheets,
  ttmIncomeStatement,
  convertCurrency,
) => {
  if (!yearlyBalanceSheets.length) return {};

  const balanceSheet = getIsStockInUS(fundamentals)
    ? quarterlyBalanceSheets[0]
    : yearlyBalanceSheets[0];

  return getBalanceSheet(
    balanceSheet,
    convertCurrency,
    ttmIncomeStatement.revenue,
    fundamentals.highlights.mostRecentQuarter,
  );
};

const getBalanceSheets = (fundamentals, incomeStatements, convertCurrency) => {
  const quarterlyBalanceSheets = getSortedStatements(
    fundamentals.balanceSheet.quarterly,
  );
  const yearlyBalanceSheets = getSortedStatements(
    fundamentals.balanceSheet.yearly,
  );

  if (!yearlyBalanceSheets.length) return defaultStatement;

  const ttm = getTTMBalanceSheet(
    fundamentals,
    quarterlyBalanceSheets,
    yearlyBalanceSheets,
    incomeStatements.ttm,
    convertCurrency,
  );

  const yearly = {};

  yearlyBalanceSheets.forEach((balanceSheet) => {
    const incomeStatement = incomeStatements.yearly[balanceSheet.date];

    yearly[balanceSheet.date] = getBalanceSheet(
      balanceSheet,
      convertCurrency,
      incomeStatement?.revenue ?? 0,
      balanceSheet.date,
    );
  });

  return {
    ttm,
    yearly,
  };
};

export default getBalanceSheets;
