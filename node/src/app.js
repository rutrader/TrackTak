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

app.get("/api/v1/get-financials/:symbol", async (req, res) => {
  const value = await api.getFinancials(req.params);

  res.send(value);
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
