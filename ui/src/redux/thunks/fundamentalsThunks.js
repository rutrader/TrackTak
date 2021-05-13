import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getExchangeRate,
  getFundamentals,
  getGovernmentBond,
  getPrices,
} from "../../api/api";
import {
  convertGBXToGBP,
  setExchangeRates,
  setLastPriceClose,
  setTenYearGovernmentBondLastClose,
  setFundamentals,
  convertFundamentals,
} from "@tracktak/intrinsic-valuations";
import dayjs from "dayjs";
import convertHyphenTickerToDot from "../../shared/convertHyphenTickerToDot";
import getMinimumHistoricalDateFromFinancialStatements from "../../shared/getMinimumHistoricalDateFromFinancialStatements";

const yearMonthDateFormat = "YYYY-MM";
const fundamentalsFilter =
  "General,Highlights,SharesStats,Financials::Balance_Sheet,Financials::Income_Statement";

export const getExchangeRatesThunk = createAsyncThunk(
  "fundamentals/getExchangeRates",
  async ({ currencyCode, incomeStatement, balanceSheet }, { dispatch }) => {
    const baseCurrency = balanceSheet.currencyCode;
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

      dispatch(setExchangeRates(data.value));

      return data.value;
    }

    dispatch(setExchangeRates());
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

    return data.value;
  },
);

export const getLastPriceCloseThunk = createAsyncThunk(
  "fundamentals/getLastPriceClose",
  async ({ ticker, params }, { dispatch }) => {
    const convertedTicker = convertHyphenTickerToDot(ticker);

    const { data } = await getPrices(convertedTicker, {
      ...params,
      filter: "last_close",
    });

    dispatch(setLastPriceClose(data.value));

    return data.value;
  },
);

export const getFundamentalsThunk = createAsyncThunk(
  "fundamentals/getFundamentals",
  async ({ ticker }, { dispatch }) => {
    const convertedTicker = convertHyphenTickerToDot(ticker);
    const { data } = await getFundamentals(convertedTicker, {
      filter: fundamentalsFilter,
    });
    const fundamentals = convertFundamentals(data.value);

    dispatch(
      getExchangeRatesThunk({
        currencyCode: fundamentals.general.currencyCode,
        incomeStatement: fundamentals.incomeStatement,
        balanceSheet: fundamentals.balanceSheet,
      }),
    );

    dispatch(
      getTenYearGovernmentBondLastCloseThunk({
        countryISO: fundamentals.general.countryISO,
      }),
    );

    dispatch(setFundamentals(fundamentals));

    return fundamentals;
  },
);
