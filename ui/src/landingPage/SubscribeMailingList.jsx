import { Box, Flex } from "grid-styled";
import React from "react";
import { Absolute, Relative, Label, Input } from "rebass";
import EmailIcon from "../assets/email-green.svg";
import Button from "./Button";

const SubscribeMailingList = ({ subscribeText }) => (
  <Box mx="auto">
    <form
      action="https://tracktak.us18.list-manage.com/subscribe/post"
      method="POST"
    >
      <input type="hidden" name="u" value="77ebb5b550a15c12b38bd913e" />
      <input type="hidden" name="id" value="81167d9c5b" />
      <input type="hidden" name="LOCATION" value="landingPage" />
      <Flex justifyContent="center">
        <Relative>
          <Input
            className="landing-page-email-input"
            px={63}
            py={27}
            fontSize={17}
            bg="white"
            name="MERGE0"
            placeholder="Enter your email"
            type="email"
          />
          <Absolute
            top="50%"
            left={30}
            style={{ transform: "translateY(-50%)" }}
          >
            <Label htmlFor="MERGE0" mb={0}>
              <EmailIcon className="landing-page-email-icon" />
            </Label>
          </Absolute>
        </Relative>
        <Button
          ml={15}
          fontSize={17}
          px={[20, 76]}
          style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}
        >
          {subscribeText}
        </Button>
      </Flex>
    </form>
  </Box>
);

export default SubscribeMailingList;
