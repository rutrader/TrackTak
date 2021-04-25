const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

const path = require("path");

const isInProduction = activeEnv === "production";

const duplicatePackageModules = [
  "react",
  "react-dom",
  "redux",
  "react-redux",
  "@emotion/react",
  "@emotion/styled",
  "@material-ui/core",
  "@material-ui/icons",
  "@material-ui/styles",
  "styled-components",
  "@reduxjs/toolkit",
  "change-case",
  "cross-env",
  "dayjs",
  "query-string",
  "@blueprintjs/core",
  "@blueprintjs/table",
  "axios",
  "gatsby",
  "gatsby-plugin-anchor-links",
];

const alias = {
  "@tracktak/dcf-react": path.resolve("../packages/dcf-react/src"),
};

duplicatePackageModules.forEach((packageModule) => {
  alias[packageModule] = path.resolve(`./node_modules/${packageModule}`);
});

module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    DEV_SSR: true,
  },
  siteMetadata: {
    title: "tracktak",
    siteUrl: "https://tracktak.com",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias,
      },
    },
    "gatsby-plugin-no-sourcemaps",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [],
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -60,
        duration: 0,
      },
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        devMode: true,
        analyzerPort: 3002,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-layout",
    {
      resolve: "gatsby-plugin-material-ui",
      options: {},
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-s3",
      options: {
        bucketName: isInProduction ? "tracktak.com" : "staging.tracktak.com",
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: "2331095",
        sv: 6,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: "gatsby-plugin-create-client-paths",
      options: { prefixes: ["/stock/*"] },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        implementation: require("node-sass"),
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_API_KEY,
        spaceId: "kq8pz2yvb2zk",
        host: isInProduction ? undefined : "preview.contentful.com",
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-WFB538909G", "UA-185279234-1"],
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: [`/stock/**`],
      },
    },
    "gatsby-plugin-robots-txt",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/tracktak-logo-small.svg",
      },
    },
    // "gatsby-plugin-offline",
    "gatsby-plugin-mdx",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaultQuality: 90,
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
