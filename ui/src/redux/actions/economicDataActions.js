import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import axios from "../../axios/axios";

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
  async ({ baseCurrency, quoteCurrency, from, to }) => {
    if (baseCurrency !== quoteCurrency) {
      const format = "YYYY-MM-DD";
      const formattedFrom = dayjs(from).format(format);
      const formattedTo = dayjs(to).format(format);

      const res = await axios.get(
        `/api/v1/exchange-rate-history/${baseCurrency}/${quoteCurrency}?from=${formattedFrom}&to=${formattedTo}`
      );
      return res.data;
    }
  }
);
