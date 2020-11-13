import { Box, Flex } from "grid-styled";
import React from "react";
import { Absolute, Relative, Label, Input } from "rebass";
import { ReactComponent as EmailIcon } from "../icons/email-green.svg";
import Button from "../utils/Button";

const SubscribeMailingList = ({
  subscribeText,
}) => (
  <Box mx="auto">
    <form action="https://tracktak.us18.list-manage.com/subscribe/post?u=77ebb5b550a15c12b38bd913e&id=81167d9c5b" method="POST">
      <input type="hidden" name="u" value="a123cd45678ef90g7h1j7k9lm" />
      <input type="hidden" name="id" value="ab2c468d10" />
      <Flex justifyContent="center">
        <Relative>
          <Input
            px={63}
            py={27}
            fontSize={17}
            bg="white"
            id="MERGE0"
            name="MERGE0"
            placeholder="Enter your email"
            type="email"
          />
          <Absolute top="50%" left={30} style={{ transform: "translateY(-50%)" }}>
            <Label htmlFor="MERGE0" mb={0}>
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
