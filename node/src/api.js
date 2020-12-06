const axios = require("axios");
const cache = require("memory-cache");
const equityRiskPremiumCountries = require("./data/equityRiskPremiumCountries.json");
const equityRiskPremiumRegions = require("./data/equityRiskPremiumRegions.json");
const industryAverage = require("./data/industryAverages.json");

const baseUrl = "https://eodhistoricaldata.com/api";
const fundamentalsUrl = `${baseUrl}/fundamentals`;
const exchangesUrl = `${baseUrl}/exchanges-list`;
const eodUrl = `${baseUrl}/eod`;
const searchUrl = `${baseUrl}/search`;
const globalParams = {
  api_token: process.env.EOD_HISTORICAL_DATA_API_KEY,
};

// 6 hour
const sendReqOrGetCachedData = async (cacheKey, request, time = 2.16e7) => {
  const cachedData = cache.get(cacheKey);

  if (cachedData) return cachedData;
  try {
    const res = await request();
    if (res.data) {
      return cache.put(cacheKey, res.data, time);
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const api = {
  getFundamentals: async ({ ticker, ...params }) => {
    const data = await sendReqOrGetCachedData(`fund_${ticker}`, async () => {
      const res = await axios.get(`${fundamentalsUrl}/${ticker}`, {
        params: {
          ...globalParams,
          ...params,
        },
      });

      return res;
    });

    return data;
  },
  getEquityRiskPremiumCountries: () => {
    return equityRiskPremiumCountries;
  },
  getEquityRiskPremiumRegions: () => {
    return equityRiskPremiumRegions;
  },
  getIndustryAverages: () => {
    return industryAverage;
  },
  getGovernmentBondLastClose: async ({ countryCode, year = 10, ...params }) => {
    const countryAndYearGBond = `${countryCode}${year}Y.GBOND`;
    const data = await sendReqOrGetCachedData(
      `bond_${countryAndYearGBond}`,
      async () => {
        const res = await axios.get(`${eodUrl}/${countryAndYearGBond}`, {
          params: {
            ...globalParams,
            ...params,
            fmt: "json",
            filter: "last_close",
          },
        });

        return res;
      }
    );

    return data;
  },
  // Base currency is always EUR
  getExchangeRateLastClose: async ({ quoteCurrency, ...params }) => {
    const data = await sendReqOrGetCachedData(
      `exchangeRate_${quoteCurrency}`,
      async () => {
        const res = await axios.get(`${eodUrl}/ECBEUR${quoteCurrency}.MONEY`, {
          params: {
            ...globalParams,
            ...params,
            fmt: "json",
            filter: "last_close",
          },
        });

        return res;
      }
    );

    return data;
  },
  getListOfExchanges: async (params) => {
    const data = await sendReqOrGetCachedData("listOfExchanges", async () => {
      const res = await axios.get(`${exchangesUrl}`, {
        params: {
          ...globalParams,
          ...params,
        },
      });

      return res;
    });

    return data;
  },

  getAutocompleteQuery: async ({ queryString, ...params }) => {
    const data = await sendReqOrGetCachedData(
      `query_${queryString}`,
      async () => {
        const res = await axios.get(`${searchUrl}/${queryString}`, {
          params: {
            ...globalParams,
            ...params,
          },
        });

        return res;
      }
    );
    return data;
  },
};

module.exports = api;
