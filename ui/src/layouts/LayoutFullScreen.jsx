import { Container } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import TTTabs from "../components/TTTabs";

const LayoutFullScreen = ({ children, ticker }) => {
  return (
    <Container maxWidth={false}>
      <Header />
      {children}
      <TTTabs ticker={ticker} />
    </Container>
  );
};

export default LayoutFullScreen;
