require("dotenv/config");

const fs = require("fs");
const {
  getListOfExchanges,
  getBulkFundamentals,
} = require("../../node/src/api");

const fundamentalsDataDir = `${__dirname}/../data/fundamentalsData`;

const writeBulkFundamentalsDataToJSON = async () => {
  try {
    const exchangeList = await getListOfExchanges();
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
    const jsons = fs.readdirSync(fundamentalsDataDir);
    const exchanges = exchangeList
      .map((x) => x.Code)
      // US not supported
      .filter((x) => excludedExchanges.every((z) => z !== x))
      .concat(["NYSE", "NASDAQ", "BATS", "AMEX"])
      .filter((x) => jsons.every((jsonName) => !jsonName.includes(x)));

    exchanges.forEach(async (exchange) => {
      let i = 0;
      // API limits to 1000 requests each time
      const limit = 500;
      let bulkData = [];
      let res;

      do {
        console.log(exchange);
        console.log("iteration " + i);

        const offset = i * limit;

        try {
          res = await getBulkFundamentals(exchange, {
            timeout: Number.MAX_SAFE_INTEGER,
            offset,
            limit,
          });
        } catch (error) {
          console.error(error);
          console.log("FAILED: " + exchange);
        }
        i += 1;

        Object.values(res.data).forEach((datum) => {
          bulkData.push(datum);
        });
      } while (Object.keys(res.data).length);

      fs.writeFileSync(
        `${fundamentalsDataDir}/${exchange}.json`,
        JSON.stringify(bulkData),
      );
    });
  } catch (error) {
    console.error(error);
  }
};

writeBulkFundamentalsDataToJSON();
