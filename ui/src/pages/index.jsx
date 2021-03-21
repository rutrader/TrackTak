import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import SubscribeSection from "../landingPage/SubscribeSection";
import SearchSection from "../landingPage/SearchSection";
import FeaturesSection from "../landingPage/FeaturesSection";
// import ProcessSection from "../landingPage/ProcessSection";
import { Box, Container } from "@material-ui/core";

const Section = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        paddingBottom: 8.75,
        ...sx,
      }}
      {...props}
    />
  );
};

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{getTitle("Discounted Cash Flow (DCF) Calculator")}</title>
        <link rel="canonical" href={`${resourceName}`} />
      </Helmet>
      <SearchSection sx={{ mb: 2 }} />
      <Container maxWidth="lg">
        <Section>
          <FeaturesSection />
        </Section>
        {/* <ProcessSection /> */}
        <SubscribeSection />
        {/* <Footer /> */}
      </Container>
    </>
  );
};

export default Home;
