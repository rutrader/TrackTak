import { Container, useTheme } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const LayoutFullScreen = ({ children }) => {
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
      <Header position="relative" />
      {children}
    </Container>
  );
};

export default LayoutFullScreen;
