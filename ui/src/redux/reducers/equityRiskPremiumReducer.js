import { createReducer } from "@reduxjs/toolkit";
import { percentModifier } from "../../components/FormatRawNumberToPercent";
import { setCurrentEquityRiskPremium } from "../actions/equityRiskPremiumActions";
import equityRiskPremiumCountries from "../../data/equityRiskPremiumCountries.json";

const initialState = {
  countryData: equityRiskPremiumCountries,
  matureMarketEquityRiskPremium: null,
  currentCountry: null,
};

const matureMarketEquityRiskPremium = initialState.countryData.find(
  (x) => x.country === "United States"
).equityRiskPremium;

initialState.matureMarketEquityRiskPremium =
  parseFloat(matureMarketEquityRiskPremium) / percentModifier;

export const equityRiskPremiumCountriesReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(setCurrentEquityRiskPremium, (state, action) => {
      const {
        corporateTaxRate,
        countryRiskPremium,
        equityRiskPremium,
        adjDefaultSpread,
      } = state.countryData.find((datum) => {
        const country = datum.country.toUpperCase();

        return country === action.payload.currentCountry.toUpperCase();
      });

      state.currentCountry = {
        corporateTaxRate: parseFloat(corporateTaxRate) / percentModifier,
        countryRiskPremium: parseFloat(countryRiskPremium) / percentModifier,
        equityRiskPremium: parseFloat(equityRiskPremium) / percentModifier,
        adjDefaultSpread: parseFloat(adjDefaultSpread) / percentModifier,
      };
    });
  }
);
