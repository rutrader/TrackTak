import equityRiskPremiumCountriesJson from "../data/equityRiskPremiumCountries.json";
import getCountryFromCountryISO from "./getCountryFromCountryISO";

const convertToPercent = (value) => parseFloat(value) / 100;

const getCurrentEquityRiskPremium = (fundamentals) => {
  const {
    corporateTaxRate: marginalTaxRate,
    countryRiskPremium,
    equityRiskPremium,
    adjDefaultSpread,
  } = equityRiskPremiumCountriesJson.find((datum) => {
    const country = datum.country.toUpperCase();

    return (
      country ===
      getCountryFromCountryISO(
        fundamentals.general.countryISO.toUpperCase(),
      ).toUpperCase()
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
};

export default getCurrentEquityRiskPremium;
