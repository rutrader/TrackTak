import axios from './axios'

const errorResponseHandler = error => {
  if (
    error.config.hasOwnProperty('errorHandle') &&
    error.config.errorHandle === false
  ) {
    return Promise.reject(error)
  }
}

axios.interceptors.response.use(response => response, errorResponseHandler)

const getAuthHeaders = accessToken => {
  return { Authorization: `Bearer ${accessToken}` }
}
export const getFundamentals = async (ticker, params) => {
  return axios.get(`/api/v1/fundamentals/${ticker}`, {
    params
  })
}

export const getExchangeRate = async (baseCurrency, quoteCurrency, params) => {
  return axios.get(`/api/v1/exchange-rate/${baseCurrency}/${quoteCurrency}`, {
    params
  })
}

export const getPrices = async (ticker, params) => {
  return axios.get(`/api/v1/prices/${ticker}`, {
    params
  })
}

export const getGovernmentBond = async (code, params) => {
  return axios.get(`/api/v1/government-bond/${code}`, {
    params
  })
}

export const getAutocompleteQuery = async (query, params) => {
  return axios.get(`/api/v1/autocomplete-query/${query}`, {
    params
  })
}

export const getFinancialData = async id => {
  return axios.get(`/api/v1/financial-data/${id}`)
}

export const createFinancialData = async (
  financialData,
  accessToken,
  spreadsheetId
) => {
  return axios.post(
    `/api/v1/financial-data/`,
    { financialData, spreadsheetId },
    {
      headers: getAuthHeaders(accessToken)
    }
  )
}

export const getFolders = async accessToken => {
  return axios.get('/api/v1/folders', {
    headers: getAuthHeaders(accessToken)
  })
}

export const createFolder = async (name, accessToken) => {
  return axios.post(
    '/api/v1/folder',
    { name },
    {
      headers: getAuthHeaders(accessToken)
    }
  )
}

export const updateFolder = async (id, name, accessToken) => {
  return axios.put(
    `/api/v1/folder/${id}`,
    { name },
    {
      headers: getAuthHeaders(accessToken)
    }
  )
}

export const updateSpreadsheetFolder = async (id, folderId, accessToken) => {
  return axios.put(
    `/api/v1/spreadsheet/${id}`,
    {
      folderId
    },
    {
      headers: getAuthHeaders(accessToken)
    }
  )
}

export const deleteFolder = async (id, accessToken) => {
  return axios.delete(`/api/v1/folder/${id}`, {
    headers: getAuthHeaders(accessToken)
  })
}

export const createSpreadsheet = async (spreadsheet, folderId, accessToken) => {
  return axios.post(
    '/api/v1/spreadsheets',
    {
      ...spreadsheet,
      folderId
    },
    {
      headers: getAuthHeaders(accessToken)
    }
  )
}

export const saveSpreadsheet = async (spreadsheet, accessToken) => {
  return axios.put('/api/v1/spreadsheets', spreadsheet, {
    headers: getAuthHeaders(accessToken)
  })
}

export const getSpreadsheetsMetadata = async accessToken => {
  return axios.get('/api/v1/spreadsheets/metadata', {
    headers: getAuthHeaders(accessToken)
  })
}

export const getSpreadsheet = async (id, accessToken) => {
  return axios.get(`/api/v1/spreadsheets/${id}`, {
    headers: getAuthHeaders(accessToken)
  })
}

export const deleteSpreadsheet = async (id, accessToken) => {
  return axios.delete(`/api/v1/spreadsheets/${id}`, {
    headers: getAuthHeaders(accessToken)
  })
}

export const createCheckoutSession = async (lineItems, accessToken) => {
  return axios.post(
    '/api/v1/create-checkout-session',
    {
      lineItems
    },
    {
      headers: getAuthHeaders(accessToken)
    }
  )
}

export const createCustomerPortal = async accessToken => {
  return axios.post('/api/v1/create-customer-portal-session', undefined, {
    headers: getAuthHeaders(accessToken)
  })
}

export const getPrice = async (id, accessToken) => {
  return axios.get(`/v1/prices/${id}`, {
    headers: getAuthHeaders(accessToken)
  })
}

export const getCurrentPlan = async accessToken => {
  return axios.get(`/api/v1/current-plan`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
}

export const updateCurrentPlan = async (accessToken, planUpdates) => {
  return axios.put(`/api/v1/current-plan`, planUpdates, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
}
