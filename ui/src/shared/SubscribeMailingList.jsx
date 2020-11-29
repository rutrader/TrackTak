import { Box, Button, TextField } from "@material-ui/core";
import React from "react";
import { ReactComponent as EmailIcon } from "../icons/email-green.svg";

const SubscribeMailingList = ({ subscribeText = "Join" }) => (
  <Box sx={{ mx: "auto" }}>
    <form
      action="https://tracktak.us18.list-manage.com/subscribe/post?u=77ebb5b550a15c12b38bd913e&id=81167d9c5b"
      method="POST"
    >
      <input type="hidden" name="u" value="a123cd45678ef90g7h1j7k9lm" />
      <input type="hidden" name="id" value="ab2c468d10" />
      <Box sx={{ display: "flex", justifyContent: "center " }}>
        <Box sx={{ position: "relative" }}>
          <TextField
            sx={{
              px: 63,
              py: 27,
            }}
            className="landing-page-email-input"
            id="MERGE0"
            name="MERGE0"
            placeholder="Enter your email"
            type="email"
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 30,
              transform: "translateY(-50%)",
            }}
          >
            <label htmlFor="MERGE0">
              <EmailIcon className="landing-page-email-icon" />
            </label>
          </Box>
        </Box>
        <Button>{subscribeText}</Button>
      </Box>
    </form>
  </Box>
);

export default SubscribeMailingList;
