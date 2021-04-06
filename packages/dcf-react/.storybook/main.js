module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-controls",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push(
      {
        test: /\.jsx?$/,
        loader: require.resolve("@open-wc/webpack-import-meta-loader"),
      },
      {
        test: /worker\.js$/,
        use: { loader: "worker-loader" },
      },
    );

    return config;
  },
};
