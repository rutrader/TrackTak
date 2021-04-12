require("dotenv-flow").config();
const webpack = require("webpack");
const path = require("path");
const WorkerPlugin = require("worker-plugin");

// https://github.com/gatsbyjs/gatsby/issues/19618

// const fs = require("fs");
// const path = require("path");

// const fundamentalsDataDir = `${__dirname}/data/fundamentalsData`;

// let fundamentals = fs
//   .readdirSync(fundamentalsDataDir)
//   .flatMap((name) => require(path.join(fundamentalsDataDir, name)))
//   .filter(
//     ({ General, Highlights }) =>
//       Highlights.MostRecentQuarter !== "0000-00-00" && General.Industry,
//   );

// if (process.env.NODE_ENV === "development") {
// To speed up development time
// fundamentals = fundamentals.filter((x) => x.General.Code === "IRBT");
// }

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    output: {
      globalObject: "self",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: require.resolve("@open-wc/webpack-import-meta-loader"),
        },
      ],
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /.*\/generated\/iconSvgPaths.*/,
        path.resolve(__dirname, "src/icons.js"),
      ),
      new WorkerPlugin(),
    ],
  });
};

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

// exports.sourceNodes = async ({
//   actions: { createNode },
//   createNodeId,
//   createContentDigest,
// }) => {
//   fundamentals.forEach((datum) => {
//     const {
//       General,
//       Highlights: { MostRecentQuarter, MarketCapitalization },
//     } = datum;
//     const isInUS = General.CountryISO === "US";
//     const ticker = isInUS
//       ? `${General.Code}-${General.CountryISO}`
//       : `${General.Code}-${General.Exchange}`;
//     createNode({
//       id: createNodeId(ticker),
//       internal: {
//         type: `StockFundamentals`,
//         contentDigest: createContentDigest(datum),
//       },
//       ticker: ticker.toLowerCase(),
//       General,
//       Highlights: {
//         MostRecentQuarter,
//         MarketCapitalization,
//       },
//     });
//   });
// };
