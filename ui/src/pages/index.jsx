import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import SubscribeSection from "../landingHomepage/sections/SubscribeSection";
import LandingPageHome from "../landingHomepage/LandingPageHome";
import FeaturesSection from "../landingHomepage/sections/FeaturesSection";
import ProcessSection from "../landingHomepage/sections/ProcessSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{getTitle("Discounted Cash Flow (DCF) Calculator")}</title>
        <link rel="canonical" href={`${resourceName}`} />
      </Helmet>
      <LandingPageHome />
      <FeaturesSection />
      <ProcessSection />
      <SubscribeSection />
    </>
  );
};

export default Home;
