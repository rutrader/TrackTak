import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import { Grid } from "@material-ui/core";
import Authentication from "../components/Authentication";
import { navigate } from "gatsby";
import { useAuth } from "../hooks/useAuth";

const SignOut = () => {
  const { session, signOut } = useAuth();

  const handleSuccess = () => {
    navigate("/");
  };

  useEffect(() => {
    if (session) {
      signOut();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{getTitle("Sign out")}</title>
        <link rel="canonical" href={`${resourceName}/sign-out`} />
        <meta name="description" content="Signed out." />
      </Helmet>
      <Grid container justifyContent="center">
        <Grid item>
          <Authentication onSuccess={handleSuccess} />
        </Grid>
      </Grid>
    </>
  );
};

export default SignOut;
