require("dotenv-flow").config();

const fs = require("fs");
const path = require("path");

const fundamentalsDataDir = `${__dirname}/data/fundamentalsData`;

let fundamentals = fs
  .readdirSync(fundamentalsDataDir)
  .flatMap((name) => require(path.join(fundamentalsDataDir, name)))
  .filter(
    ({ General, Highlights }) =>
      Highlights.MostRecentQuarter !== "0000-00-00" && General.Industry,
  );

if (process.env.NODE_ENV === "development") {
  // To speed up development time
  fundamentals = fundamentals.filter(
    (x) =>
      x.General.Code === "IRBT" ||
      x.General.Code === "FNX" ||
      x.General.Code === "PTL",
  );
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path === "/") {
    page.context.layout = "home";
    createPage(page);
  }

  if (page.path.match(/stock\//)) {
    page.context.layout = "fullscreen";

    createPage(page);
  }
};

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  fundamentals.forEach((datum) => {
    const {
      General,
      Highlights: { MostRecentQuarter, MarketCapitalization },
    } = datum;

    const isInUS = General.CountryISO === "US";
    const ticker = isInUS
      ? `${General.Code}-${General.CountryISO}`
      : `${General.Code}-${General.Exchange}`;

    createNode({
      id: createNodeId(ticker),
      internal: {
        type: `StockFundamentals`,
        contentDigest: createContentDigest(datum),
      },
      ticker: ticker.toLowerCase(),
      General,
      Highlights: {
        MostRecentQuarter,
        MarketCapitalization,
      },
    });
  });
};