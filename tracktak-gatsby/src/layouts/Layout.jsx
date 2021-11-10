import { Box, Container } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { getHeaderLinks } from "../shared/getHeaderLinks";

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const links = getHeaderLinks(isAuthenticated);
  return (
    <Container maxWidth="md">
      <Header hideSearch links={links} />
      <Box sx={{ mb: 10 }}>{children}</Box>
    </Container>
  );
};

export default Layout;
