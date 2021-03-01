import { Box, Button, TextField, withStyles } from "@material-ui/core";
import React from "react";
import { setItem } from "../shared/guardedLocalStorage";

const StyledTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      borderTopRightRadius: "0px",
      borderBottomRightRadius: "0px",
    },
  },
})(TextField);

const SubscribeMailingList = ({ subscribeText = "Join", locationSignup }) => {
  return (
    <Box>
      <form
        target="_blank"
        action="https://tracktak.us18.list-manage.com/subscribe/post"
        method="POST"
        onSubmit={() => {
          setItem("subscribePopupShown", "true");
        }}
      >
        <input type="hidden" name="u" value="77ebb5b550a15c12b38bd913e" />
        <input type="hidden" name="id" value="81167d9c5b" />
        <input type="hidden" name="LOCATION" value={locationSignup} />
        <Box sx={{ display: "flex", justifyContent: "center " }}>
          <StyledTextField
            className="landing-page-email-input"
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
