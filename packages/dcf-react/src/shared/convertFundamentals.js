import { isNil } from "lodash";
import getValueFromString from "./getValueFromString";

const getBalanceSheet = (datum) => {
  const balanceSheet = {
    cash: datum.cash,
    shortTermInvestments: datum.shortTermInvestments,
    totalStockholderEquity: datum.totalStockholderEquity,
    shortLongTermDebt: datum.shortLongTermDebt,
    longTermDebt: datum.longTermDebt,
    capitalLeaseObligations: datum.capitalLeaseObligations,
    noncontrollingInterestInConsolidatedEntity:
      datum.noncontrollingInterestInConsolidatedEntity,
  };

  Object.keys(balanceSheet).forEach((key) => {
    balanceSheet[key] = getValueFromString(balanceSheet[key]);
  });

  balanceSheet.date = datum.date;

  return balanceSheet;
};

const getIncomeStatement = (datum) => {
  const incomeStatement = {
    minorityInterest: datum.minorityInterest,
    operatingIncome: datum.operatingIncome,
    interestExpense: datum.interestExpense,
    incomeBeforeTax: datum.incomeBeforeTax,
    incomeTaxExpense: datum.incomeTaxExpense,
    totalRevenue: datum.totalRevenue,
  };

  Object.keys(incomeStatement).forEach((key) => {
    incomeStatement[key] = getValueFromString(incomeStatement[key]);
  });

  incomeStatement.date = datum.date;

  return incomeStatement;
};

const convertFundamentals = (fundamentalsData) => {
  const {
    General,
    Highlights,
    SharesStats,
    Financials: { Balance_Sheet, Income_Statement },
  } = fundamentalsData;

  const general = {
    code: General.Code,
    name: General.Name,
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

  return {
    general,
    highlights,
    sharesStats,
    balanceSheet,
    incomeStatement,
  };
};

export default convertFundamentals;
