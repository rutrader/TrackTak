import { Box, Link, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React, { forwardRef, useState } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import FormGroup from "@material-ui/core/FormGroup";
import Chip from "@mui/material/Chip";
import SelectAPIRegion from "../components/SelectAPIRegion";
import PricingPlan, { BoxPricingPlan } from "../components/PricingPlan";
import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";
import { navigate } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { createCheckoutSession } from "../api/api";
import { useAuth } from "../hooks/useAuth";

const sharedFeatureOne = "Automated financial models";
const sharedFeatureTwo = "Unlimited valuations";
const sharedFeatureThree = "Export valuations";
const sharedFeatureFour = "Full spreadsheet editing";
const sharedFeatureFive = "United States API region included";
const sharedFeatureSix = "Priority email modelling support";

const listOfFeaturesNonActive = [
  { feature: sharedFeatureOne },
  { feature: "12 valuations per month" },
  { feature: sharedFeatureFive },
  { feature: sharedFeatureThree },
  { feature: sharedFeatureFour },
  { feature: sharedFeatureSix, disabled: true },
  { feature: "Freeze your plan", disabled: true },
];

const listOfFeaturesActive = [
  { feature: sharedFeatureOne },
  { feature: "25 valuations per month" },
  { feature: sharedFeatureFive },
  { feature: sharedFeatureThree },
  { feature: sharedFeatureFour },

  { feature: sharedFeatureSix },
  { feature: "Freeze your plan for up to 1 month" },
];

const listOfFeaturesPro = [
  { feature: sharedFeatureOne },
  { feature: sharedFeatureTwo },
  { feature: "All API regions included" },
  { feature: sharedFeatureThree },
  { feature: sharedFeatureFour },
  { feature: "Priority email and call support" },
  { feature: "Freeze your plan for up to 3 months" },
];

export const apiRegionsHashLink = "#Select-API-Regions";

const Pricing = () => {
  const theme = useTheme();
  const { getAccessToken } = useAuth();
  const [checked, setChecked] = useState([]);

  const handleOnClick = async (planPriceId) => {
    const token = await getAccessToken();
    const apiRegionLineItems = checked.map((priceId) => {
      return { price: priceId, quantity: 1 };
    });
    const lineItems = [
      { price: planPriceId, quantity: 1 },
      ...apiRegionLineItems,
    ];
    const { data } = await createCheckoutSession(lineItems, token?.jwtToken);

    window.location.href = data.url;
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
          <Typography
            sx={{ marginTop: theme.spacing(2) }}
            color="textSecondary"
          >
            For business plans are only available by contacting sales:{" "}
            <Link href="mailto:support@tracktak.com">support@tracktak.com</Link>
            .
          </Typography>
        </FormGroup>
      </Box>
      <BoxPricingPlan>
        <PricingPlan
          priceId="price_1JlWlfDOsUBI2OhCHK3aGvFQ"
          subText="Everything included"
          header="Professional Investor"
          listOfFeatures={listOfFeaturesPro}
          handleOnClick={handleOnClick}
        />
        <PricingPlan
          buttonProps={{
            variant: "contained",
          }}
          paperProps={{
            sx: {
              border: "3px solid #6240c8b3;",
              minHeight: "610px",
            },
          }}
          header={
            <Box component="span">
              <Chip
                component="span"
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
          priceId="price_1JgoDEDOsUBI2OhCmiU18JQg"
          subText="Starting from"
          listOfFeatures={listOfFeaturesActive}
          handleOnClick={handleOnClick}
        />
        <PricingPlan
          priceId="price_1Ji19xDOsUBI2OhCXRa3Rtvk"
          subText="Starting from"
          header="Non-Active Investor"
          listOfFeatures={listOfFeaturesNonActive}
          handleOnClick={handleOnClick}
        />
      </BoxPricingPlan>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: theme.typography.fontSize2,
          color: theme.palette.primary.main,
        }}
        component={forwardRef((props, ref) => (
          <AnchorLink {...props} gatsbyLinkProps={{ ref }} />
        ))}
        to={`/pricing${apiRegionsHashLink}`}
        onAnchorLinkClick={() => {
          navigate(`/pricing${apiRegionsHashLink}`);
        }}
      >
        Want more API regions? Click here.
      </Box>
      <SelectAPIRegion checked={checked} setChecked={setChecked} />
      <FrequentlyAskedQuestion />
    </>
  );
};

export default Pricing;
