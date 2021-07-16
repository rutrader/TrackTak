import { useAuth } from "../hooks/useAuth";
import React, { useEffect } from "react";
import { navigate } from "gatsby";
import PageSpinner from "../components/PageSpinner";

const withAuthenticatedRedirect = (Component) => {
  const Container = (props) => {
    const { isAuthenticated, hasLoadedAuthDetails } = useAuth();

    useEffect(() => {
      if (isAuthenticated && hasLoadedAuthDetails) {
        navigate("/dashboard");
      }
    }, [hasLoadedAuthDetails, isAuthenticated]);

    if (!hasLoadedAuthDetails) {
      return <PageSpinner />;
    }

    return !isAuthenticated && <Component {...props} />;
  };

  return Container;
};

export default withAuthenticatedRedirect;
