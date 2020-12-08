import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { setCurrentEquityRiskPremium } from "./equityRiskPremiumActions";
import { setCurrentIndustryAverage } from "./industryAveragesActions";
import {
  getExchangeRateHistory,
  getTenYearGovernmentBondLastClose,
} from "./economicDataActions";
import dayjs from "dayjs";

export const getFundamentals = createAsyncThunk(
  "fundamentals/getFundamentals",
  async (ticker, { dispatch, getState }) => {
    try {
      const { data } = await axios.get(`/api/v1/fundamentals/${ticker}`);

      dispatch(getTenYearGovernmentBondLastClose(data.General.CountryISO));
      dispatch(setCurrentEquityRiskPremium(data.General.AddressData.Country));
      dispatch(setCurrentIndustryAverage(data.General.Industry));

      const mergedStatements = {
        ...data.Financials.Income_Statement.yearly,
        ...data.Financials.Balance_Sheet.yearly,
        ...data.Financials.Cash_Flow.yearly,
      };

      let minDate;
      let maxDate;

      Object.keys(mergedStatements).forEach((date, i) => {
        const newDate = dayjs(date);

        if (i === 0) {
          minDate = newDate;
          maxDate = newDate;
        }

        minDate = dayjs.min(minDate, newDate);
        maxDate = dayjs.max(maxDate, newDate);
      });

      // UK stocks are quoted in pence so we convert it to GBP for ease of use
      const valuationCurrencyCode =
        data.General.CurrencyCode === "GBX" ? "GBP" : data.General.CurrencyCode;

      await dispatch(
        getExchangeRateHistory({
          baseCurrency: data.Financials.Balance_Sheet.currency_symbol,
          quoteCurrency: valuationCurrencyCode,
          from: minDate,
          to: maxDate,
        })
      );

      const state = getState();

      return {
        data,
        valuationCurrencyCode,
        exchangeRates: state.economicData.exchangeRates,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
