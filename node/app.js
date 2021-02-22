require("dotenv-flow").config();

const express = require("express");
const cors = require("cors");

require("express-async-errors");

const api = require("./src/api");

const hostname = "127.0.0.1";
const port = process.env.PORT;
const app = express();

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/api/v1/fundamentals/:ticker", async (req, res) => {
  const value = await api.getFundamentals(req.params.ticker, req.query);

  res.send({ value });
});

app.get("/api/v1/prices/:ticker", async (req, res) => {
  const value = await api.getPrices(req.params.ticker, req.query);

  res.send({ value });
});

app.get("/api/v1/eur-base-exchange-rate/:quoteCurrency", async (req, res) => {
  const value = await api.getEURBaseExchangeRate(
    req.params.quoteCurrency,
    req.query,
  );

  res.send({ value });
});

app.get(
  "/api/v1/exchange-rate/:baseCurrency/:quoteCurrency",
  async (req, res) => {
    const value = await api.getExchangeRate(
      req.params.baseCurrency,
      req.params.quoteCurrency,
      req.query,
    );

    res.send({ value });
  },
);

app.get("/api/v1/government-bond/:countryCode/:year", async (req, res) => {
  const value = await api.getGovernmentBond(
    req.params.countryCode,
    req.params.year,
    req.query,
  );
  res.send({ value });
});

app.get("/api/v1/autocomplete-query/:queryString", async (req, res) => {
  const value = await api.getAutocompleteQuery(
    req.params.queryString,
    req.query,
  );
  res.send({ value });
});

app.get("/", (_, res) => {
  res.sendStatus(200);
});

app.listen(port, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
