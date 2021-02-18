import React from "react";
import { Container, Text, Absolute, Relative } from "rebass";
import { Box, Flex } from "grid-styled";
import styled from "styled-components";
import { ReactComponent as BackgroundPurple } from "../images/backgroundPurple.svg";
import { ReactComponent as Check } from "../images/check.svg";
import { ReactComponent as TracktakLogo } from "../images/tracktak.svg";
import SubscribeMailingList from "./SubscribeMailingList";
import tracktakDashboard from "../images/tracktakDashboard.png";

const GreenCheck = styled(Check)`
  margin-right: 10px;
  min-width: 30px;
  min-height: 30px;
  fill: ${({ theme }) => theme.colors.primary};
`;

const StepItem = ({ children, ...props }) => (
  <Box is="li" my={10} {...props}>
    <Flex alignItems="center">
      <GreenCheck />
      <Text fontSize={21}>{children}</Text>
    </Flex>
  </Box>
);
const GetStartedMailingList = () => (
  <SubscribeMailingList
    subscribeText="Sign Me Up"
    submitSucceededMessage={
      <Flex justifyContent="center">
        Thank you for subscribing! We will notify you when we are live.
      </Flex>
    }
  />
);

const LandingPage = () => (
  <Relative style={{ height: "100%" }}>
    <Container
      pt={20}
      maxWidth={1100}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Box>
        <TracktakLogo />
        <Text
          className="landing-page-title"
          fontWeight="bold"
          fontSize={40}
          mt={30}
          color="#292929"
          textAlign="center"
        >
          Goodbye, spreadsheets.
          <Box>Hello, automated Discounted Cash Flows.</Box>
        </Text>
        <Box mt={[30, 30, 60]}>
          <Flex
            flexWrap="wrap"
            justifyContent={["center", "center", "initial"]}
          >
            <Box
              mr={[0, 0, 20]}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                flex: 0.78,
                minWidth: "300px",
              }}
            >
              <StepItem>
                Automates your models inputs based on historical and current
                data.
              </StepItem>
              <StepItem>
                Store all of your model variations in one place instead of 100’s
                of spreadsheets.
              </StepItem>
              <StepItem>
                Diagnoses errors and unrealistic free cash flows in your models.
              </StepItem>
            </Box>
            <Box my={[30, 30, "initial"]}>
              <img
                src={tracktakDashboard}
                alt="tracktak DCF dashboard"
                style={{
                  filter: "drop-shadow(4px 10px 5px rgba(0,0,0,0.3))",
                  borderRadius: "5px",
                  width: "100%",
                  maxWidth: "544px",
                }}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box mt="auto" mb={65}>
        <Text
          className="landing-page-sign-up-today-text"
          textAlign="center"
          mb={30}
          fontWeight="bold"
          fontSize={28}
          color="white"
        >
          Sign up today to get exclusive access to the beta and 50% off for
          life.
        </Text>
        <GetStartedMailingList />
      </Box>
    </Container>
    <Absolute
      className="landing-page-background-purple"
      style={{ width: "100%", height: 300, bottom: 0 }}
      zIndex={-1}
    >
      <BackgroundPurple
        height="100%"
        width="100%"
        style={{ transform: "rotateX(180deg)" }}
      />
    </Absolute>
  </Relative>
);

export default LandingPage;
