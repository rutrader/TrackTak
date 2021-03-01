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
    "gatsby-plugin-react-helmet",
    // "gatsby-plugin-layout",
    // {
    //   resolve: "gatsby-plugin-react-redux",
    //   options: {
    //     pathToCreateStoreModule: "./src/redux/createStore",
    //   },
    // },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
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
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-WFB538909G",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/tracktakSmallLogo.svg",
      },
    },
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
