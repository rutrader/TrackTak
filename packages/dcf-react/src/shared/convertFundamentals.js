import isNil from "lodash/isNil";
import getValueFromString from "./getValueFromString";

const getBalanceSheet = (balanceSheet) => {
  const newBalanceSheet = {};

  Object.keys(balanceSheet).forEach((key) => {
    newBalanceSheet[key] = getValueFromString(balanceSheet[key]);
  });

  return newBalanceSheet;
};

const getIncomeStatement = (incomeStatement) => {
  const newIncomeStatement = {};

  Object.keys(incomeStatement).forEach((key) => {
    newIncomeStatement[key] = getValueFromString(incomeStatement[key]);
  });

  return newIncomeStatement;
};

const getCashFlowStatement = (cashflowStatement) => {
  const newCashFlowStatement = {};

  Object.keys(cashflowStatement).forEach((key) => {
    newCashFlowStatement[key] = getValueFromString(cashflowStatement[key]);
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
    incomeStatement.quarterly[datum.date] = getIncomeStatement(datum);
  });

  Object.values(Income_Statement.yearly).forEach((datum, i) => {
    // Fix EOD bug from some stocks not having recent data
    if (i !== 0 || !isNil(datum.totalRevenue)) {
      incomeStatement.yearly[datum.date] = getIncomeStatement(datum);
    } else {
      firstIncomeSheetRemoved = true;
    }
  });

  Object.values(Balance_Sheet.quarterly).forEach((datum) => {
    balanceSheet.quarterly[datum.date] = getBalanceSheet(datum);
  });

  Object.values(Balance_Sheet.yearly).forEach((datum, i) => {
    // Fix EOD bug from some stocks not having recent data
    if (i !== 0 || !firstIncomeSheetRemoved) {
      balanceSheet.yearly[datum.date] = getBalanceSheet(datum);
    }
  });

  Object.values(Cash_Flow.quarterly).forEach((datum) => {
    cashFlowStatement.quarterly[datum.date] = getCashFlowStatement(datum);
  });

  Object.values(Cash_Flow.yearly).forEach((datum, i) => {
    // Fix EOD bug from some stocks not having recent data
    if (i !== 0 || !firstIncomeSheetRemoved) {
      cashFlowStatement.yearly[datum.date] = getCashFlowStatement(datum);
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
