import { createReducer } from "@reduxjs/toolkit";
import {
  getEquityRiskPremiumCountries,
  setCurrentEquityRiskPremium,
} from "../actions/equityRiskPremiumActions";

const initialState = {
  countryData: null,
  matureMarketEquityRiskPremium: null,
  currentCountry: null,
};

export const equityRiskPremiumCountriesReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(
      getEquityRiskPremiumCountries.fulfilled,
      (state, action) => {
        const equityRiskPremiumCountriesData = action.payload;
        state.countryData = equityRiskPremiumCountriesData;
        state.matureMarketEquityRiskPremium = equityRiskPremiumCountriesData.find(
          (x) => x.country === "United States"
        ).equityRiskPremium;
      }
    );
    builder.addCase(setCurrentEquityRiskPremium, (state, action) => {
      console.log(state);
      state.currentCountry = state.countryData.find(
        (datum) => datum.country === action.payload.currentCountry
      );
    });
  }
);
