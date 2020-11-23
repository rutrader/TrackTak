import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const getTenYearGovernmentBonds = createAsyncThunk(
  "governmentBonds/getTenYearGovernmentBonds",
  async (countryISO) => {
    const res = await axios.get(
      `/api/v1/government-bonds/${countryISO}10Y.GBOND`
    );
    return res.data;
  }
);
