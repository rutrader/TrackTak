import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { setCurrentEquityRiskPremium } from "./equityRiskPremiumActions";
import { setCurrentIndustryAverage } from "./industryAveragesActions";
import {
  getExchangeRateHistory,
  getTenYearGovernmentBondLastClose,
} from "./economicDataActions";
import dayjs from "dayjs";
import { monthDateFormat } from "../../shared/utils";
import convertGBXToGBP from "../../shared/convertGBXToGBP";

export const setFundamentals = createAction(
  "fundamentals/setFundamentals",
  (data, exchangeRates) => {
    return {
      payload: {
        data,
        exchangeRates,
      },
    };
  }
);

export const getFundamentals = createAsyncThunk(
  "fundamentals/getFundamentals",
  async ({ ticker, filter }, { dispatch, getState }) => {
    try {
      const urlParams = new URLSearchParams();

      if (filter) {
        urlParams.set("filter", filter);
      }

      const { data } = await axios.get(
        `/api/v1/fundamentals/${ticker}?${urlParams.toString()}`
      );
      dispatch(
        getTenYearGovernmentBondLastClose({
          countryISO: data.General.CountryISO,
        })
      );
      dispatch(setCurrentEquityRiskPremium(data.General.AddressData.Country));
      dispatch(setCurrentIndustryAverage(data.General.Industry));

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

      // UK stocks are quoted in pence so we convert it to GBP for ease of use
      const valuationCurrencyCode = convertGBXToGBP(data.General.CurrencyCode);

      await dispatch(
        getExchangeRateHistory({
          baseCurrency: convertGBXToGBP(
            data.Financials.Balance_Sheet.currency_symbol
          ),
          quoteCurrency: valuationCurrencyCode,
          from: minDate,
        })
      );

      const state = getState();

      dispatch(setFundamentals(data, state.economicData.exchangeRates));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
