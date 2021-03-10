import Layout from "./Layout";
import LayoutHome from "./LayoutHome";
import React, { useEffect } from "react";
import LayoutFullScreen from "./LayoutFullScreen";
import convertDotTickerToHyphen from "../shared/convertDotTickerToHyphen";

const oldStockPathRegex = /\/(discounted-cash-flow|synthetic-credit-rating|industry-averages)\/[A-Za-z0-9]+\.\w+/g;
const olsStockValuationpathRegex = /\/(stock-valuations)\/[A-Z0-9]+\.?[A-Z]+/g;

const stockRedirect = (path) => {
  const splitPath = path.split("/");
  const page = splitPath[1];
  const ticker = splitPath[2];
  const newTicker = convertDotTickerToHyphen(ticker);

  window.location.href = `/stock/${newTicker}/${page}`;
};

const valuationRedirect = (path) => {
  window.location.href = "/stock-valuations";
};

export default ({ children, pageContext, data, path }) => {
  const isStockRedirecting = path.match(oldStockPathRegex);
  const isValuationRedirecting = path.match(olsStockValuationpathRegex);

  useEffect(() => {
    if (isStockRedirecting) {
      stockRedirect(path);
    }

    if (isValuationRedirecting) {
      valuationRedirect(path);
    }
  }, [isStockRedirecting, isValuationRedirecting, path]);

  if (isStockRedirecting || isValuationRedirecting) return null;

  if (pageContext.layout === "home") {
    return <LayoutHome>{children}</LayoutHome>;
  }
  if (pageContext.layout === "fullscreen") {
    return (
      <LayoutFullScreen stockFundamentals={data.stockFundamentals}>
        {children}
      </LayoutFullScreen>
    );
  }
  return <Layout>{children}</Layout>;
};
