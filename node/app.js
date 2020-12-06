require("dotenv").config();

const express = require("express");
const cors = require("cors");
const api = require("./src/api");
const {
  cronEmitter,
  events,
  getListOfExchangesJob,
  getExchangeRatesLastCloseJob,
} = require("./src/scheduler");

const hostname = "127.0.0.1";
const port = process.env.PORT;
const app = express();

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

let currencyCodes;
const exchangeRates = {
  baseCurrency: "EUR",
  exchangeRatesLastCloses: {},
};

const getListOfExchanges = async () => {
  const values = await api.getListOfExchanges();

  const unknownValue = "UNKNOWN";

  currencyCodes = [
    ...new Set(
      values
        .filter((x) => x.Currency.toUpperCase() !== unknownValue)
        .map(({ Currency }) => Currency)
    ),
  ];
};

const getExchangeRatesLastClose = async () => {
  const missingCurrencies = ["PKR", "SAR", "CLP", "VND", "ARS", "PEN", "TWD"];
  const removedCurrencies = [exchangeRates.baseCurrency].concat(
    missingCurrencies
  );
  const quoteCurrencies = currencyCodes.filter(
    (code) => !removedCurrencies.includes(code)
  );
  const failedQuotes = [];

  for (let i = 0; i < quoteCurrencies.length; i++) {
    try {
      const quoteCurrency = quoteCurrencies[i];
      const exchangeRate = await api.getExchangeRateLastClose({
        quoteCurrency,
      });

      exchangeRates.exchangeRatesLastCloses[quoteCurrency] = exchangeRate;
    } catch (error) {
      // TODO: Handle the missing currencies gracefully on the FE
      failedQuotes.push(quoteCurrencies[i]);
      console.error(error);
    }
  }
  if (failedQuotes.length) {
    console.log(
      `failed for these quoteCurrencies: ${JSON.stringify(failedQuotes)}`
    );
  }
};

cronEmitter.on(events.getListOfExchangesJob, getListOfExchanges);
cronEmitter.on(events.getExchangeRatesLastCloseJob, getExchangeRatesLastClose);

(async function () {
  await getListOfExchanges();
  await getExchangeRatesLastClose();

  getListOfExchangesJob.start();
  getExchangeRatesLastCloseJob.start();

  app.get("/api/v1/fundamentals/:ticker", async (req, res) => {
    const value = await api.getFundamentals(req.params);

    res.send(value);
  });

  app.get("/api/v1/equity-risk-premium-countries", async (req, res) => {
    const value = api.getEquityRiskPremiumCountries();
    res.send(value);
  });

  app.get("/api/v1/equity-risk-premium-regions", async (req, res) => {
    const value = api.getEquityRiskPremiumRegions();
    res.send(value);
  });

  app.get(
    "/api/v1/government-bond-last-close/:countryCode",
    async (req, res) => {
      const governmentBondLastClose = await api.getGovernmentBondLastClose(
        req.params
      );
      res.send({ governmentBondLastClose });
    }
  );

  app.get("/api/v1/industry-averages", async (req, res) => {
    const value = await api.getIndustryAverages(req.params);
    res.send(value);
  });

  app.get("/api/v1/exchange-rates-last-closes", async (req, res) => {
    res.send({ exchangeRates });
  });

  app.get("/", (_, res) => {
    res.send(200);
  });

  app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})();
