import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import { Box, useTheme } from "@material-ui/system";
import { Helmet } from "react-helmet";
import getTitle from "../../../../tracktak-gatsby/src/shared/getTitle";
import { navigate } from "gatsby";

function CancellationPlan({ route, iconArrow, header, bodyText }) {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>{getTitle("Switching Plan")}</title>
      </Helmet>
      <Box>
        <IconButton
          color="primary"
          onClick={() => {
            navigate(route);
          }}
        >
          {iconArrow}
        </IconButton>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "2.3rem",
            mb: 4,
          }}
          color={theme.palette.primary.purple}
          fontWeight="bold"
          gutterBottom
        >
          {header}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {bodyText}
        </Box>
      </Box>
    </>
  );
}

export default CancellationPlan;
