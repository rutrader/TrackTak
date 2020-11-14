import React from "react";
import { Container, Text, Absolute, Relative } from "rebass";
import { Box, Flex } from "grid-styled";
import styled from "styled-components";
import { ReactComponent as BackgroundPurple } from "../icons/backgroundPurple.svg";
import { ReactComponent as Check } from "../icons/check.svg";
import { ReactComponent as TracktakLogo } from "../icons/tracktak.svg";
import SubscribeMailingList from "./SubscribeMailingList";
import tracktakDashboard  from "../icons/tracktakDashboard.png";

const GreenCheck = styled(Check)`
  margin-right: 10px;
  min-width: 30px;
  min-height: 30px;
  fill: ${({ theme }) => theme.colors.primary};
`;

const StepItem = ({ children, ...props }) => (
  <Box
    is="li"
    width={["initial", "60%", "100%"]}
    mx={["5%", "20%", 0]}
    my={12}
    {...props}
  >
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
        <Text fontWeight="bold" fontSize={[40, 60]} mt={30} color="#292929" textAlign="center">
          Goodbye, spreadsheets.
          <Box>Hello, automated Discounted Cash Flows.</Box>
        </Text>
        <Box style={{ display: 'flex' }} mt={60}>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', maxWidth: '400px', marginRight: '5px' }}>
            <StepItem>Automates your models inputs based on historical and current data.</StepItem>
            <StepItem>Store all of your model variations in one place instead of 100’s of spreadsheets.</StepItem>
            <StepItem>Diagnoses errors and unrealistic free cash flows in your models.</StepItem>
          </Box>
          <img src={tracktakDashboard} alt="tracktak DCF dashboard" style={{ filter: 'drop-shadow(4px 10px 5px rgba(0,0,0,0.3))', borderRadius: '5px', width: '544px', height: '278px' }} />
        </Box>
      </Box>
      <Box mt="auto" mb={65}>
        <Text
          textAlign="center"
          mb={30}
          fontWeight="bold"
          fontSize={28}
          color="white"
        >
          Sign up today to start your free trial first when we launch.
        </Text>
        <GetStartedMailingList />
      </Box>
    </Container>
    <Absolute style={{ width: "100%", height: 300, bottom: 0 }} zIndex={-1}>
      <BackgroundPurple
        height="100%"
        width="100%"
        style={{ transform: "rotateX(180deg)" }}
      />
    </Absolute>
  </Relative>
);

export default LandingPage;
