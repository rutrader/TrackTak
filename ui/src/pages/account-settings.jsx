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
  Stack,
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
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearIcon from "@mui/icons-material/Clear";
import { navigate } from "gatsby";

const AccountSettings = () => {
  const { isExternalIdentityProvider } = useAuth();
  const { currentPlan } = useCurrentPlan();
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showFreezePlanDialog, setShowFreezePlanDialog] = useState(false);

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
                  startIcon={<AutoAwesomeIcon />}
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
                $X/mo.{" "}
                {currentPlan?.type === Plans.ONE_HOUR_TRIAL
                  ? "Expires on"
                  : "Auto-renews on"}{" "}
                {planExpiration}
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
        <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: "space-around" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
            }}
            onClick={handleFreezePlanButtonClick}
          >
            <AcUnitIcon
              sx={{
                mr: 0.5,
              }}
            />
            Freeze Payment Plan
          </Button>
          <Button
            startIcon={<ClearIcon />}
            sx={{
              textTransform: "none",
            }}
            onClick={() => {
              navigate("/switching-plan");
            }}
          >
            End Plan And Benefits
          </Button>
        </Stack>
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
