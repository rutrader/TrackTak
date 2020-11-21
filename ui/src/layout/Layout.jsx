import { Box, Container } from "@material-ui/core";
import React from "react";
import { ReactComponent as TracktakLogo } from "../icons/tracktak.svg";

export const TracktakLogoLayoutContainer = () => (
  <Box sx={{ pt: 0.5, mb: 2.5 }}>
    <TracktakLogo />
  </Box>
);

const Layout = ({ children }) => {
  return (
    <Container maxWidth="md">
      <TracktakLogoLayoutContainer />
      {children}
    </Container>
  );
};

export default Layout;
