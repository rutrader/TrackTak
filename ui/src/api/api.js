import { axios } from "@tracktak/intrinsic-valuations";

export const getFundamentals = async (ticker, params) => {
  return axios.get(`/api/v1/fundamentals/${ticker}`, params);
};

export const getExchangeRate = async (baseCurrency, quoteCurrency, params) => {
  return axios.get(`/api/v1/exchange-rate/${baseCurrency}/${quoteCurrency}`, {
    params,
  });
};

export const getPrices = async (ticker, params) => {
  return axios.get(`/api/v1/prices/${ticker}`, {
    params,
  });
};

export const getGovernmentBond = async (code, params) => {
  return axios.get(`/api/v1/government-bond/${code}`, {
    params,
  });
};

export const getAutocompleteQuery = async (query, params) => {
  return axios.get(`/api/v1/autocomplete-query/${query}`, {
    params,
  });
};
