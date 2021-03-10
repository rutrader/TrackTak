import { createSelector } from "@reduxjs/toolkit";
import selectGeneral from "./selectGeneral";
import equityRiskPremiumCountriesJson from "../../data/equityRiskPremiumCountries.json";
import selectPriceLastClose from "./selectPriceLastClose";
import getCountryFromCountryISO from "../../shared/getCountryFromCountryISO";

const convertToPercent = (value) => parseFloat(value) / 100;

const selectCurrentEquityRiskPremium = createSelector(
  selectGeneral,
  selectPriceLastClose,
  (general) => {
    const {
      corporateTaxRate: marginalTaxRate,
      countryRiskPremium,
      equityRiskPremium,
      adjDefaultSpread,
    } = equityRiskPremiumCountriesJson.find((datum) => {
      const country = datum.country.toUpperCase();

      return (
        country ===
        getCountryFromCountryISO(general.countryISO.toUpperCase()).toUpperCase()
      );
    });

    const currentEquityRiskPremium = {
      marginalTaxRate,
      countryRiskPremium,
      equityRiskPremium,
      adjDefaultSpread,
    };

    Object.keys(currentEquityRiskPremium).forEach((key) => {
      currentEquityRiskPremium[key] = convertToPercent(
        currentEquityRiskPremium[key],
      );
    });

    return currentEquityRiskPremium;
  },
);

export default selectCurrentEquityRiskPremium;
