import { Container } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
