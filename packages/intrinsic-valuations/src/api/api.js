import axios from "./axios";
import baseAxios from "axios";

let sensitivtyAnalysisSource;

export const computeSensitivityAnalysis = async (
  sheetsSerializedValues,
  existingScope,
  currentScopes,
) => {
  if (sensitivtyAnalysisSource) {
    sensitivtyAnalysisSource.cancel("New request sent.");
  }

  sensitivtyAnalysisSource = baseAxios.CancelToken.source();

  const res = await axios.post(
    `/api/v1/compute-sensitivity-analysis`,
    {
      sheetsSerializedValues,
      existingScope,
      currentScopes,
    },
    {
      cancelToken: sensitivtyAnalysisSource && sensitivtyAnalysisSource.token,
    },
  );

  sensitivtyAnalysisSource = null;

  return res;
};

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
