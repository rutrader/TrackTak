/* eslint-disable node/no-unpublished-require */
const axios = require("axios");
const fs = require("fs");

const writeBulkDataToJSON = async () => {
  try {
    const { data } = await axios.get(
      "https://eodhistoricaldata.com/api/exchanges-list?api_token=&fmt=json"
    );
    const jsons = fs.readdirSync("./data");
    const exchanges = data
      .map((x) => x.Code)
      .filter((x) => jsons.every((jsonName) => !jsonName.includes(x)));

    exchanges.forEach(async (exchange) => {
      const { data } = await axios.get(
        `https://eodhistoricaldata.com/api/eod-bulk-last-day/${exchange}?api_token=&fmt=json`
      );

      fs.writeFileSync(`./data/${exchange}.json`, JSON.stringify(data));
    });
  } catch (error) {
    console.error(error);
  }
};

writeBulkDataToJSON();
