import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";

const BoldValueLabel = ({ value, label }) => {
  const theme = useTheme();

  return (
    <Typography>
      <Box sx={{ display: "flex" }}>
        <Box
          component="span"
          sx={{ fontWeight: theme.typography.fontWeightBold }}
        >
          {value}
        </Box>
        &nbsp;{label}
      </Box>
    </Typography>
  );
};

export default BoldValueLabel;
