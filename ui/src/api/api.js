import axios from "../../../packages/intrinsic-valuations/src/api/axios";
import { navigate } from "gatsby";

const errorResponseHandler = (error) => {
  if (
    error.config.hasOwnProperty("errorHandle") &&
    error.config.errorHandle === false
  ) {
    return Promise.reject(error);
  }

  if (error.response.data === "PLAN_EXPIRED") {
    navigate("/pricing/");
  }
};

axios.interceptors.response.use((response) => response, errorResponseHandler);

const getAuthHeaders = (accessToken) => {
  return { Authorization: `Bearer ${accessToken}` };
};

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
      headers: getAuthHeaders(accessToken),
    },
  );
};

export const createSpreadsheet = async (spreadsheet, accessToken) => {
  return axios.post("/api/v1/spreadsheets", spreadsheet, {
    headers: getAuthHeaders(accessToken),
  });
};

export const saveSpreadsheet = async (spreadsheet, accessToken) => {
  return axios.put("/api/v1/spreadsheets", spreadsheet, {
    headers: getAuthHeaders(accessToken),
  });
};

export const getSpreadsheets = async (accessToken) => {
  return axios.get("/api/v1/spreadsheets", {
    headers: getAuthHeaders(accessToken),
  });
};

export const getSpreadsheet = async (id, accessToken) => {
  return axios.get(`/api/v1/spreadsheets/${id}`, {
    headers: getAuthHeaders(accessToken),
  });
};

export const deleteSpreadsheet = async (id, accessToken) => {
  return axios.delete(`/api/v1/spreadsheets/${id}`, {
    headers: getAuthHeaders(accessToken),
  });
};

export const createCheckoutSession = async (lineItems, accessToken) => {
  return axios.post(
    "/api/v1/create-checkout-session",
    {
      lineItems,
    },
    {
      headers: getAuthHeaders(accessToken),
    },
  );
};

export const getPrice = async (id, accessToken) => {
  return axios.get(`/v1/prices/${id}`, {
    headers: getAuthHeaders(accessToken),
  });
};

export const getCurrentPlan = async (accessToken) => {
  return axios.get(`/api/v1/current-plan`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
