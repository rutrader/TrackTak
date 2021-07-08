import { axios } from "@tracktak/intrinsic-valuations";

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
