import { Box, Container } from "@material-ui/core";
import React from "react";
import { ReactComponent as TracktakLogo } from "../icons/tracktak.svg";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Box pt={2.5}>
        <TracktakLogo />
      </Box>
      {children}
    </Container>
  );
};

export default Layout;
