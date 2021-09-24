import { Box, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import { Stack } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import SelectAPIRegion from "../components/SelectAPIRegion";
import PricingPlan, { BoxPricingPlan } from "../components/PricingPlan";

const sharedFeatureOne = "Automated financial models";
const sharedFeatureTwo = "Unlimited valuations";
const sharedFeatureThree = "Export valuations";
const sharedFeatureFour = "Full spreadsheet editing";
const sharedFeatureFive = "Priority email modelling support";
const sharedFeatureSix = "API regions are not included";
const sharedFeatureSeven = "Freeze your plan";

const listOfFeaturesNonActive = [
  { feature: sharedFeatureOne },
  { feature: "8 valuations per month" },
  { feature: sharedFeatureThree },
  { feature: sharedFeatureFour },
  { feature: sharedFeatureFive, disabled: true },
  { feature: sharedFeatureSix, disabled: true },
  { feature: sharedFeatureSeven, disabled: true },
];

const listOfFeaturesActive = [
  { feature: sharedFeatureOne },
  { feature: sharedFeatureTwo },
  { feature: sharedFeatureThree },
  { feature: sharedFeatureFour },
  { feature: sharedFeatureFive },
  { feature: sharedFeatureSix, disabled: true },
  { feature: sharedFeatureSeven, disabled: true },
];

const listOfFeaturesPro = [
  { feature: sharedFeatureOne },
  { feature: sharedFeatureTwo },
  { feature: sharedFeatureThree },
  { feature: sharedFeatureFour },
  { feature: sharedFeatureFive },
  { feature: "All API regions included" },
  { feature: "Freeze your plan up to 3 months" },
];

const Pricing = () => {
  const theme = useTheme();
  const [toggle, setToggle] = useState(false);

  const handleOnChangeToggle = (e) => {
    setToggle(e.target.checked);
  };

  return (
    <>
      <Helmet>
        <title>{getTitle("Pricing")}</title>
        <link rel="canonical" href={`${resourceName}/pricing`} />
        <meta name="description" content="Pricing Plan." />
      </Helmet>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          color={theme.palette.primary.purple}
          fontWeight="bold"
          variant="h3"
          gutterBottom
        >
          Plans and Pricing
        </Typography>
        <Typography
          sx={{
            color: theme.palette.primary.mainTextColor,
            marginBottom: theme.spacing(2),
          }}
          variant="h4"
        >
          Choose a plan that works for you. Try it free for 7 days.
        </Typography>
        <FormGroup>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography sx={{ fontSize: theme.typography.fontSize2 }}>
              Monthly
            </Typography>
            <Switch
              defaultChecked
              inputProps={{ "aria-label": "ant design" }}
              onChange={handleOnChangeToggle}
              checked={toggle}
            />
            <Typography sx={{ fontSize: theme.typography.fontSize2 }}>
              Yearly
            </Typography>
          </Stack>
        </FormGroup>
      </Box>
      <BoxPricingPlan>
        <PricingPlan
          header="Professional Investor"
          price="$59.99"
          listOfFeatures={listOfFeaturesPro}
          toggle={toggle}
        />
        <PricingPlan
          buttonProps={{
            variant: "contained",
          }}
          paperProps={{
            sx: {
              border: "3px solid #6240c8b3;",
              height: "610px",
            },
          }}
          header={
            <Box>
              <Chip
                label="Best value"
                color="primary"
                style={{
                  fontWeight: "bold",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  marginTop: "15px",
                  marginRight: "8px",
                  height: "28px",
                }}
              />
              Active Investor
            </Box>
          }
          price="$34.99"
          listOfFeatures={listOfFeaturesActive}
          toggle={toggle}
        />
        <PricingPlan
          header="Non-Active Investor"
          price=" $19.99"
          listOfFeatures={listOfFeaturesNonActive}
          toggle={toggle}
        />
      </BoxPricingPlan>
      <SelectAPIRegion toggle={toggle} />
    </>
  );
};

export default Pricing;
