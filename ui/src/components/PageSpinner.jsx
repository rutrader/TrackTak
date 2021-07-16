import { Box, CircularProgress, useTheme } from "@material-ui/core";
import React from "react";

const PageSpinner = () => {
  const theme = useTheme();

  return (
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
  );
};

export default PageSpinner;
