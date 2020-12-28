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
import getMinimumHistoricalDateFromFinancialStatements from "../../shared/getMinimumHistoricalDateFromFinancialStatements";

export const setTenYearGovernmentBondLastClose = createAction(
  "fundamentals/setTenYearGovernmentBondLastClose"
);

export const setExchangeRate = createAction("fundamentals/setExchangeRate");

export const setLastPriceClose = createAction("fundamentals/setLastPriceClose");

export const setFundamentalsDataThunk = createAsyncThunk(
  "fundamentals/setFundamentalsData",
  async (
    { data, ticker, tenYearGovernmentBondLastCloseTo, lastPriceCloseTo },
    { dispatch }
  ) => {
    const baseCurrency = data.Financials.Balance_Sheet.currency_symbol;
    const quoteCurrency = data.General.CurrencyCode;
    // UK stocks are quoted in pence so we convert it to GBP for ease of use
    const convertedBaseCurrency = convertGBXToGBP(baseCurrency);
    const convertedQuoteCurrency = convertGBXToGBP(quoteCurrency);
    const from = dayjs(
      getMinimumHistoricalDateFromFinancialStatements(data)
    ).format(yearMonthDateFormat);

    const promises = [
      getGovernmentBond(data.General.CountryISO, 10, {
        to: tenYearGovernmentBondLastCloseTo,
        filter: "last_close",
      }),
      getPrices(ticker, {
        to: lastPriceCloseTo,
        filter: "last_close",
      }),
    ];

    if (convertedBaseCurrency !== convertedQuoteCurrency) {
      promises.push(
        getExchangeRate(convertedBaseCurrency, convertedQuoteCurrency, {
          period: "m",
          from,
        })
      );
    }

    const res = await Promise.all(promises);

    dispatch(setTenYearGovernmentBondLastClose(res[0].data.value));
    dispatch(setLastPriceClose(res[1].data.value));
    dispatch(setExchangeRate(res[2]?.data.value));

    return {
      data,
    };
  }
);

export const getFundamentalsThunk = createAsyncThunk(
  "fundamentals/getFundamentals",
  async ({ ticker, filter }, { dispatch }) => {
    const { data } = await getFundamentals(ticker, {
      filter,
    });

    dispatch(setFundamentalsDataThunk({ data: data.value, ticker }));
  }
);
