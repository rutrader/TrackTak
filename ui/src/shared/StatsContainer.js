import { Box, useTheme } from "@material-ui/core";
import React from "react";

const StatsContainer = ({ sx, ...props }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gridRowGap: theme.spacing(0.7),
        ...sx,
      }}
      {...props}
    />
  );
};

export default StatsContainer;
