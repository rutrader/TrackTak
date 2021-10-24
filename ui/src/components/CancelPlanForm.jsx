import { Typography, useTheme } from "@material-ui/core";
import { Box } from "@material-ui/system";
import React from "react";
import FreezeMyPlan from "./FreezeMyPlan";
import useMediaQuery from "@mui/material/useMediaQuery";

const CancelPlanForm = () => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: isOnMobile ? theme.spacing(7) : 0,
          paddingRight: isOnMobile ? theme.spacing(7) : 0,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mt: theme.spacing(2),
            color: theme.palette.primary.mainTextColor,
            fontWeight: "bold",
          }}
          gutterBottom
        >
          Before you cancel...
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.mainTextColor,
          }}
          gutterBottom
        >
          Did you know you can put your plan on hold?
        </Typography>
        <FreezeMyPlan />
      </Box>
    </>
  );
};

export default CancelPlanForm;
