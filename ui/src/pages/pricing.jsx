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
import PricingPlan, { CustomBox } from "../components/PricingPlan";

const listOfFeaturesNonActive = [
  { feature: "Automated financial models" },
  { feature: "8 valuations per month" },
  { feature: "Export valuations" },
  { feature: "Full spreadsheet editing" },
  { feature: "Priority email modelling support", disabled: true },
  { feature: "API regions are not included", disabled: true },
  { feature: "Freeze your plan", disabled: true },
];

const listOfFeaturesActive = [
  { feature: "Automated financial models" },
  { feature: "Unlimited valuations" },
  { feature: "Export valuations" },
  { feature: "Full spreadsheet editing" },
  { feature: "Priority email modelling support" },
  { feature: "API regions are not included", disabled: true },
  { feature: "Freeze your plan", disabled: true },
];

const listOfFeaturesPro = [
  { feature: "Automated financial models" },
  { feature: "Unlimited valuations" },
  { feature: "Export valuations" },
  { feature: "Full spreadsheet editing" },
  { feature: "Priority email modelling support" },
  { feature: "All API regions included" },
  { feature: "Freeze your plan" },
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
          Our Pricing Plan
        </Typography>
        <Typography
          sx={{
            color: theme.palette.primary.mainTextColor,
            marginBottom: theme.spacing(2),
          }}
          variant="h4"
        >
          Choose your plan. Try it free for 7 days.
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
      <CustomBox>
        <PricingPlan
          header="Professional Investor"
          price="$59.99"
          listOfFeatures={listOfFeaturesPro}
          toggle={toggle}
        />
        <PricingPlan
          paperProps={{
            sx: {
              boxShadow:
                "0 1px 10px 0 rgb(0 0 0 / 12%), 0 1px 2px 0 rgb(0 0 0 / 20%)",
              height: "615px",
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
      </CustomBox>
      <SelectAPIRegion toggle={toggle} />
    </>
  );
};

export default Pricing;
