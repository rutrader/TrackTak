import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

import dayjs from "dayjs";
import { monthDateFormat } from "../../shared/utils";
import convertGBXToGBP from "../../shared/convertGBXToGBP";
import { yearMonthDateFormat } from "../../shared/utils";

export const setTenYearGovernmentBondLastClose = createAction(
  "fundamentals/setTenYearGovernmentBondLastClose"
);

export const setExchangeRateHistory = createAction(
  "fundamentals/setExchangeRateHistory"
);

export const setLastPriceClose = createAction("fundamentals/setLastPriceClose");

const getMinimumHistoricalDateFromFinancialStatements = (data) => {
  const mergedStatements = {
    ...data.Financials.Income_Statement.yearly,
    ...data.Financials.Balance_Sheet.yearly,
  };

  let minDate;

  const yearlyDatesAsMonths = [];

  Object.keys(mergedStatements).forEach((key) => {
    yearlyDatesAsMonths.push(dayjs(key).format(monthDateFormat));
  });

  Object.keys(mergedStatements).forEach((date, i) => {
    const formattedDate = `${dayjs(date).format(monthDateFormat)}-01`;
    const newDate = dayjs(formattedDate);

    if (i === 0) {
      minDate = newDate;
    }

    minDate = dayjs.min(minDate, newDate);
  });

  return minDate;
};

export const getTenYearGovernmentBondLastClose = async ({ countryISO, to }) => {
  const urlParams = new URLSearchParams();

  if (to) {
    urlParams.set("to", to);
  }

  return axios.get(
    `/api/v1/government-bond-last-close/${countryISO}?${urlParams.toString()}`
  );
};

export const getExchangeRateHistory = async ({
  baseCurrency,
  quoteCurrency,
  from,
}) => {
  // UK stocks are quoted in pence so we convert it to GBP for ease of use
  const convertedBaseCurrency = convertGBXToGBP(baseCurrency);
  const convertedQuoteCurrency = convertGBXToGBP(quoteCurrency);

  if (convertedBaseCurrency === convertedQuoteCurrency) {
    return Promise.resolve();
  }
  const formattedFrom = dayjs(from).format(yearMonthDateFormat);

  return axios.get(
    `/api/v1/exchange-rate-history/${convertedBaseCurrency}/${convertedQuoteCurrency}?from=${formattedFrom}`
  );
};

export const getLastPriceClose = async ({ ticker, to }) => {
  const urlParams = new URLSearchParams();

  if (to) {
    urlParams.set("to", to);
  }

  return axios.get(
    `/api/v1/last-price-close/${ticker}?${urlParams.toString()}`
  );
};

export const setFundamentalsData = createAsyncThunk(
  "fundamentals/setFundamentalsData",
  async (
    { data, ticker, tenYearGovernmentBondLastCloseTo, lastPriceCloseTo },
    { dispatch }
  ) => {
    const res = await Promise.all([
      getTenYearGovernmentBondLastClose({
        countryISO: data.General.CountryISO,
        to: tenYearGovernmentBondLastCloseTo,
      }),
      getExchangeRateHistory({
        baseCurrency: data.Financials.Balance_Sheet.currency_symbol,
        quoteCurrency: data.General.CurrencyCode,
        from: getMinimumHistoricalDateFromFinancialStatements(data),
      }),
      getLastPriceClose({ ticker, to: lastPriceCloseTo }),
    ]);

    dispatch(
      setTenYearGovernmentBondLastClose(res[0].data.governmentBondLastClose)
    );
    dispatch(setExchangeRateHistory(res[1]?.data.exchangeRates));
    dispatch(setLastPriceClose(res[2].data.priceLastClose));

    return {
      data,
    };
  }
);

export const getFundamentals = createAsyncThunk(
  "fundamentals/getFundamentals",
  async ({ ticker, filter }, { dispatch }) => {
    try {
      const urlParams = new URLSearchParams();

      if (filter) {
        urlParams.set("filter", filter);
      }

      const { data } = await axios.get(
        `/api/v1/fundamentals/${ticker}?${urlParams.toString()}`
      );

      dispatch(setFundamentalsData({ data, ticker }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
