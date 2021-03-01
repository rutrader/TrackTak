import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import convertGBXToGBP from "../../shared/convertGBXToGBP";
import {
  getExchangeRate,
  getFundamentals,
  getGovernmentBond,
  getPrices,
} from "../../api/api";
import dayjs from "dayjs";
import { yearMonthDateFormat } from "../../shared/utils";
import convertHyphenTickerToDot from "../../shared/convertHyphenTickerToDot";
import getMinimumHistoricalDateFromFinancialStatements from "../../shared/getMinimumHistoricalDateFromFinancialStatements";

export const setFundamentals = createAction("fundamentals/setFundamentals");
export const setExchangeRates = createAction("fundamentals/setExchangeRates");
export const setTenYearGovernmentBondLastClose = createAction(
  "fundamentals/setTenYearGovernmentBondLastClose",
);

export const getExchangeRatesThunk = createAsyncThunk(
  "fundamentals/getExchangeRates",
  async ({ currencyCode, incomeStatement, balanceSheet }) => {
    const baseCurrency = balanceSheet.currency_symbol;
    const quoteCurrency = currencyCode;
    // UK stocks are quoted in pence so we convert it to GBP for ease of use
    const convertedBaseCurrency = convertGBXToGBP(baseCurrency);
    const convertedQuoteCurrency = convertGBXToGBP(quoteCurrency);
    const from = dayjs(
      getMinimumHistoricalDateFromFinancialStatements(
        incomeStatement,
        balanceSheet,
      ),
    ).format(yearMonthDateFormat);

    if (convertedBaseCurrency !== convertedQuoteCurrency) {
      const { data } = await getExchangeRate(
        convertedBaseCurrency,
        convertedQuoteCurrency,
        {
          period: "m",
          from,
        },
      );

      return data.value;
    }
  },
);

export const getTenYearGovernmentBondLastCloseThunk = createAsyncThunk(
  "fundamentals/getTenYearGovernmentBondLastCloseThunk",
  async ({ countryISO, params }, { dispatch }) => {
    const { data } = await getGovernmentBond(`${countryISO}10Y`, {
      ...params,
      filter: "last_close",
    });

    dispatch(setTenYearGovernmentBondLastClose(data.value));
  },
);

export const getLastPriceCloseThunk = createAsyncThunk(
  "fundamentals/getLastPriceClose",
  async ({ ticker, params }) => {
    const convertedTicker = convertHyphenTickerToDot(ticker);

    const { data } = await getPrices(convertedTicker, {
      ...params,
      filter: "last_close",
    });

    return data.value;
  },
);

export const getFundamentalsThunk = createAsyncThunk(
  "fundamentals/getFundamentals",
  async ({ ticker, filter }, { dispatch }) => {
    const convertedTicker = convertHyphenTickerToDot(ticker);
    const { data } = await getFundamentals(convertedTicker, {
      filter,
    });
    const fundamentalsData = data.value;
    const exchangeRates = await dispatch(
      getExchangeRatesThunk({
        currencyCode: fundamentalsData.General.CurrencyCode,
        incomeStatement: fundamentalsData.Financials.Income_Statement,
        balanceSheet: fundamentalsData.Financials.Balance_Sheet,
      }),
    );

    dispatch(setExchangeRates(exchangeRates.payload));
    dispatch(setFundamentals(fundamentalsData));
  },
);
