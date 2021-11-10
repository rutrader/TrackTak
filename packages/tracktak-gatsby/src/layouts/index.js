import Layout from "./Layout";
import LayoutHome from "./LayoutHome";
import React from "react";
import LayoutFullScreen from "../../../packages/app/src/components/LayoutFullScreen";
import TTSnackbar from "../../../packages/common/src/components/TTSnackbar";
import LayoutPricing from "./LayoutPricing";

const Root = ({ children, pageContext, params }) => {
  if (pageContext.layout === "home") {
    return <LayoutHome>{children}</LayoutHome>;
  }
  if (pageContext.layout === "pricing") {
    return <LayoutPricing>{children}</LayoutPricing>;
  }

  return <Layout>{children}</Layout>;
};

export default ({ children, pageContext, params }) => {
  return (
    <Root pageContext={pageContext} params={params}>
      {children}
      <TTSnackbar />
    </Root>
  );
};
