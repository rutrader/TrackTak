const axios = require("axios");
const cache = require("memory-cache");
const equityRiskPremiumCountries = require("./data/equityRiskPremiumCountries.json");
const equityRiskPremiumRegions = require("./data/equityRiskPremiumRegions.json");

const baseUrl = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2";
const headers = {
  "x-rapidapi-key": process.env.YAHOO_FINANCE_API_KEY,
  "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
};

const api = {
  getFinancials: async (params) => {
    const cachedData = cache.get(params.symbol);

    if (cachedData) return cachedData;

    try {
      const res = await axios.get(`${baseUrl}/get-financials`, {
        params,
        headers,
      });

      cache.put(params.symbol, res.data);

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getEquityRiskPremiumCountries: () => {
    return equityRiskPremiumCountries;
  },
  getEquityRiskPremiumRegions: () => {
    return equityRiskPremiumRegions;
  },
};

module.exports = api;
