import { getUrlAuthParameters, useAuth } from "../hooks/useAuth";
import React, { useCallback, useEffect } from "react";
import { navigate } from "gatsby";
import PageSpinner from "../components/PageSpinner";
import { setMessage } from "../redux/actions/snackbarActions";
import { useDispatch } from "react-redux";

const withAuthentication = (Component) => {
  const Container = (props) => {
    const {
      isAuthenticated,
      hasLoadedAuthDetails,
      verificationFlow,
    } = useAuth();
    const dispatch = useDispatch();

    const handleVerificationFailure = useCallback(() => {
      dispatch(
        setMessage({
          message: "Failed to update your details",
          severity: "error",
        }),
      );
    }, [dispatch]);

    const handleVerificationSuccess = useCallback(() => {
      dispatch(
        setMessage({
          message: "Successfully updated your details",
          severity: "success",
        }),
      );
    }, [dispatch]);

    useEffect(() => {
      if (!isAuthenticated && hasLoadedAuthDetails) {
        navigate("/sign-in");
      }
    }, [
      verificationFlow,
      hasLoadedAuthDetails,
      isAuthenticated,
      props.location.search,
    ]);

    useEffect(() => {
      const authParameters = getUrlAuthParameters();
      if (authParameters.code) {
        verificationFlow.sendChallengeAnswer(
          authParameters.code,
          handleVerificationSuccess,
          handleVerificationFailure,
          handleVerificationFailure,
        );
      }
    }, [
      handleVerificationFailure,
      handleVerificationSuccess,
      verificationFlow,
    ]);

    if (!hasLoadedAuthDetails) {
      return <PageSpinner />;
    }

    return isAuthenticated && <Component {...props} />;
  };

  return Container;
};

export default withAuthentication;
