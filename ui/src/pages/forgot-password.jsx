import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import { Grid } from "@material-ui/core";
import Authentication, {
  AUTHENTICATION_FORM_STATE,
} from "../components/Authentication";
import { navigate } from "gatsby";
import { useAuth } from "../hooks/useAuth";

const SignIn = ({ location }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>{getTitle("Sign in")}</title>
        <link rel="canonical" href={`${resourceName}/sign-up`} />
        <meta name="description" content="Tracktak password recovery." />
      </Helmet>
      <Grid container justifyContent="center">
        <Grid item>
          <Authentication
            initialState={AUTHENTICATION_FORM_STATE.FORGOTTEN_PASSWORD}
            onSuccess={handleSuccess}
            location={location}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
