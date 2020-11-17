const axios = require("axios");
const { response } = require("express");
const baseUrl = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2";
const headers = {
  "x-rapidapi-key": process.env.YAHOO_FINANCE_API_KEY,
  "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
};

const api = {
  getFinancials: async (params) => {
    const res = await axios.get(`${baseUrl}/get-financials`, {
      params,
      headers,
    });
    return res;
  },
};

module.exports = api;
