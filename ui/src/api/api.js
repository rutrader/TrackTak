import axios from "./axios";

export const fundamentalsFilter =
  "General,Highlights,SharesStats,Financials::Balance_Sheet,Financials::Income_Statement";

export const getFundamentals = async (ticker, params) => {
  return axios.get(`/api/v1/fundamentals/${ticker}}`, params);
};

export const getExchangeRate = async (baseCurrency, quoteCurrency, params) => {
  return axios.get(`/api/v1/exchange-rate/${baseCurrency}/${quoteCurrency}}`, {
    params,
  });
};

export const getPrices = async (ticker, params) => {
  return axios.get(`/api/v1/prices/${ticker}`, {
    params,
  });
};

export const getGovernmentBond = async (countryISO, year, params) => {
  return axios.get(`/api/v1/government-bond/${countryISO}/${year}`, {
    params,
  });
};

export const getContentfulEntries = async (params) => {
  return axios.get(`/api/v1/contentful/getEntries`, params);
};
