const axios = require("axios");
const cache = require("memory-cache");
const contentful = require("./contentful");
const replaceDoubleColonWithObject = require("./replaceDoubleColonWithObject");

const baseUrl = "https://eodhistoricaldata.com/api";
const fundamentalsUrl = `${baseUrl}/fundamentals`;
const exchangesUrl = `${baseUrl}/exchanges-list`;
const eodUrl = `${baseUrl}/eod`;
const searchUrl = `${baseUrl}/search`;
const globalParams = {
  api_token: process.env.EOD_HISTORICAL_DATA_API_KEY,
};

// 6 hour
const sendReqOrGetCachedData = async (
  request,
  keyPrefix,
  cacheParams = {},
  time = 2.16e7,
) => {
  const cacheKey = `${keyPrefix}_${JSON.stringify(cacheParams)}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) return cachedData;

  const data = await request();

  if (data) {
    return cache.put(cacheKey, data, time);
  }
  return data;
};

const api = {
  getFundamentals: async (ticker, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${fundamentalsUrl}/${ticker}`, {
          params: {
            ...globalParams,
            ...query,
          },
        });

        return replaceDoubleColonWithObject(data);
      },
      "fund",
      { ticker, query },
    );

    return data;
  },
  getPrices: async (ticker, query) => {
    // TODO: Cache this and remove the cache every time it updates
    const { data } = await axios.get(`${eodUrl}/${ticker}`, {
      params: {
        ...globalParams,
        ...query,
        fmt: "json",
      },
    });

    return data;
  },
  getGovernmentBond: async (countryCode, year, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(
          `${eodUrl}/${countryCode}${year}Y.GBOND`,
          {
            params: {
              ...globalParams,
              ...query,
              fmt: "json",
            },
          },
        );

        return data;
      },
      "governmentBond",
      { countryCode, year, query },
    );

    return data;
  },
  getExchangeRate: async (baseCurrency, quoteCurrency, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(
          `${eodUrl}/${baseCurrency}${quoteCurrency}.FOREX`,
          {
            params: {
              ...globalParams,
              ...query,
              order: "d",
              fmt: "json",
            },
          },
        );

        if (Array.isArray(data)) {
          const newData = {};

          data.forEach((exchangeObject) => {
            const dateKeyWithoutDay = exchangeObject.date.slice(0, -3);

            newData[dateKeyWithoutDay] = {
              ...exchangeObject,
            };
          });

          return newData;
        }
        return data;
      },
      "exchangeRate",
      { baseCurrency, quoteCurrency, query },
    );

    return data;
  },
  // Base currency is always EUR
  getEURBaseExchangeRate: async (quoteCurrency, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(
          `${eodUrl}/ECBEUR${quoteCurrency}.MONEY`,
          {
            params: {
              ...globalParams,
              ...query,
              order: "d",
              fmt: "json",
            },
          },
        );

        return data;
      },
      "eurBaseExchangeRate",
      { quoteCurrency, query },
    );

    return data;
  },
  getListOfExchanges: async (query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${exchangesUrl}`, {
          params: {
            ...globalParams,
            ...query,
          },
        });

        return { data };
      },
      "listOfExchanges",
      { query },
    );

    return data;
  },

  getAutocompleteQuery: async (queryString, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${searchUrl}/${queryString}`, {
          params: {
            ...globalParams,
            ...query,
          },
        });

        return data;
      },
      "autocompleteQuery",
      { queryString, query },
    );
    return data;
  },
  getContentfulEntries: async (query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const res = await contentful.getEntries(query);

        return res;
      },
      "contentfulEntries",
      { query },
    );
    return data;
  },
  getContentfulEntry: async (id, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const res = await contentful.getEntry(id, query);

        return res;
      },
      "contentfulEntry",
      { id, query },
    );

    return data;
  },
};

module.exports = api;
