import { Box, CircularProgress, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import selectFundamentalsIsLoaded from "../../../packages/intrinsic-valuations/src/selectors/fundamentalSelectors/selectIsFundamentalsLoaded";

const PageSpinner = () => {
  const theme = useTheme();
  const fundamentalsIsLoaded = useSelector(selectFundamentalsIsLoaded);

  return fundamentalsIsLoaded === false ? (
    <Box
      sx={{
        position: "fixed",
        backgroundColor: theme.palette.common.white,
        zIndex: theme.zIndex.modal,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        top: 0,
        opacity: 0.6,
      }}
    >
      <CircularProgress />
    </Box>
  ) : null;
};

export default PageSpinner;
