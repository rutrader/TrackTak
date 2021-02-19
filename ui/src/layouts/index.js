import Layout from "./Layout";
import LayoutFullScreen from "./LayoutFullScreen";
import LayoutHome from "./LayoutHome";
import React from "react";

export default ({ children, pageContext }) => {
  console.log(pageContext);

  if (pageContext.layout === "home") {
    return <LayoutHome>{children}</LayoutHome>;
  }
  if (pageContext.layout === "fullScreen") {
    return <LayoutFullScreen>{children}</LayoutFullScreen>;
  }

  return <Layout>{children}</Layout>;
};
