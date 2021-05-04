import Layout from "./Layout";
import LayoutHome from "./LayoutHome";
import React, { useEffect } from "react";
import convertDotTickerToHyphen from "../shared/convertDotTickerToHyphen";
import LayoutFullScreen from "./LayoutFullScreen";
import TTSnackbar from "../components/TTSnackbar";
import { ProvideAuth } from "../hooks/useAuth";
import ConditionalLayout from "./ConditionalLayout";

const oldStockPathRegex = /\/(discounted-cash-flow|synthetic-credit-rating|industry-averages)\/[A-Za-z0-9]+\.\w+/g;
const oldStockValuationpathRegex = /\/(stock-valuations)\/[A-Z0-9]+\.?[A-Z]+/g;

const stockRedirect = (path) => {
  const splitPath = path.split("/");
  const page = splitPath[1];
  const ticker = splitPath[2];
  const newTicker = convertDotTickerToHyphen(ticker);

  window.location.href = `/stock/${newTicker}/${page}`;
};

const valuationRedirect = () => {
  window.location.href = "/stock-valuations";
};

const Root = ({ children, pageContext, params }) => {
  if (pageContext.layout === "home") {
    return <ConditionalLayout>{children}</ConditionalLayout>;
  }

  if (pageContext.layout === "fullscreen") {
    return (
      <LayoutFullScreen ticker={params.ticker}>{children}</LayoutFullScreen>
    );
  }

  return <ConditionalLayout>{children}</ConditionalLayout>;
};

export default ({ children, pageContext, path, params }) => {
  const isStockRedirecting = path.match(oldStockPathRegex);
  const isValuationRedirecting = path.match(oldStockValuationpathRegex);

  useEffect(() => {
    if (isStockRedirecting) {
      stockRedirect(path);
    }

    if (isValuationRedirecting) {
      valuationRedirect(path);
    }
  }, [isStockRedirecting, isValuationRedirecting, path]);

  if (isStockRedirecting || isValuationRedirecting) return null;

  return (
    <ProvideAuth>
      <Root pageContext={pageContext} params={params}>
        {children}
        <TTSnackbar />
      </Root>
    </ProvideAuth>
  );
};
