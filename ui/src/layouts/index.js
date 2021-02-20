import Layout from "./Layout";
import LayoutHome from "./LayoutHome";
import React from "react";
import LayoutFullScreen from "./LayoutFullScreen";

export default ({ children, pageContext }) => {
  if (pageContext.layout === "home") {
    return <LayoutHome>{children}</LayoutHome>;
  }

  if (pageContext.layout === "fullscreen") {
    return <LayoutFullScreen>{children}</LayoutFullScreen>;
  }
  return <Layout>{children}</Layout>;
};
