import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const getEquityRiskPremiumCountries = createAsyncThunk(
  "equityRiskPremium/getEquityRiskPremiumCountries",
  async () => {
    const res = await axios.get("/api/v1/equity-risk-premium-countries");
    return res.data;
  }
);
