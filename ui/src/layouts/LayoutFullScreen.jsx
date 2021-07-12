import { Container, useTheme } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useAuth } from "../hooks/useAuth";
import { getHeaderLinks } from "../shared/getHeaderLinks";

const LayoutFullScreen = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const links = getHeaderLinks(isAuthenticated);
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let padding;

  if (isOnMobile) {
    padding = {
      paddingLeft: "0px",
      paddingRight: "0px",
    };
  }

  return (
    <Container
      sx={{
        ...padding,
      }}
      maxWidth={false}
    >
      <Header position="relative" links={links} />
      {children}
    </Container>
  );
};

export default LayoutFullScreen;
