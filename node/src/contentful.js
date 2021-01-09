const contentful = require("contentful");

const contentfulParams = {
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_API_KEY,
};

if (process.env.NODE_ENV === "development") {
  contentfulParams.host = "preview.contentful.com";
}

const client = contentful.createClient(contentfulParams);

module.exports = client;
