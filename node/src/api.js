import axios from "axios";
import cache from "memory-cache";
import replaceDoubleColonWithObject from "./replaceDoubleColonWithObject";
import tenYearGovernmentBondYields from "../data/tenYearGovernmentBondYields.json";
import iso3311a2 from "iso-3166-1-alpha-2";
import { wrap } from "comlink";
import nodeEndpoint from "comlink/dist/esm/node-adapter";
import { Worker } from "worker_threads";
import { URL } from "url";

const baseUrl = "https://eodhistoricaldata.com/api";
const fundamentalsUrl = `${baseUrl}/fundamentals`;
const exchangesListUrl = `${baseUrl}/exchanges-list`;
const eodUrl = `${baseUrl}/eod`;
const searchUrl = `${baseUrl}/search`;
const exchangeSymbolListUrl = `${baseUrl}/exchange-symbol-list`;
const bulkFundamentalsUrl = `${baseUrl}/bulk-fundamentals`;

const globalParams = {
  api_token: process.env.EOD_HISTORICAL_DATA_API_KEY,
};

// 6 hour
const setCachedData = (data, cacheKey, time = 2.16e7) => {
  if (data) {
    return cache.put(cacheKey, data, time);
  }
  return data;
};

const getCachedData = (cacheKey) => {
  const cachedData = cache.get(cacheKey);

  if (cachedData) return cachedData;

  return null;
};

const sendReqOrGetCachedData = async (
  request,
  keyPrefix,
  cacheParams = {},
  time = 2.16e7,
) => {
  const cacheKey = `${keyPrefix}_${JSON.stringify(cacheParams)}`;
  const cachedData = getCachedData(keyPrefix, cacheParams);

  if (cachedData) return cachedData;

  const data = await request();

  return setCachedData(data, cacheKey, time);
};

const api = {
  getBulkFundamentals: async (exchange, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${bulkFundamentalsUrl}/${exchange}`, {
          params: {
            ...globalParams,
            ...query,
            fmt: "json",
          },
        });

        return data;
      },
      "bulkFundamentals",
      { exchange, query },
    );

    return data;
  },
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
      "fundamnetals",
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
  getExchangeSymbolList: async (code, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${exchangeSymbolListUrl}/${code}`, {
          params: {
            ...globalParams,
            ...query,
            fmt: "json",
          },
        });

        return data;
      },
      "exchangeSymbolList",
      { code, query },
    );

    return data;
  },
  getGovernmentBond: async (code, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        try {
          const { data } = await axios.get(`${eodUrl}/${code}.GBOND`, {
            params: {
              ...globalParams,
              ...query,
              fmt: "json",
            },
          });

          return data;
        } catch (error) {
          // API doesn't yet provide a lot of country government bonds
          if (error.response.status === 404) {
            const splits = code.split("10Y");

            if (splits[0]) {
              const country = iso3311a2
                .getCountry(splits[0].toUpperCase())
                .toUpperCase();
              const tenYearGovernmentBondYield = tenYearGovernmentBondYields.find(
                (x) => x.country.toUpperCase() === country,
              ).yield;

              return tenYearGovernmentBondYield;
            }
          }
          throw error;
        }
      },
      "governmentBond",
      { code, query },
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
  getEURBaseExchangeRate: async (code, query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${eodUrl}/${code}.MONEY`, {
          params: {
            ...globalParams,
            ...query,
            order: "d",
            fmt: "json",
          },
        });

        return data;
      },
      "eurBaseExchangeRate",
      { code, query },
    );

    return data;
  },
  getListOfExchanges: async (query) => {
    const data = await sendReqOrGetCachedData(
      async () => {
        const { data } = await axios.get(`${exchangesListUrl}`, {
          params: {
            ...globalParams,
            ...query,
          },
        });

        return data;
      },
      "listOfExchanges",
      { query },
    );

    return data;
  },

  getAutocompleteQuery: async (queryString, query) => {
    console.log(globalParams);

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

  async calculateDCFModel(cells, existingScope, currentScope) {
    const models = await this.calculateDCFModels(cells, existingScope, [
      currentScope,
    ]);

    return models[0];
  },

  calculateDCFModels: async (cells, existingScope, currentScopes) => {
    const worker = new Worker(
      new URL("./workers/dcfModels.worker.js", import.meta.url),
      {
        type: "module",
      },
    );

    const api = wrap(nodeEndpoint(worker));

    const models = await api.calculateDCFModels(
      cells,
      existingScope,
      currentScopes,
    );

    worker.terminate();

    return models;
  },
};

export default api;
