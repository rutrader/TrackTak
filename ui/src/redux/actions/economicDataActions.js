import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import axios from "../../axios/axios";
import { yearMonthDateFormat } from "../../shared/utils";

export const getTenYearGovernmentBondLastClose = createAsyncThunk(
  "economicData/getTenYearGovernmentBondLastClose",
  async (countryISO) => {
    const res = await axios.get(
      `/api/v1/government-bond-last-close/${countryISO}`
    );
    return res.data;
  }
);

export const getExchangeRateHistory = createAsyncThunk(
  "economicData/getExchangeRateHistory",
  async ({ baseCurrency, quoteCurrency, from }) => {
    if (baseCurrency !== quoteCurrency) {
      const formattedFrom = dayjs(from).format(yearMonthDateFormat);

      const res = await axios.get(
        `/api/v1/exchange-rate-history/${baseCurrency}/${quoteCurrency}?from=${formattedFrom}`
      );
      return res.data;
    }
  }
);
