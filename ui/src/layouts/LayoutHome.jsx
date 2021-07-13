import { Container } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import featureToggle from "../shared/featureToggle";
import { signInLink } from "../shared/getHeaderLinks";

const LayoutHome = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const links = [];

  if (featureToggle.AUTHENTICATION && !isAuthenticated) {
    links.push(signInLink);
  }

  return (
    <Container maxWidth="xl">
      <Header hideSearch links={links} />
      {children}
    </Container>
  );
};

export default LayoutHome;
