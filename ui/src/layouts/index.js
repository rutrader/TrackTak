import Layout from "./Layout";
import LayoutHome from "./LayoutHome";
import React, { useEffect } from "react";
import LayoutFullScreen from "./LayoutFullScreen";
import TTSnackbar from "../components/TTSnackbar";
import { queryNames } from "../../../packages/intrinsic-valuations/src/discountedCashFlow/templates/freeCashFlowFirmSimple/inputQueryNames";

const oldQueryPath = /cagrYearOneToFive=[0-9]+|ebitTargetMarginInYearTen=[0-9]+/g;

const getNewSearch = (search) => {
  let newSearch = search.replace(
    "cagrYearOneToFive",
    queryNames.cagrInYears_1_5,
  );
  newSearch = newSearch.replace(
    "ebitTargetMarginInYearTen",
    queryNames.ebitTargetMarginInYear_10,
  );

  return newSearch;
};

const Root = ({ children, pageContext, params }) => {
  if (pageContext.layout === "home") {
    return <LayoutHome>{children}</LayoutHome>;
  }
  if (pageContext.layout === "fullscreen") {
    return (
      <LayoutFullScreen ticker={params.ticker}>{children}</LayoutFullScreen>
    );
  }

  return <Layout>{children}</Layout>;
};

export default ({ children, pageContext, location, params }) => {
  const redirectMatches = [...location.search.matchAll(oldQueryPath)];

  useEffect(() => {
    if (redirectMatches.length) {
      const newSearch = getNewSearch(location.search);

      window.location.href = `${location.origin}${location.pathname}${newSearch}`;
    }
  }, [redirectMatches, location.search, location.origin, location.pathname]);

  if (redirectMatches.length) return null;

  return (
    <Root pageContext={pageContext} params={params}>
      {children}
      <TTSnackbar />
    </Root>
  );
};
