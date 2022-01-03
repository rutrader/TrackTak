import axios from './axios'

const errorResponseHandler = error => {
  if (
    Object.prototype.hasOwnProperty.call(error.config, 'errorHandle') &&
    error.config.errorHandle === false
  ) {
    return Promise.reject(error)
  }
}

axios.interceptors.response.use(response => response, errorResponseHandler)

const getAuthHeaders = accessToken => {
  return { Authorization: `Bearer ${accessToken}` }
}

export const getEODHistoricalDataFundamentals = async (ticker, params) => {
  return axios.get(
    `/api/v1/securities/eod-historical-data/fundamentals/${ticker}`,
    {
      params
    }
  )
}

export const getCompanyFinancials = async (ticker, params) => {
  return axios.get(`/api/v1/securities/stocks/financials/${ticker}`, {
    params
  })
}

export const getCompanyOutstandingShares = async (ticker, params) => {
  return axios.get(`/api/v1/securities/stocks/outstanding-shares/${ticker}`, {
    params
  })
}

export const getCompanyPrices = async (ticker, params) => {
  return axios.get(`/api/v1/securities/stocks/prices/${ticker}`, {
    params
  })
}

export const getCompanyRatios = async (ticker, params) => {
  return axios.get(`/api/v1/securities/stocks/ratios/${ticker}`, {
    params
  })
}

export const getIndustryAverages = async (type, params) => {
  return axios.get(`/api/v1/securities/stocks/industry-averages/${type}`, {
    params
  })
}

export const getCompanyIndustryAverage = async (ticker, params) => {
  return axios.get(
    `/api/v1/securities/stocks/industry-averages/company/${ticker}`,
    {
      params
    }
  )
}

export const getCreditRatingInterestSpreads = async params => {
  return axios.get(`/api/v1/market/credit-rating-interest-spreads`, {
    params
  })
}

export const getEquityRiskPremiums = async params => {
  return axios.get(`/api/v1/market/equity-risk-premiums`, {
    params
  })
}

export const getCountryEquityRiskPremium = async (countryISO, params) => {
  return axios.get(`/api/v1/market/equity-risk-premiums/${countryISO}`, {
    params
  })
}

export const getGovernmentBond = async (countryISO, params) => {
  return axios.get(`/api/v1/securities/bonds/government/${countryISO}`, {
    params
  })
}

export const getExchangeRate = async (baseCurrency, quoteCurrency, params) => {
  return axios.get(
    `/api/v1/securities/fx/exchange-rates/${baseCurrency}/${quoteCurrency}`,
    {
      params
    }
  )
}

export const getSecuritiesAutocomplete = async (query, params) => {
  return axios.get(`/api/v1/securities/autocomplete/${query}`, {
    params
  })
}

export const createFinancialData = async (
  financialData,
  accessToken,
  spreadsheetId
) => {
  return axios.post(
    '/api/v1/user/financial-data',
    { financialData, spreadsheetId },
    {
      headers: getAuthHeaders(accessToken)
    }
  )
}

export const getFinancialData = async (id, accessToken, params) => {
  return axios.get(`/api/v1/user/financial-data/${id}`, {
    headers: getAuthHeaders(accessToken),
    params
  })
}

export const getSpreadsheetTemplate = async (name, params) => {
  return axios.get(`/api/v1/spreadsheet-templates/${name}`, {
    params
  })
}

export const getSpreadsheetsMetadata = async accessToken => {
  return axios.get('/api/v1/user/spreadsheets/metadata', {
    headers: getAuthHeaders(accessToken)
  })
}

export const createSpreadsheet = async (spreadsheet, accessToken) => {
  return axios.post('/api/v1/user/spreadsheets', spreadsheet, {
    headers: getAuthHeaders(accessToken)
  })
}

export const saveSpreadsheet = async (spreadsheet, accessToken) => {
  return axios.put('/api/v1/user/spreadsheets', spreadsheet, {
    headers: getAuthHeaders(accessToken)
  })
}

export const getSpreadsheet = async (id, accessToken) => {
  return axios.get(`/api/v1/user/spreadsheets/${id}`, {
    headers: getAuthHeaders(accessToken)
  })
}

export const deleteSpreadsheet = async (id, accessToken) => {
  return axios.delete(`/api/v1/user/spreadsheets/${id}`, {
    headers: getAuthHeaders(accessToken)
  })
}

export const createUserPortalSession = async accessToken => {
  return axios.post('/api/v1/user/plan/portal-session', undefined, {
    headers: getAuthHeaders(accessToken)
  })
}

export const createUserPlan = async (lineItems, accessToken) => {
  return axios.post(
    '/api/v1/user/plan',
    {
      lineItems
    },
    {
      headers: getAuthHeaders(accessToken)
    }
  )
}

export const getCurrentPlan = async accessToken => {
  return axios.get('/api/v1/user/plan', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
}

export const updateCurrentPlan = async (accessToken, planUpdates) => {
  return axios.put('/api/v1/user/plan', planUpdates, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
}

export const getPlanPrice = async (id, accessToken) => {
  return axios.get(`/api/v1/plans/prices/${id}`, {
    headers: getAuthHeaders(accessToken)
  })
}
