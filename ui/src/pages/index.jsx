import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import SubscribeSection from "../landingPage/SubscribeSection";
import SearchSection from "../landingPage/SearchSection";
import FeaturesSection from "../landingPage/FeaturesSection";
// import ProcessSection from "../landingPage/ProcessSection";
import { Box, Container } from "@material-ui/core";
import Footer from "../landingPage/Footer";
import TestimonialsSection from "../landingPage/TestimonialsSection";
import OurTeamSection from "../landingPage/OurTeamSection";

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
        <meta
          name="description"
          content="Value a company within minutes using our DCF calculator based on Aswath Damodaran's excel spreadsheets."
        />
      </Helmet>
      <Section>
        <SearchSection />
      </Section>
      <Container maxWidth="lg">
        <Section>
          <FeaturesSection />
        </Section>
        <Section>
          <OurTeamSection />
        </Section>
        <Section>
          <TestimonialsSection />
        </Section>
        {/* <ProcessSection /> */}
        <Section>
          <SubscribeSection />
        </Section>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
