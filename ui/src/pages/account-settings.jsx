import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import { Divider, Paper, Typography } from "@material-ui/core";
import ContactDetailsForm from "../components/ContactDetailsForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import withAuthentication from "../hocs/withAuthentication";

const AccountSettings = () => {
  const dividerStyle = {
    marginTop: (theme) => `${theme.spacing(4)}`,
    marginBottom: (theme) => `${theme.spacing(4)}`,
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
        <ContactDetailsForm />
        <Divider light sx={dividerStyle} />
        <ChangePasswordForm />
      </Paper>
    </>
  );
};

export default withAuthentication(AccountSettings);
