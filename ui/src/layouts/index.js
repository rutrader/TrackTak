import Layout from "./Layout";
import LayoutHome from "./LayoutHome";
import React from "react";
import LayoutFullScreen from "./LayoutFullScreen";
import TTSnackbar from "../components/TTSnackbar";
import LayoutPricing from "./LayoutPricing";

const Root = ({ children, pageContext, params }) => {
  if (pageContext.layout === "home") {
    return <LayoutHome>{children}</LayoutHome>;
  }
  if (pageContext.layout === "pricingPlan") {
    return <LayoutPricing>{children}</LayoutPricing>;
  }
  if (pageContext.layout === "fullscreen") {
    return (
      <LayoutFullScreen ticker={params.ticker}>{children}</LayoutFullScreen>
    );
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
