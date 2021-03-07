import { createReducer } from "@reduxjs/toolkit";
import getValueFromString from "../../shared/getValueFromString";
import {
  setLastPriceClose,
  setFundamentals,
  setExchangeRates,
  setTenYearGovernmentBondLastClose,
} from "../actions/fundamentalsActions";

const initialState = {
  governmentBondTenYearYield: null,
  priceLastClose: null,
  general: null,
  highlights: null,
  sharesStats: null,
  balanceSheet: null,
  incomeStatement: null,
  exchangeRates: null,
};

const getBalanceSheet = (datum) => {
  const balanceSheet = {
    totalStockholderEquity: datum.totalStockholderEquity,
    cash: datum.cash,
    shortLongTermDebt: datum.shortLongTermDebt,
    longTermDebt: datum.longTermDebt,
    capitalLeaseObligations: datum.capitalLeaseObligations,
    shortTermInvestments: datum.shortTermInvestments,
    cashAndShortTermInvestments: datum.cashAndShortTermInvestments,
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

const setFundamentalsReducer = (state, action) => {
  const {
    General,
    Highlights,
    SharesStats,
    Financials: { Balance_Sheet, Income_Statement },
  } = action.payload;

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
    quarterly: {},
    yearly: {},
  };

  const incomeStatement = {
    quarterly: {},
    yearly: {},
  };

  Object.values(Balance_Sheet.quarterly).forEach((datum) => {
    balanceSheet.quarterly[datum.date] = getBalanceSheet(datum);
  });

  Object.values(Balance_Sheet.yearly).forEach((datum) => {
    balanceSheet.yearly[datum.date] = getBalanceSheet(datum);
  });

  Object.values(Income_Statement.quarterly).forEach((datum) => {
    incomeStatement.quarterly[datum.date] = getIncomeStatement(datum);
  });

  Object.values(Income_Statement.yearly).forEach((datum) => {
    incomeStatement.yearly[datum.date] = getIncomeStatement(datum);
  });

  state.general = general;
  state.highlights = highlights;
  state.sharesStats = sharesStats;
  state.incomeStatement = incomeStatement;
  state.balanceSheet = balanceSheet;
};

const setLastPriceCloseReducer = (state, action) => {
  const priceLastClose = action.payload;

  state.priceLastClose = priceLastClose;
};

const setGovernmentBondTenYearLastCloseReducer = (
  state,
  { payload = null },
) => {
  state.governmentBondTenYearYield = payload / 100;
};

const setExchangeRateReducer = (state, { payload = {} }) => {
  const values = Object.values(payload);

  if (values.length) {
    state.exchangeRates = payload;
  } else {
    state.exchangeRates = null;
  }
};

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLastPriceClose, setLastPriceCloseReducer);
  builder.addCase(setFundamentals, setFundamentalsReducer);
  builder.addCase(
    setTenYearGovernmentBondLastClose,
    setGovernmentBondTenYearLastCloseReducer,
  );
  builder.addCase(setExchangeRates, setExchangeRateReducer);
});
