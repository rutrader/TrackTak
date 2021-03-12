let navigate;
let Link;
let AnchorLink;

try {
  // eslint-disable-next-line import/no-unresolved
  const gatsby = require("gatsby");

  AnchorLink = require("gatsby-plugin-anchor-links").AnchorLink;

  navigate = gatsby.navigate;
  Link = gatsby.Link;
} catch (error) {
  // eslint-disable-next-line import/no-unresolved
  const reach = require("@reach/router");

  navigate = reach.navigate;
  Link = reach.Link;
  AnchorLink = ({ children }) => <span>{children}</span>;
}

export { navigate, Link, AnchorLink };
