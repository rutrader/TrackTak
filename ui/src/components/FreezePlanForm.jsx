import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import useCurrentPlan from "../hooks/useCurrentPlan";
import useMediaQuery from "@mui/material/useMediaQuery";
import FreezeMyPlan from "./FreezeMyPlan";

const FreezePlanForm = () => {
  const theme = useTheme();
  const { currentPlan } = useCurrentPlan();
  const [freezeOption, setFreezeOption] = useState("1");
  const isOnMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const handleOptionChange = (_, e) => {
    setFreezeOption(e);
  };

  return (
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
        Need a break from investing?
      </Typography>
      <FreezeMyPlan onChange={handleOptionChange} />
    </Box>
  );
};

export default FreezePlanForm;
