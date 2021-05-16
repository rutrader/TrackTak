import { Box, Typography, useTheme } from "@material-ui/core";
import React, { Fragment } from "react";

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
    <Typography component="div">
      {reverse ? (
        <Fragment>
          {label}&nbsp;
          <BoldSpan value={value} />
        </Fragment>
      ) : (
        <Fragment>
          <BoldSpan value={value} />
          &nbsp;{label}
        </Fragment>
      )}
    </Typography>
  );
};

export default BoldValueLabel;
