import { Container } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";

const LayoutFullScreen = ({ children }) => {
  return (
    <Container maxWidth={false}>
      <Header />
      {children}
    </Container>
  );
};

export default LayoutFullScreen;
