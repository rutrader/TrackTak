import Layout from "./Layout";
import LayoutHome from "./LayoutHome";
import React from "react";

export default ({ children, pageContext }) => {
  if (pageContext.layout === "home") {
    return <LayoutHome>{children}</LayoutHome>;
  }
  if (pageContext.layout === "fullscreen") {
    return children;
  }
  return <Layout>{children}</Layout>;
};
