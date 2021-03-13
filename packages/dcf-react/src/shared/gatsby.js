import reach from "@reach/router";
import React from "react";

let navigate;
let Link;
let AnchorLink;

try {
  const gatsby = require("gatsby");

  AnchorLink = require("gatsby-plugin-anchor-links").AnchorLink;

  navigate = gatsby.navigate;
  Link = gatsby.Link;
} catch (error) {
  navigate = reach.navigate;
  Link = reach.Link;
  AnchorLink = ({ children }) => <span>{children}</span>;
}

export { navigate, Link, AnchorLink };
