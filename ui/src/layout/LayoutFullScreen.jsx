import { Container } from "@material-ui/core";
import React from "react";
import { TracktakLogoLayoutContainer } from "./Layout";

const LayoutFullScreen = ({ children }) => {
  return (
    <Container maxWidth={false}>
      <TracktakLogoLayoutContainer />
      {children}
    </Container>
  );
};

export default LayoutFullScreen;
