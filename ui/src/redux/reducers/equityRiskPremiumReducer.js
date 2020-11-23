import { createReducer } from "@reduxjs/toolkit";
import { getEquityRiskPremiumCountries } from "../actions/equityRiskPremiumActions";

const initialState = {
  countryData: null,
  matureMarketEquityRiskPremium: null,
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
  }
);
