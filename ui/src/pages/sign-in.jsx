import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import { Grid } from "@material-ui/core";
import Authentication from "../components/Authentication";
import { navigate } from "gatsby";

const SignIn = () => {
  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>{getTitle("Sign in")}</title>
        <link rel="canonical" href={`${resourceName}/sign-in`} />
        <meta name="description" content="Sign in to Tracktak." />
      </Helmet>
      <Grid container justifyContent="center">
        <Grid item>
          <Authentication onSuccess={handleSuccess} />
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
