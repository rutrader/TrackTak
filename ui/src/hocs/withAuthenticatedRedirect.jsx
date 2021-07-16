import { useAuth } from "../hooks/useAuth";
import React, { useEffect } from "react";
import { navigate } from "gatsby";

const withAuthenticatedRedirect = (Component) => {
  const Container = (props) => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/dashboard");
      }
    }, [isAuthenticated]);

    return !isAuthenticated && <Component {...props} />;
  };

  return Container;
};

export default withAuthenticatedRedirect;
