import { useAuth } from "../hooks/useAuth";
import React, { useEffect } from "react";
import { navigate } from "gatsby";

const withAuthentication = (Component) => {
  const Container = (props) => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/sign-in");
      }
    }, [isAuthenticated]);

    return isAuthenticated && <Component {...props} />;
  };

  return Container;
};

export default withAuthentication;
