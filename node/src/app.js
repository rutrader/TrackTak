require("dotenv").config();

const express = require("express");
const cors = require("cors");
const api = require("./api");
const app = express();

const hostname = "127.0.0.1";
const port = process.env.PORT;

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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

app.get("/api/v1/government-bonds/:ticker", async (req, res) => {
  const value = await api.getGovernmentBonds(req.params);
  res.send(value);
});

app.get("/api/v1/industry-averages", async (req, res) => {
  const value = await api.getIndustryAverages(req.params);
  res.send(value);
});

app.get("/", (_, res) => {
  res.send(200);
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
