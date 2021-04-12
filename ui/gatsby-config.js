require("dotenv-flow").config();

module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
  },
  siteMetadata: {
    title: "tracktak",
    siteUrl: "https://tracktak.com",
  },
  plugins: [
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
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-s3",
      options: {
        bucketName: "staging.tracktak.com",
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
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        host: process.env.CONTENTFUL_HOST,
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
