import { useAuth } from "../hooks/useAuth";
import React, { useEffect } from "react";
import { navigate } from "gatsby";
import PageSpinner from "../components/PageSpinner";

const withAuthentication = (Component) => {
  const Container = (props) => {
    const { isAuthenticated, hasLoadedAuthDetails } = useAuth();

    useEffect(() => {
      if (!isAuthenticated && hasLoadedAuthDetails) {
        navigate("/sign-in");
      }
    }, [hasLoadedAuthDetails, isAuthenticated]);

    if (!hasLoadedAuthDetails) {
      return <PageSpinner />;
    }

    return isAuthenticated && <Component {...props} />;
  };

  return Container;
};

export default withAuthentication;
