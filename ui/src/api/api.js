import { axios } from "@tracktak/intrinsic-valuations";

export const saveSpreadsheet = async (spreadsheet, accessToken) => {
  return axios.put("/api/v1/spreadsheet", spreadsheet, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getSpreadsheets = async (accessToken) => {
  return axios.get("/api/v1/spreadsheet", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getSpreadsheet = async (accessToken, id) => {
  return axios.get(`/api/v1/spreadsheet/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const deleteSpreadsheet = async (id, accessToken) => {
  return axios.delete(`/api/v1/spreadsheet/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
