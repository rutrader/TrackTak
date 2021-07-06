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

export const saveValuation = async (valuation, accessToken) => {
  return axios.put('/api/v1/valuation', valuation, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
}

export const getValuations = async (accessToken) => {
  return axios.get('/api/v1/valuation', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
}

export const deleteValuation = async (id, accessToken) => {
  return axios.delete(`/api/v1/valuation/${id}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
}
