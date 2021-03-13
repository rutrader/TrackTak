import { Box, Container } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Header />
      <Box sx={{ mb: 10 }}>{children}</Box>
    </Container>
  );
};

export default Layout;
