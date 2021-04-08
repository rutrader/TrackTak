require("dotenv-flow").config();

const express = require("express");
const cors = require("cors");

require("express-async-errors");

const api = require("./src/api");

const hostname = "127.0.0.1";
const port = process.env.PORT;
const app = express();

const origin = [process.env.ORIGIN_URL];

const corsOptions = {
  origin,
  optionsSuccessStatus: 200,
};

app.use(express.static("public"));
app.use(cors(corsOptions));

app.get("/api/v1/fundamentals/:ticker", async (req, res) => {
  const value = await api.getFundamentals(req.params.ticker, req.query);

  res.send({ value });
});

app.get("/api/v1/prices/:ticker", async (req, res) => {
  const value = await api.getPrices(req.params.ticker, req.query);

  res.send({ value });
});

app.get("/api/v1/eur-base-exchange-rate/:code", async (req, res) => {
  const value = await api.getEURBaseExchangeRate(req.params.code, req.query);

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

app.get("/api/v1/exchange-symbol-list/:code", async (req, res) => {
  const value = await api.getExchangeSymbolList(req.params.code, req.query);
  res.send({ value });
});

app.get("/api/v1/government-bond/:code", async (req, res) => {
  const value = await api.getGovernmentBond(req.params.code, req.query);
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
