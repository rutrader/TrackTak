const axios = require("axios");
const cache = require("memory-cache");
const equityRiskPremiumCountries = require("./data/equityRiskPremiumCountries.json");
const equityRiskPremiumRegions = require("./data/equityRiskPremiumRegions.json");
const mockFundamentalsData = require("./mockFundamentalsData.jsx");

const baseUrl = "https://eodhistoricaldata.com/api";
const fundamentalsUrl = `${baseUrl}/fundamentals`;
const globalParams = {
  api_token: process.env.EOD_HISTORICAL_DATA_API_KEY,
};

const api = {
  getFundamentals: async ({ ticker, ...params }) => {
    return mockFundamentalsData;
    // const cachedData = cache.get(ticker);

    // if (cachedData) return cachedData;

    // try {
    //   const res = await axios.get(`${fundamentalsUrl}/${ticker}`, {
    //     params: {
    //       ...globalParams,
    //       ...params,
    //     },
    //   });

    //   cache.put(ticker, res.data);

    //   return res.data;
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  },
  getEquityRiskPremiumCountries: () => {
    return equityRiskPremiumCountries;
  },
  getEquityRiskPremiumRegions: () => {
    return equityRiskPremiumRegions;
  },
};

module.exports = api;
