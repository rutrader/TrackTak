const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./src/app.js", "./src/workers/index.js"],
  output: {
    path: path.join(__dirname, "build"),
    filename: "app.js",
  },
  target: "node",
  externalsPresets: { node: true },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "package.json", to: "./" }],
    }),
  ],
};
