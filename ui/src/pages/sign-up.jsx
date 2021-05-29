import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import { Grid } from "@material-ui/core";
import Authentication, {
  AUTHENTICATION_FORM_STATE,
} from "../components/Authentication";
import { navigate } from "gatsby-link";
import { useAuth } from "../hooks/useAuth";

const SignUp = ({ location }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleSuccess = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <Helmet>
        <title>{getTitle("Sign up")}</title>
        <link rel="canonical" href={`${resourceName}/sign-up`} />
        <meta name="description" content="Sign up to Tracktak." />
      </Helmet>
      <Grid container justifyContent="center">
        <Grid item>
          <Authentication
            initialState={AUTHENTICATION_FORM_STATE.SIGN_UP}
            onSuccess={handleSuccess}
            location={location}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
