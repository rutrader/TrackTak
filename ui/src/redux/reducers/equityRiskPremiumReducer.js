import { createReducer } from "@reduxjs/toolkit";
import { percentModifier } from "../../components/FormatRawNumberToPercent";
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
        const matureMarketEquityRiskPremium = equityRiskPremiumCountriesData.find(
          (x) => x.country === "United States"
        ).equityRiskPremium;

        state.matureMarketEquityRiskPremium =
          parseFloat(matureMarketEquityRiskPremium) / percentModifier;
      }
    );
    builder.addCase(setCurrentEquityRiskPremium, (state, action) => {
      const {
        corporateTaxRate,
        countryRiskPremium,
        equityRiskPremium,
        adjDefaultSpread,
      } = state.countryData.find(
        (datum) => datum.country === action.payload.currentCountry
      );

      state.currentCountry = {
        corporateTaxRate: parseFloat(corporateTaxRate) / percentModifier,
        countryRiskPremium: parseFloat(countryRiskPremium) / percentModifier,
        equityRiskPremium: parseFloat(equityRiskPremium) / percentModifier,
        adjDefaultSpread: parseFloat(adjDefaultSpread) / percentModifier,
      };
    });
  }
);
