import { Button, Stack, Typography } from "@material-ui/core";
import { Box, useTheme } from "@material-ui/system";
import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PersonIcon from "@mui/icons-material/Person";
import PricingPlan, { BoxPricingPlan } from "../components/PricingPlan";
import { listOfFeaturesNonActive, listOfFeaturesPro } from "./pricing";

const SwitchingPlan = () => {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>{getTitle("Switching Plan")}</title>
      </Helmet>
      <Box>
        <Typography
          sx={{ display: "flex", fontSize: "2.3rem" }}
          color={theme.palette.primary.purple}
          fontWeight="bold"
          gutterBottom
        >
          Before you go, consider switching to a different plan.
        </Typography>
        <BoxPricingPlan>
          <PricingPlan
            subText="Everything included"
            header="Professional Investor"
            price="$69.99"
            listOfFeatures={listOfFeaturesPro}
          />
          <PricingPlan
            subText="Starting from"
            header="Non-Active Investor"
            price="$19.99"
            listOfFeatures={listOfFeaturesNonActive}
          />
        </BoxPricingPlan>
        <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: "space-around", flexWrap: "wrap", gap: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
            }}
            startIcon={<PersonIcon />}
          >
            Keep My Benefits
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
            }}
            startIcon={<AcUnitIcon />}
          >
            Freeze Payment Plan
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
            }}
          >
            End My Membership
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default SwitchingPlan;
