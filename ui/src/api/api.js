import axios from "../../../packages/intrinsic-valuations/src/api/axios";

export const getFinancialData = async (id) => {
  return axios.get(`/api/v1/financial-data/${id}`);
};

export const createFinancialData = async (
  financialData,
  accessToken,
  spreadsheetId,
) => {
  return axios.post(
    `/api/v1/financial-data/`,
    { financialData, spreadsheetId },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
};

export const createSpreadsheet = async (spreadsheet, accessToken) => {
  return axios.post("/api/v1/spreadsheets", spreadsheet, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const saveSpreadsheet = async (spreadsheet, accessToken) => {
  return axios.put("/api/v1/spreadsheets", spreadsheet, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getSpreadsheets = async (accessToken) => {
  return axios.get("/api/v1/spreadsheets", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getSpreadsheet = async (id, accessToken) => {
  return axios.get(`/api/v1/spreadsheets/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const deleteSpreadsheet = async (id, accessToken) => {
  return axios.delete(`/api/v1/spreadsheets/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
