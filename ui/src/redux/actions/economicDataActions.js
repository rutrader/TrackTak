import { createAsyncThunk } from "@reduxjs/toolkit";
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

export const getExchangeRatesLastCloses = createAsyncThunk(
  "economicData/getExchangeRatesLastCloses",
  async () => {
    const res = await axios.get(`/api/v1/exchange-rates-last-closes`);
    return res.data;
  }
);
