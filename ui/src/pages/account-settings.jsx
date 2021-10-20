import React, { useState } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import {
  Divider,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  useTheme,
} from "@material-ui/core";
import ContactDetailsForm from "../components/ContactDetailsForm";
import SettingSection from "../components/SettingSection";
import ChangePasswordForm from "../components/ChangePasswordForm";
import CurrentPlan from "../components/CurrentPlan";
import withAuthentication from "../hocs/withAuthentication";
import { useAuth } from "../hooks/useAuth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import useCurrentPlan, { Plans } from "../hooks/useCurrentPlan";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createCustomerPortal } from "../api/api";

const AccountSettings = () => {
  const { getAccessToken } = useAuth();
  const [session, setSession] = useState();
  const { isExternalIdentityProvider } = useAuth();
  const { currentPlan } = useCurrentPlan();
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dividerStyle = {
    marginTop: 4,
    marginBottom: 4,
  };

  const planExpiration = currentPlan?.expiration
    ? new Date(currentPlan.expiration).toLocaleDateString()
    : "";

  const getValuationsText = () => {
    switch (currentPlan?.type) {
      case Plans.ONE_HOUR_TRIAL:
        return "Unlimited Valuations, US stocks large cap.";
      case Plans.PRO:
        return "Unlimited Valuations";
      default:
        return "Valuations used x/y";
    }
  };

  //custoemr portal POST on handle click
  const handleOnClickCustomerPortal = async () => {
    const token = await getAccessToken();
    const { data } = await createCustomerPortal(token?.jwtToken);
    setSession(session);

    window.location.href = data.url;
  };

  const buttonLargeScreenStyles = {
    position: "absolute",
    mt: 4,
    right: (theme) => theme.spacing(-6),
    top: (theme) => theme.spacing(-3),
  };

  return (
    <>
      <Helmet>
        <title>{getTitle("Account Settings")}</title>
        <link rel="canonical" href={`${resourceName}/account-settings`} />
        <meta name="description" content="Account Settings." />
      </Helmet>
      <Paper
        sx={{
          padding: (theme) =>
            `${theme.spacing(4)} ${theme.spacing(4)} ${theme.spacing(
              8,
            )} ${theme.spacing(4)}`,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Account Settings
        </Typography>
        <Divider light sx={dividerStyle} />
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm={5}>
            <SettingSection
              heading="Current Plan"
              subHeading={currentPlan?.type}
              sx={{
                position: "relative",
              }}
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
            >
              {currentPlan?.type !== Plans.PRO && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    ...(!isOnMobile ? buttonLargeScreenStyles : {}),
                  }}
                >
                  Upgrade my plan
                </Button>
              )}
              <Typography
                sx={{
                  color: (theme) => theme.palette.secondary.grey,
                }}
                variant="h8"
                gutterBottom
              >
                {getValuationsText()}
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.secondary.grey,
                }}
                variant="h8"
                gutterBottom
              >
                $X/mo. Auto-renews on {planExpiration}
              </Typography>
              <CurrentPlan />
            </SettingSection>
          </Grid>
          <Divider orientation="vertical" light flexItem sx={dividerStyle} />
          <Grid item xs={12} sm={5}>
            <SettingSection
              heading="Payment Method"
              icon={
                <PaymentIcon
                  fontSize="large"
                  color="action"
                  sx={{
                    mr: 0.5,
                    color: (theme) => theme.palette.primary.light,
                  }}
                />
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: 3,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  **** **** **** 1543
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    mt: 3,
                  }}
                  onClick={handleOnClickCustomerPortal}
                >
                  Update Details
                </Button>
              </Box>
            </SettingSection>
          </Grid>
        </Grid>

        <Divider light sx={dividerStyle} />

        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm={5}>
            <SettingSection
              heading="Your Profile"
              subHeading="Contact Details"
              icon={
                <AccountBoxIcon
                  fontSize="large"
                  color="action"
                  sx={{
                    mr: 0.5,
                    color: (theme) => theme.palette.primary.light,
                  }}
                />
              }
            >
              <ContactDetailsForm />
            </SettingSection>
          </Grid>
          {!isExternalIdentityProvider && (
            <>
              <Divider
                orientation="vertical"
                light
                flexItem
                sx={dividerStyle}
              />
              <Grid item xs={12} sm={5}>
                <SettingSection
                  heading="Security"
                  subHeading="Change Password"
                  icon={
                    <LockIcon
                      fontSize="large"
                      color="action"
                      sx={{
                        mr: 0.5,
                        color: (theme) => theme.palette.primary.light,
                      }}
                    />
                  }
                >
                  <ChangePasswordForm />
                </SettingSection>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default withAuthentication(AccountSettings);
