import equityRiskPremiumCountriesJson from "../data/equityRiskPremiumCountries.json";

const matureMarketEquityRiskPremium =
  parseFloat(
    equityRiskPremiumCountriesJson.find((x) => x.country === "United States")
      .equityRiskPremium
  ) / 100;

export default matureMarketEquityRiskPremium;
