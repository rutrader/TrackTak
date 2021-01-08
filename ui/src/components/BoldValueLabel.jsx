import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";

const BoldSpan = ({ value }) => {
  const theme = useTheme();

  return (
    <Box component="span" sx={{ fontWeight: theme.typography.fontWeightBold }}>
      {value}
    </Box>
  );
};

const BoldValueLabel = ({ value, label, reverse }) => {
  return (
    <Typography>
      <Box sx={{ display: "flex" }}>
        {reverse ? (
          <>
            {label}&nbsp;
            <BoldSpan value={value} />
          </>
        ) : (
          <>
            <BoldSpan value={value} />
            &nbsp;{label}
          </>
        )}
      </Box>
    </Typography>
  );
};

export default BoldValueLabel;
