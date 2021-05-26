import React, { useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import { Grid } from "@material-ui/core";
import Authentication from "../components/Authentication";
import { navigate } from "gatsby";
import { useAuth } from "../hooks/useAuth";

const SignIn = ({ location }) => {
  const { isAuthenticated } = useAuth();

  const navigateToPreviousPage = useCallback(() => {
    if (location.state?.referrer) {
      navigate(-1);
      return;
    }
    navigate("/");
  }, [location]);

  const handleSuccess = () => {
    navigateToPreviousPage();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateToPreviousPage();
    }
  }, [isAuthenticated, navigateToPreviousPage]);

  return (
    <>
      <Helmet>
        <title>{getTitle("Sign in")}</title>
        <link rel="canonical" href={`${resourceName}/sign-in`} />
        <meta name="description" content="Sign in to Tracktak." />
      </Helmet>
      <Grid container justifyContent="center">
        <Grid item>
          <Authentication onSuccess={handleSuccess} location={location} />
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
