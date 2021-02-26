/* eslint-disable node/no-unpublished-require */
const axios = require("axios");
const fs = require("fs");

const apiToken = "";

const writeBulkFundamentalsDataToJSON = async () => {
  try {
    const { data } = await axios.get(
      `https://eodhistoricaldata.com/api/exchanges-list?api_token=${apiToken}&fmt=json`,
    );

    const excludedExchanges = [
      "BOND",
      "US",
      "IS",
      "MONEY",
      "GBOND",
      "EUFUND",
      "INDX",
      "CC",
      "COMM",
      "FOREX",
    ];
    const jsons = fs.readdirSync("./ui/fundamentalsData");
    const exchanges = data
      .map((x) => x.Code)
      // US not supported
      .filter((x) => excludedExchanges.every((z) => z !== x))
      .concat(["NYSE", "NASDAQ", "BATS", "AMEX"])
      .filter((x) => jsons.every((jsonName) => !jsonName.includes(x)));

    // exchanges.forEach(async (exchange) => {
    //   let i = 0;
    //   // API limits to 1000 requests each time
    //   const limit = 500;
    //   let bulkData = [];
    //   let res;

    //   do {
    //     console.log(exchange);
    //     console.log("iteration " + i);

    //     const offset = i * limit;

    //     try {
    //       res = await axios.get(
    //         `https://eodhistoricaldata.com/api/bulk-fundamentals/${exchange}?api_token=${apiToken}&fmt=json&offset=${offset}&limit=${limit}`,
    //         { timeout: 1000000000 },
    //       );
    //     } catch (error) {
    //       console.error(error);
    //       console.log("FAILED: " + exchange);
    //     }
    //     i += 1;

    //     Object.values(res.data).forEach((datum) => {
    //       bulkData.push(datum);
    //     });
    //   } while (Object.keys(res.data).length);

    //   fs.writeFileSync(
    //     `./ui/fundamentalsData/${exchange}.json`,
    //     JSON.stringify(bulkData),
    //   );
    // });
  } catch (error) {
    console.error(error);
  }
};

writeBulkFundamentalsDataToJSON();
