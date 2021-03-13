import { Container } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import Footer from "../landingHomepage/Footer";

const LayoutHome = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Header hideSearch />
      {children}
      <Footer />
    </Container>
  );
};

export default LayoutHome;
