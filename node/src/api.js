const axios = require("axios");
const cache = require("memory-cache");
const equityRiskPremiumCountries = require("./data/equityRiskPremiumCountries.json");
const equityRiskPremiumRegions = require("./data/equityRiskPremiumRegions.json");
const industryAverage = require("./data/industryAverages.json");
const mockFundamentalsData = require("./mockFundamentalsData.jsx");
const mockUS10YearGovernmentBondData = require("./mockUS10YearGovernmentBondData.jsx");

const baseUrl = "https://eodhistoricaldata.com/api";
const fundamentalsUrl = `${baseUrl}/fundamentals`;
const eodUrl = `${baseUrl}/eod`;
const globalParams = {
  api_token: process.env.EOD_HISTORICAL_DATA_API_KEY,
};

const convertCommaSeperatedStringToArrayOfObjects = (commaSeperatedString) => {
  let arrayObjects = [];
  const cells = commaSeperatedString
    .split("\n")
    .map((x) => x.split(","))
    .reverse();

  const propertyKeys = cells.pop();

  cells.forEach((cellArray) => {
    if (cellArray.length === 7) {
      let objectFormat = {};
      cellArray.forEach((value, cellIndex) => {
        objectFormat = {
          ...objectFormat,
          [propertyKeys[cellIndex]]: value,
        };
      });
      arrayObjects.push(objectFormat);
    }
  });

  return arrayObjects;
};

const api = {
  getFundamentals: async ({ ticker, ...params }) => {
    return mockFundamentalsData;
    // const cachedData = cache.get(ticker);

    // if (cachedData) return cachedData;

    // try {
    //   const res = await axios.get(`${fundamentalsUrl}/${ticker}`, {
    //     params: {
    //       ...globalParams,
    //       ...params,
    //     },
    //   });

    //   cache.put(ticker, res.data);

    //   return res.data;
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  },
  getEquityRiskPremiumCountries: () => {
    return equityRiskPremiumCountries;
  },
  getEquityRiskPremiumRegions: () => {
    return equityRiskPremiumRegions;
  },
  getIndustryAverages: () => {
    return industryAverage;
  },
  getGovernmentBonds: async ({ ticker, ...params }) => {
    // const res = await axios.get(`${eodUrl}/${ticker}`, {
    //   params: {
    //     ...globalParams,
    //     ...params,
    //   },
    // });
    // return res.data;

    return convertCommaSeperatedStringToArrayOfObjects(
      mockUS10YearGovernmentBondData
    );
  },
};

module.exports = api;
