import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import {
  getExchangeRate,
  getFundamentals,
  getGovernmentBond,
  getPrices,
} from "../../api/api";
import {
  setExchangeRates,
  setFundamentals,
  setLastPriceClose,
  setTenYearGovernmentBondLastClose,
} from "../actions/stockActions";
import convertSubCurrencyToCurrency from "../../shared/convertSubCurrencyToCurrency";
import convertFundamentals from "../../shared/convertFundamentals";
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
    const convertedBaseCurrency = convertSubCurrencyToCurrency(baseCurrency);
    const convertedQuoteCurrency = convertSubCurrencyToCurrency(quoteCurrency);
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
    const { data } = await getPrices(ticker, {
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
    const { data } = await getFundamentals(ticker, {
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
