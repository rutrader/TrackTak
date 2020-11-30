import { Box, Button, TextField, withStyles } from "@material-ui/core";
import React from "react";

const StyledTextField = withStyles({
  "@global": {
    ".MuiInputBase-root": {
      borderTopRightRadius: "0px",
      borderBottomRightRadius: "0px",
    },
  },
})(TextField);

const SubscribeMailingList = ({ subscribeText = "Join" }) => {
  return (
    <Box>
      <form
        action="https://tracktak.us18.list-manage.com/subscribe/post?u=77ebb5b550a15c12b38bd913e&id=81167d9c5b"
        method="POST"
      >
        <input type="hidden" name="u" value="a123cd45678ef90g7h1j7k9lm" />
        <input type="hidden" name="id" value="ab2c468d10" />
        <Box sx={{ display: "flex", justifyContent: "center " }}>
          <StyledTextField
            className="landing-page-email-input"
            id="MERGE0"
            name="MERGE0"
            placeholder="Enter your email"
            type="email"
            fullWidth
          />
          <Button
            style={{
              marginLeft: "-1px",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              whiteSpace: "nowrap",
            }}
            variant="contained"
          >
            {subscribeText}
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default SubscribeMailingList;
