import { Box, CircularProgress, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import selectFundamentalsIsLoaded from "../../../packages/intrinsic-valuations/src/selectors/fundamentalSelectors/selectIsFundamentalsLoaded";
import PageSpinner from "./PageSpinner";

const FundamentalsSpinner = () => {
  const fundamentalsIsLoaded = useSelector(selectFundamentalsIsLoaded);

  return fundamentalsIsLoaded === false ? <PageSpinner /> : null;
};

export default FundamentalsSpinner;
