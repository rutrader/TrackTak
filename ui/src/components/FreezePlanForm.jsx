import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState } from "react";
import useCurrentPlan from "../hooks/useCurrentPlan";
import SettingSection from "./SettingSection";

const FreezePlanForm = () => {
  const theme = useTheme();
  const { currentPlan } = useCurrentPlan();
  const [freezeOption, setFreezeOption] = useState("1");

  const handleOptionChange = (_, e) => {
    setFreezeOption(e);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
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

      <Box
        sx={{
          mt: 3,
        }}
      >
        <SettingSection
          heading="Current Plan"
          subHeading={currentPlan?.type}
          icon={
            <CheckCircleIcon
              fontSize="large"
              color="action"
              sx={{
                mr: 0.5,
                color: (theme) => theme.palette.primary.light,
              }}
            />
          }
        ></SettingSection>

        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              fontWeight: "bold",
            }}
          >
            How long would you like to freeze your plan?
          </FormLabel>
          <RadioGroup
            aria-label="freeze time"
            defaultValue="1"
            name="freeze-plan-radio-buttons-group"
            row
            onChange={handleOptionChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="1 month" />
            <FormControlLabel value="2" control={<Radio />} label="2 months" />
            <FormControlLabel value="3" control={<Radio />} label="3 months" />
          </RadioGroup>
        </FormControl>

        <Typography
          sx={{
            fontWeight: "bold",
            mt: 1,
          }}
        >
          Freeze start date
        </Typography>
        <Typography>
          Your membership will freeze from your next payment date,{" "}
          {currentPlan && new Date(currentPlan.expiration).toLocaleDateString()}{" "}
          and you won’t be charged.
        </Typography>

        <Typography
          sx={{
            fontWeight: "bold",
            mt: 1,
          }}
        >
          Unfreezing your plan
        </Typography>
        <Typography>Unfreeze your membership at any time.</Typography>

        <Typography
          sx={{
            mt: 3,
            fontSize: (theme) => theme.typography.fontSize4,
          }}
          color="textSecondary"
        >
          Please note that unfreezing before the original end date, means there
          is a small charge amount will be added on to your next payment to
          cover the days. After you have used your 1 or 3-month allowance you no
          longer can freeze you plan within a 12-month period.
        </Typography>
      </Box>
    </Box>
  );
};

export default FreezePlanForm;
