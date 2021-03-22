import { Box, Typography } from "@material-ui/core";
import React from "react";
import { setItem } from "../shared/guardedLocalStorage";
import RoundButton from "./RoundButton";
import TTRoundInput from "./TTRoundInput";

const SubscribeMailingList = ({
  subscribeText = "Subscribe",
  locationSignup,
  inputColor,
}) => {
  return (
    <Box
      component="form"
      target="_blank"
      action="https://tracktak.us18.list-manage.com/subscribe/post"
      method="POST"
      onSubmit={() => {
        setItem("subscribePopupShown", "true");
      }}
      sx={{
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
        visibility: "visible",
        animationDelay: "0.8s",
        animationName: "fadeInUp",
        maxWidth: "600px",
        width: "100%",
        gap: 1.5,
        mt: 3,
      }}
    >
      <input type="hidden" name="u" value="77ebb5b550a15c12b38bd913e" />
      <input type="hidden" name="id" value="81167d9c5b" />
      <input type="hidden" name="LOCATION" value={locationSignup} />
      <TTRoundInput
        type="email"
        name="MERGE0"
        placeholder="Enter your email"
        color={inputColor}
        InputProps={{
          color: "secondary",
        }}
        style={{
          flex: 1,
          minWidth: "170px",
        }}
      />
      <RoundButton variant="contained" type="submit">
        <Typography fontSize={20} sx={{ textTransform: "none" }}>
          {subscribeText}
        </Typography>
      </RoundButton>
    </Box>
  );
};
export default SubscribeMailingList;
