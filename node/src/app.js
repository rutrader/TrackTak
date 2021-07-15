import "dotenv/config";
import express from "express";
import cors from "cors";
import "express-async-errors";
import api from "./api";
import auth from "./middleware/auth";

const hostname = "127.0.0.1";
const port = process.env.NODE_ENV === "development" ? 3001 : process.env.PORT;
const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "16mb" }));

const publicRoutes = ["/api/v1/compute-sensitivity-analysis"];

app.use(cors());

app.options(publicRoutes[0], cors());

//These routes are public so they have cors turned off
app.post(publicRoutes[0], cors(), async (req, res) => {
  const { sheetsSerializedValues, existingScope, currentScopes } = req.body;
  const values = await api.computeSensitivityAnalysis(
    sheetsSerializedValues,
    existingScope,
    currentScopes,
  );

  res.send(values);
});

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? [
            "http://localhost:8000",
            "http://localhost:9000",
            "http://localhost:6006",
            "http://192.168.1.101:8000",
          ]
        : [process.env.ORIGIN_URL],
    optionsSuccessStatus: 204,
  }),
);

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

app.put("/api/v1/spreadsheet", auth, async (req, res) => {
  const spreadsheet = await api.saveSpreadsheet(req.body, req.user.username);
  res.send(spreadsheet);
});

app.get("/api/v1/spreadsheet", auth, async (req, res) => {
  const spreadsheets = await api.getSpreadsheets(req.user.username);
  res.send({ spreadsheets });
});

app.get("/api/v1/spreadsheet/:id", auth, async (req, res) => {
  const spreadsheet = await api.getSpreadsheet(
    req.user.username,
    req.params.id,
  );
  res.send({ spreadsheet });
});

app.delete("/api/v1/spreadsheet/:id", auth, async (req, res) => {
  await api.deleteSpreadsheet(req.params.id, req.user.username);
  res.send({ id: req.params.id });
});

app.get("/", (_, res) => {
  res.sendStatus(200);
});

app.listen(port, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
