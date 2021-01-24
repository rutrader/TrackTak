import { createSelector } from "@reduxjs/toolkit";
import selectGeneral from "./selectGeneral";
import equityRiskPremiumCountriesJson from "../../data/equityRiskPremiumCountries.json";
import selectPriceLastClose from "./selectPriceLastClose";

const convertToPercent = (value) => parseFloat(value) / 100;

const selectCurrentEquityRiskPremium = createSelector(
  selectGeneral,
  selectPriceLastClose,
  (general) => {
    const {
      corporateTaxRate,
      countryRiskPremium,
      equityRiskPremium,
      adjDefaultSpread,
    } = equityRiskPremiumCountriesJson.find((datum) => {
      const country = datum.country.toUpperCase();

      return country === general.AddressData.Country.toUpperCase();
    });

    const currentEquityRiskPremium = {
      corporateTaxRate,
      countryRiskPremium,
      equityRiskPremium,
      adjDefaultSpread,
    };

    Object.keys(currentEquityRiskPremium).forEach((key) => {
      currentEquityRiskPremium[key] = convertToPercent(
        currentEquityRiskPremium[key]
      );
    });

    return currentEquityRiskPremium;
  }
);

export default selectCurrentEquityRiskPremium;
