import { navigate as reachNavigate, Link as ReachLink } from "@reach/router";
import React from "react";

let navigate = reachNavigate;
let Link = ReachLink;
let AnchorLink = ({ children }) => <span>{children}</span>;

try {
  const gatsby = require("gatsby");

  AnchorLink = require("gatsby-plugin-anchor-links").AnchorLink;

  navigate = gatsby.navigate;
  Link = gatsby.Link;
} catch (error) {
  // Swallow the error as gatsby is optional
  console.log('Gatsby not detected. Falling back to reach/router')
}

export { navigate, Link, AnchorLink };
