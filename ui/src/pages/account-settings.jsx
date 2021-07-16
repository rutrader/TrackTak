import React, { useState } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import { Divider, Paper, Typography } from "@material-ui/core";
import ContactDetailsForm from "../components/ContactDetailsForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import VerificationCodeDialog from "../components/VerificationCodeDialog";
import withAuthentication from "../hocs/withAuthentication";
import VerifyEmailLink from "../components/VerifyEmailLink";

const AccountSettings = () => {
  const [showVerificationCodeDialog, setShowVerificationCodeDialog] = useState(
    false,
  );
  const dividerStyle = {
    marginTop: (theme) => `${theme.spacing(4)}`,
    marginBottom: (theme) => `${theme.spacing(4)}`,
  };

  const handleCloseVerificationCodeDialog = () =>
    setShowVerificationCodeDialog(false);
  const handleOpenVerificationCodeDialog = () =>
    setShowVerificationCodeDialog(true);

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
        <VerifyEmailLink
          sx={{
            mt: 3,
          }}
          onVerificationCodeDialogOpen={handleOpenVerificationCodeDialog}
          text="You must verify your account before you can change any details"
        />
        <Divider light sx={dividerStyle} />
        <ContactDetailsForm />
        <Divider light sx={dividerStyle} />
        <ChangePasswordForm />
        <VerificationCodeDialog
          open={showVerificationCodeDialog}
          onClose={handleCloseVerificationCodeDialog}
        />
      </Paper>
    </>
  );
};

export default withAuthentication(AccountSettings);
