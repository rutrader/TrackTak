import isNil from "lodash/isNil";
import getValueFromString from "./getValueFromString";

const convertBalanceSheet = ({
  date,
  filing_date,
  currency_symbol,
  ...balanceSheet
}) => {
  const newBalanceSheet = {
    date,
    filingDate: filing_date,
    currencyCode: currency_symbol,
    ...balanceSheet,
  };

  Object.keys(balanceSheet).forEach((key) => {
    newBalanceSheet[key] = getValueFromString(balanceSheet[key]);
  });

  // EOD fix for some stocks who have different longTermDebt versus longTermDebtTotal
  newBalanceSheet.longTermDebt = newBalanceSheet.longTermDebtTotal
    ? newBalanceSheet.longTermDebtTotal
    : newBalanceSheet.longTermDebt;

  return newBalanceSheet;
};

const convertIncomeStatement = ({
  date,
  filing_date,
  currency_symbol,
  ...incomeStatement
}) => {
  const newIncomeStatement = {
    date,
    filingDate: filing_date,
    currencyCode: currency_symbol,
    ...incomeStatement,
  };

  Object.keys(incomeStatement).forEach((key) => {
    newIncomeStatement[key] = getValueFromString(incomeStatement[key]);
  });

  return newIncomeStatement;
};

const convertCashFlowStatement = ({
  date,
  filing_date,
  currency_symbol,
  ...cashFlowStatement
}) => {
  const newCashFlowStatement = {
    date,
    filingDate: filing_date,
    currencyCode: currency_symbol,
    ...cashFlowStatement,
  };

  Object.keys(cashFlowStatement).forEach((key) => {
    newCashFlowStatement[key] = getValueFromString(cashFlowStatement[key]);
  });

  return newCashFlowStatement;
};

const convertFundamentals = (fundamentalsData) => {
  const {
    General,
    Highlights,
    SharesStats,
    Financials: { Balance_Sheet, Income_Statement, Cash_Flow },
  } = fundamentalsData;

  const general = {
    code: General.Code,
    name: General.Name,
    description: General.Description,
    exchange: General.Exchange,
    currencyCode: General.CurrencyCode,
    currencyName: General.CurrencyName,
    currencySymbol: General.CurrencySymbol,
    countryISO: General.CountryISO,
    industry: General.Industry,
    gicSubIndustry: General.GicSubIndustry,
  };

  const highlights = {
    marketCapitalization: Highlights.MarketCapitalization,
    mostRecentQuarter: Highlights.MostRecentQuarter,
  };

  const sharesStats = {
    sharesOutstanding: SharesStats.SharesOutstanding,
  };

  const balanceSheet = {
    currencyCode: Balance_Sheet.currency_symbol,
    quarterly: {},
    yearly: {},
  };

  const incomeStatement = {
    currencyCode: Income_Statement.currency_symbol,
    quarterly: {},
    yearly: {},
  };

  const cashFlowStatement = {
    currencyCode: Cash_Flow.currency_symbol,
    quarterly: {},
    yearly: {},
  };

  let firstIncomeSheetRemoved;

  Object.values(Income_Statement.quarterly).forEach((datum) => {
    incomeStatement.quarterly[datum.date] = convertIncomeStatement(datum);
  });

  Object.values(Income_Statement.yearly).forEach((datum, i) => {
    // Fix EOD bug from some stocks not having recent data
    if (i !== 0 || !isNil(datum.totalRevenue)) {
      incomeStatement.yearly[datum.date] = convertIncomeStatement(datum);
    } else {
      firstIncomeSheetRemoved = true;
    }
  });

  Object.values(Balance_Sheet.quarterly).forEach((datum) => {
    balanceSheet.quarterly[datum.date] = convertBalanceSheet(datum);
  });

  Object.values(Balance_Sheet.yearly).forEach((datum, i) => {
    // Fix EOD bug from some stocks not having recent data
    if (i !== 0 || !firstIncomeSheetRemoved) {
      balanceSheet.yearly[datum.date] = convertBalanceSheet(datum);
    }
  });

  Object.values(Cash_Flow.quarterly).forEach((datum) => {
    cashFlowStatement.quarterly[datum.date] = convertCashFlowStatement(datum);
  });

  Object.values(Cash_Flow.yearly).forEach((datum, i) => {
    // Fix EOD bug from some stocks not having recent data
    if (i !== 0 || !firstIncomeSheetRemoved) {
      cashFlowStatement.yearly[datum.date] = convertCashFlowStatement(datum);
    }
  });

  return {
    general,
    highlights,
    sharesStats,
    balanceSheet,
    incomeStatement,
    cashFlowStatement,
  };
};

export default convertFundamentals;
