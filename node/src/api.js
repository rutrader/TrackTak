const axios = require("axios");
const cache = require("memory-cache");
const contentful = require("./contentful");

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
  time = 2.16e7
) => {
  const cacheKey = `${keyPrefix}_${JSON.stringify(cacheParams)}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) return cachedData;
  try {
    const data = await request();
    if (data) {
      return cache.put(cacheKey, data, time);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const assignNestedObject = (obj, keyPath, value) => {
  const lastKeyIndex = keyPath.length - 1;

  for (var i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i];

    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
};

const replaceDoubleColonWithObject = (data) => {
  const newData = {};

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const splits = key.split("::");

    assignNestedObject(newData, splits, value);
  });

  return newData;
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
      { ticker, query }
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
        filter: "last_close",
      },
    });

    return data;
  },
  getGovernmentBondLastClose: async (countryCode, query, year = 10) => {
    const countryAndYearGBond = `${countryCode}${year}Y.GBOND`;
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${eodUrl}/${countryAndYearGBond}`, {
          params: {
            ...globalParams,
            ...query,
            fmt: "json",
            filter: "last_close",
          },
        });

        return data;
      },
      "bond",
      { countryAndYearGBond, query }
    );

    return data;
  },
  // Base currency is always EUR
  getExchangeRateHistory: async (baseCurrency, quoteCurrency, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(
          `${eodUrl}/${baseCurrency}${quoteCurrency}.FOREX`,
          {
            params: {
              ...globalParams,
              ...query,
              order: "d",
              period: "m",
              fmt: "json",
            },
          }
        );

        const newData = {};

        data.forEach((exchangeObject) => {
          const dateKeyWithoutDay = exchangeObject.date.slice(0, -3);

          newData[dateKeyWithoutDay] = {
            ...exchangeObject,
          };
        });

        return newData;
      },
      "exchangeRateHistory",
      { baseCurrency, quoteCurrency, query }
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
      { query }
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
      { queryString, query }
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
      { query }
    );
    return data;
  },
  getContentfulEntry: async (id, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const data = await contentful.getEntry(id, query);

        return {
          ...data,
          fields: {
            ...data.fields,
            data: replaceDoubleColonWithObject(data.fields.data),
          },
        };
      },
      "contentfulEntry",
      { id, query }
    );

    return data;
  },
};

module.exports = api;
