require("dotenv/config");

const fs = require("fs");
const { exit } = require("process");
const {
  getExchangeSymbolList,
  getEURBaseExchangeRate,
} = require("../../node/src/api");
const dayjs = require("dayjs");

const writeECBExchangePairsToJSON = async () => {
  try {
    const eurBaseExchangeRatePairs = {};
    const monies = await getExchangeSymbolList("MONEY");
    const exchangeRatePairs = monies.filter(({ Code }) =>
      Code.includes("ECBEUR"),
    );

    for (const { Code: code } of exchangeRatePairs) {
      const exchangeRates = await getEURBaseExchangeRate(code);
      const quoteCurrencyCode = code.split("ECBEUR")[1];

      eurBaseExchangeRatePairs[quoteCurrencyCode] = {};

      for (let index = 0; index < exchangeRates.length; index++) {
        const { date, close } = exchangeRates[index];

        if (index > 0) {
          // Fill in the missing days such as weekends, holidays etc
          const previousDate = dayjs(exchangeRates[index - 1].date);
          const diffInDays = previousDate.diff(date, "day");

          if (diffInDays > 1) {
            for (let index = 1; index < diffInDays; index++) {
              const newDate = dayjs(date)
                .add(index, "day")
                .format("YYYY-MM-DD");

              eurBaseExchangeRatePairs[quoteCurrencyCode][newDate] = close;
            }
          }
        }

        eurBaseExchangeRatePairs[quoteCurrencyCode][date] = close;
      }

      console.log(eurBaseExchangeRatePairs[quoteCurrencyCode]);
    }

    fs.writeFileSync(
      `${__dirname}/../data/eurBaseExchangeRatePairs.json`,
      JSON.stringify(eurBaseExchangeRatePairs),
    );

    exit();
  } catch (error) {
    console.error(error);
  }
};

writeECBExchangePairsToJSON();
