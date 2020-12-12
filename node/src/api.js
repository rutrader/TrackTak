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

const api = {
  getFundamentals: async ({ ticker, ...params }) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${fundamentalsUrl}/${ticker}`, {
          params: {
            ...globalParams,
            ...params,
          },
        });

        return data;
      },
      "fund",
      { ticker }
    );

    return data;
  },
  getGovernmentBondLastClose: async ({ countryCode, year = 10, ...params }) => {
    const countryAndYearGBond = `${countryCode}${year}Y.GBOND`;
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${eodUrl}/${countryAndYearGBond}`, {
          params: {
            ...globalParams,
            ...params,
            fmt: "json",
            filter: "last_close",
          },
        });

        return data;
      },
      "bond",
      { countryAndYearGBond }
    );

    return data;
  },
  // Base currency is always EUR
  getExchangeRateHistory: async ({
    baseCurrency,
    quoteCurrency,
    from,
    ...params
  }) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(
          `${eodUrl}/${baseCurrency}${quoteCurrency}.FOREX`,
          {
            params: {
              ...globalParams,
              ...params,
              from,
              order: "d",
              period: "m",
              fmt: "json",
            },
          }
        );

        const newData = {};

        data.forEach((exchangeObject) => {
          const dateKeyWithoutDay = exchangeObject.date.slice(0, -3);

          data[dateKeyWithoutDay] = {
            ...exchangeObject,
          };
        });

        return {
          data: newData,
        };
      },
      "exchangeRateHistory",
      { baseCurrency, quoteCurrency, from }
    );

    return data;
  },
  getListOfExchanges: async (params) => {
    const data = await sendReqOrGetCachedData(async () => {
      const { data } = await axios.get(`${exchangesUrl}`, {
        params: {
          ...globalParams,
          ...params,
        },
      });

      return { data };
    }, "listOfExchanges");

    return data;
  },

  getAutocompleteQuery: async ({ queryString, ...params }) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${searchUrl}/${queryString}`, {
          params: {
            ...globalParams,
            ...params,
          },
        });

        return data;
      },
      "autocompleteQuery",
      { queryString }
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
        const res = await contentful.getEntry(id, query);

        return res;
      },
      "contentfulEntry",
      { id, query }
    );
    return data;
  },
};

module.exports = api;
