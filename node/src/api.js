const axios = require("axios");
const baseUrl = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2";
const headers = {
  "x-rapidapi-key": process.env.YAHOO_FINANCE_API_KEY,
  "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
};

const api = {
  getFinancials: async (params) => {
    let res;
    try {
      res = await axios.get(`${baseUrl}/get-financials`, {
        params,
        headers,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
    return res;
  },
};

module.exports = api;
