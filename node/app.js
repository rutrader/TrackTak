require("dotenv-flow").config();

const express = require("express");
const cors = require("cors");

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

  res.send(value);
});

app.get("/api/v1/government-bond-last-close/:countryCode", async (req, res) => {
  const governmentBondLastClose = await api.getGovernmentBondLastClose(
    req.params.countryCode,
    req.query
  );
  res.send({ governmentBondLastClose });
});

app.get(
  "/api/v1/exchange-rate-history/:baseCurrency/:quoteCurrency",
  async (req, res) => {
    const value = await api.getExchangeRateHistory(
      req.params.baseCurrency,
      req.params.quoteCurrency,
      req.query
    );

    res.send(value);
  }
);

app.get("/api/v1/autocomplete-query/:queryString", async (req, res) => {
  const value = await api.getAutocompleteQuery(
    req.params.queryString,
    req.query
  );
  res.send(value);
});

app.get("/api/v1/contentful/getEntries", async (req, res) => {
  const value = await api.getContentfulEntries(req.query);

  res.send(value);
});

app.get("/api/v1/contentful/getEntry/:id", async (req, res) => {
  const value = await api.getContentfulEntry(req.params.id, req.query);

  res.send(value);
});

app.get("/", (_, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
