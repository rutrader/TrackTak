require("dotenv").config();

const { response } = require("express");
const express = require("express");
const api = require("./api");
const app = express();
const hostname = "127.0.0.1";
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/v1/get-financials/:symbol", async (req, res) => {
  const value = await api.getFinancials(req.params);

  res.send(value);
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
