import { Box, Flex } from "grid-styled";
import React from "react";
import { Absolute, Relative, Label, Input } from "rebass";
import { ReactComponent as EmailIcon } from "../icons/email-green.svg";
import Button from "../utils/Button";

const SubscribeMailingList = ({
  subscribeText = "Join List",
}) => (
  <Box mx="auto">
    <form>
      <Flex justifyContent="center">
        <Relative>
          <Input
            px={63}
            py={27}
            fontSize={17}
            bg="white"
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <Absolute top="50%" left={30} style={{ transform: "translateY(-50%)" }}>
            <Label htmlFor="email" mb={0}>
              <EmailIcon />
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
