import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import SubscribeSection from "../landingPage/SubscribeSection";
import SearchSection from "../landingPage/SearchSection";
import FeaturesSection from "../landingPage/FeaturesSection";
import ProcessSection from "../landingPage/ProcessSection";
import { Container } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{getTitle("Discounted Cash Flow (DCF) Calculator")}</title>
        <link rel="canonical" href={`${resourceName}`} />
      </Helmet>
      <SearchSection />
      <Container maxWidth="lg">
        <FeaturesSection />
        <ProcessSection />
        <SubscribeSection />
        {/* <Footer /> */}
      </Container>
    </>
  );
};

export default Home;
