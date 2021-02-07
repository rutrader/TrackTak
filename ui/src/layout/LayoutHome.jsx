import React from "react";
import Header from "../components/Header";
import Footer from "../landingHomepage/Footer";

const LayoutHome = ({ children }) => {
  return (
    <>
      <Header hideSearch />
      {children}
      <Footer />
    </>
  );
};

export default LayoutHome;
