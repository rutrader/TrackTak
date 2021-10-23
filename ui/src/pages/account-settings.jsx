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
import ConfirmationDialog from "../components/ConfirmationDialog";
import FreezePlanForm from "../components/FreezePlanForm";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const AccountSettings = () => {
  const { isExternalIdentityProvider } = useAuth();
  const { currentPlan } = useCurrentPlan();
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showFreezePlanDialog, setShowFreezePlanDialog] = useState(false);
  const hasPaymentPlan = currentPlan?.addons?.length > 1;

  const dividerStyle = {
    marginTop: 4,
    marginBottom: 4,
  };

  // TODO API call to get expiration?
  const planExpiration = currentPlan?.expiration
    ? new Date(currentPlan.expiration).toLocaleDateString()
    : "";

  const buttonLargeScreenStyles = {
    position: "absolute",
    mt: 4,
    right: (theme) => theme.spacing(-6),
    top: (theme) => theme.spacing(-3),
  };

  const handleFreezePlanButtonClick = () => {
    setShowFreezePlanDialog(true);
  };

  const handleFreezePlanDialogClose = () => {
    setShowFreezePlanDialog(false);
  };

  const handleFreezePlanDialogConfirm = () => {
    setShowFreezePlanDialog(false);
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
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  ...(!isOnMobile ? buttonLargeScreenStyles : {}),
                }}
              >
                Add Regions
              </Button>
              {hasPaymentPlan && (
                <Typography
                  sx={{
                    color: (theme) => theme.palette.secondary.grey,
                  }}
                  variant="h8"
                  gutterBottom
                >
                  $X/mo. Auto-renews on {planExpiration}
                </Typography>
              )}
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
        <Divider light sx={dividerStyle} />
        {hasPaymentPlan && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
            }}
            onClick={handleFreezePlanButtonClick}
            startIcon={<AcUnitIcon />}
          >
            Freeze Payment Plan
          </Button>
        )}
        <ConfirmationDialog
          open={showFreezePlanDialog}
          onClose={handleFreezePlanDialogClose}
          onConfirm={handleFreezePlanDialogConfirm}
          confirmText="Freeze My Plan"
        >
          <FreezePlanForm />
        </ConfirmationDialog>
      </Paper>
    </>
  );
};

export default withAuthentication(AccountSettings);
