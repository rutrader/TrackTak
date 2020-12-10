require("dotenv").config();

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
  const value = await api.getFundamentals(req.params);

  res.send(value);
});

app.get("/api/v1/government-bond-last-close/:countryCode", async (req, res) => {
  const governmentBondLastClose = await api.getGovernmentBondLastClose(
    req.params
  );
  res.send({ governmentBondLastClose });
});

app.get(
  "/api/v1/exchange-rate-history/:baseCurrency/:quoteCurrency",
  async (req, res) => {
    const value = await api.getExchangeRateHistory({
      ...req.params,
      ...req.query,
    });

    res.send(value);
  }
);

app.get("/api/v1/autocomplete-query/:queryString", async (req, res) => {
  const value = await api.getAutocompleteQuery(req.params);
  res.send(value);
});

app.get("/", (_, res) => {
  res.send(200);
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
