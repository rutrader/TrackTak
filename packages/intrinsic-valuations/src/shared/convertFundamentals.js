import { isNil } from "lodash-es";
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

  // Fix EOD issue by removing stocks with incomplete data
  const quarterlyDatesRemoved = {};

  Object.values(Income_Statement.quarterly).forEach((datum) => {
    if (isNil(datum.totalRevenue)) {
      quarterlyDatesRemoved[datum.date] = datum.date;
    } else {
      incomeStatement.quarterly[datum.date] = convertIncomeStatement(datum);
    }
  });

  Object.values(Balance_Sheet.quarterly).forEach((datum) => {
    if (
      isNil(datum.totalStockholderEquity) ||
      quarterlyDatesRemoved[datum.date]
    ) {
      quarterlyDatesRemoved[datum.date] = datum.date;
    } else {
      balanceSheet.quarterly[datum.date] = convertBalanceSheet(datum);
    }
  });

  Object.values(Cash_Flow.quarterly).forEach((datum) => {
    if (!quarterlyDatesRemoved[datum.date]) {
      cashFlowStatement.quarterly[datum.date] = convertCashFlowStatement(datum);
    }
  });

  const yearlyDatesRemoved = {};

  Object.values(Income_Statement.yearly).forEach((datum) => {
    if (isNil(datum.totalRevenue)) {
      yearlyDatesRemoved[datum.date] = datum.date;
    } else {
      incomeStatement.yearly[datum.date] = convertIncomeStatement(datum);
    }
  });

  Object.values(Balance_Sheet.yearly).forEach((datum) => {
    if (isNil(datum.totalStockholderEquity) || yearlyDatesRemoved[datum.date]) {
      yearlyDatesRemoved[datum.date] = datum.date;
    } else {
      balanceSheet.yearly[datum.date] = convertBalanceSheet(datum);
    }
  });

  Object.values(Cash_Flow.yearly).forEach((datum) => {
    if (!yearlyDatesRemoved[datum.date]) {
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
