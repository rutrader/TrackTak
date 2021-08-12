import { Container } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { goToSpreadsheetLink } from "../shared/getHeaderLinks";

const LayoutHome = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const links = [];

  if (!isAuthenticated) {
    links.push(goToSpreadsheetLink);
  }

  return (
    <Container maxWidth="xl">
      <Header hideSearch links={links} />
      {children}
    </Container>
  );
};

export default LayoutHome;
