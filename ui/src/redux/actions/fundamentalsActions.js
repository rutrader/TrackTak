import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { setCurrentEquityRiskPremium } from "./equityRiskPremiumActions";
import { getTenYearGovernmentBonds } from "./governmentBondsActions";

export const getFundamentals = createAsyncThunk(
  "fundamentals/getFundamentals",
  async (ticker, { dispatch }) => {
    try {
      const res = await axios.get(`/api/v1/fundamentals/${ticker}`);

      dispatch(getTenYearGovernmentBonds(res.data.General.CountryISO));
      dispatch(
        setCurrentEquityRiskPremium(res.data.General.AddressData.Country)
      );

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
