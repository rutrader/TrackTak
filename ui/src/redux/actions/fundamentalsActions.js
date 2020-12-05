import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { setCurrentEquityRiskPremium } from "./equityRiskPremiumActions";
import { setCurrentIndustryAverage } from "./industryAveragesActions";
import { getTenYearGovernmentBondLastClose } from "./economicDataActions";

export const getFundamentals = createAsyncThunk(
  "fundamentals/getFundamentals",
  async (ticker, { dispatch, getState }) => {
    try {
      const res = await axios.get(`/api/v1/fundamentals/${ticker}`);

      dispatch(getTenYearGovernmentBondLastClose(res.data.General.CountryISO));
      dispatch(
        setCurrentEquityRiskPremium(res.data.General.AddressData.Country)
      );
      dispatch(setCurrentIndustryAverage(res.data.General.Industry));

      const state = getState();

      return {
        data: res.data,
        exchangeRatePairs: state.economicData.exchangeRatePairs,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
