import { Box, Link, Typography } from "@material-ui/core";
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
import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";

const sharedFeatureOne = "Automated financial models";
const sharedFeatureTwo = "Unlimited valuations";
const sharedFeatureThree = "Export valuations";
const sharedFeatureFour = "Full spreadsheet editing";
const sharedFeatureFive = "Priority email modelling support";
const sharedFeatureSix = "API regions are not included";

export const listOfFeaturesNonActive = [
  { feature: sharedFeatureOne },
  { feature: "8 valuations per month" },
  { feature: sharedFeatureThree },
  { feature: sharedFeatureFour },
  { feature: sharedFeatureFive, disabled: true },
  { feature: "Freeze your plan", disabled: true },
  { feature: sharedFeatureSix, disabled: true },
];

export const listOfFeaturesActive = [
  { feature: sharedFeatureOne },
  { feature: "18 valuations per month" },
  { feature: sharedFeatureThree },
  { feature: sharedFeatureFour },
  { feature: sharedFeatureFive },
  { feature: "Freeze your plan for up to 1 month" },
  { feature: sharedFeatureSix, disabled: true },
];

export const listOfFeaturesPro = [
  { feature: sharedFeatureOne },
  { feature: sharedFeatureTwo },
  { feature: sharedFeatureThree },
  { feature: sharedFeatureFour },
  { feature: "Priority email and call support" },
  { feature: "Freeze your plan for up to 3 months" },
  { feature: "All API regions included" },
];

const questionsAndAnswers = [
  {
    question: "What does X of valuations per month mean?",
    answer:
      "Refers to the number of valuations you can create in Tracktak each month. For Active and Non-Active plans all unused valuations in that month do not carry over to the next month. If you exceed your number of valuations limit you can always upgrade your plan or wait until next month.",
  },
  {
    question: "What does freezing your plan mean?",
    answer:
      "Need a break from investing? Active Investor and Professional plan lets you freeze your membership for up to 1 or 3 months at no extra cost during 12-month period. The freeze will be applied from your next payment date, please make sure it is added at least 3-4 working days before this date. If you wish to unfreeze your plan sooner, you can! Unfreezing before the original end date, means there is a small charge amount will be added on to your next payment to cover the days. After you have used your 1 or 3-month allowance you no longer can freeze you plan within 12-month period.",
  },
  {
    question: "What happens at the end of my trial?",
    answer:
      "When you start your trial, you get a full account, which gives you access to everything Tracktak has to offer except exporting your valuations to Excel. After 7 days, your subscription will renew based on the plan you select at checkout. We'll send you an email in 3-4 days before your trial expires to remind you. You can also cancel your subscription at any time and it will not renew after the current billing period.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "You can switch from the Non-Active and Active to the Professional plan at any time or downgrade you plan from Professional to Active and Non-Active. You can also change your billing frequency (monthly or yearly) at any time.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Tracktak services are provided on a non-refundable basis. You can cancel your subscription at any time, and it will not auto-renew after the current billing period. Paid service will remain active for the duration of the paid period.",
  },
  {
    question: "What if I want to cancel my plan?",
    answer:
      "We're sorry to see you go. Did you know you can freeze your plan? If you're a Professional or Active Investor, freezing is included as part of your membership! If you still decide to leave Tracktak, you can cancel or downgrade before your next billing period with a single click from your account settings or by sending an email request to support@tracktak.com.",
  },
  {
    question: "Which currency will I be charged in?",
    answer: "All payments are processed in United States Dollars (USD).",
  },
  {
    question: "What kind of payment methods do you accept?",
    answer:
      "We accept any credit or debit card with a MasterCard, Visa, Discover Network, American Express, Diners Club International, or JCB logo. All credit card payments are securely processed through Stripe.",
  },
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
              inputProps={{ "aria-label": "controlled" }}
              onChange={handleOnChangeToggle}
              checked={toggle}
            />
            <Typography sx={{ fontSize: theme.typography.fontSize2 }}>
              Yearly
            </Typography>
          </Stack>
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
          subText="Everything included"
          header="Professional Investor"
          price="$69.99"
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
          subText="Starting from"
          price="$34.99"
          listOfFeatures={listOfFeaturesActive}
          toggle={toggle}
        />
        <PricingPlan
          subText="Starting from"
          header="Non-Active Investor"
          price=" $19.99"
          listOfFeatures={listOfFeaturesNonActive}
          toggle={toggle}
        />
      </BoxPricingPlan>
      <SelectAPIRegion toggle={toggle} />
      <FrequentlyAskedQuestion questionsAndAnswers={questionsAndAnswers} />
    </>
  );
};

export default Pricing;
