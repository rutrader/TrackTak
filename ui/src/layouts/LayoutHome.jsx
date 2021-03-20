import { Container } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";

const LayoutHome = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <Header hideSearch />
      {children}
    </Container>
  );
};

export default LayoutHome;
