import { Box, Typography } from "@material-ui/core";
import { axios } from "@tracktak/dcf-react";
import jsonAdapter from "axios-jsonp";
import React, { useState } from "react";
import RoundButton from "./RoundButton";
import TTRoundInput from "./TTRoundInput";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";
import subscribePopupShownHook from "../hooks/subscribePopupShownHook";

const SubscribeMailingList = ({
  subscribeText = "Subscribe",
  locationSignup,
  inputColor,
  onSubmit = () => {},
  cancelButton,
  formSx,
}) => {
  const [, setSubscribePopupShown] = subscribePopupShownHook();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <Box
        component="form"
        onSubmit={async (e) => {
          e.preventDefault();

          const serializedData = queryString.stringify({
            id: "81167d9c5b",
            LOCATION: locationSignup,
            MERGE0: email,
          });

          const {
            data: { result, msg: message },
          } = await axios({
            url: `https://tracktak.us18.list-manage.com/subscribe/post-json?u=77ebb5b550a15c12b38bd913e&${serializedData}`,
            adapter: jsonAdapter,
            callbackParamName: "c",
          });

          const isSuccess = result === "success";

          if (isSuccess) {
            setSubscribePopupShown(true);
            setEmail("");

            dispatch(
              setMessage({
                severity: "success",
                message,
              }),
            );
          } else {
            dispatch(
              setMessage({
                severity: "error",
                message,
              }),
            );
          }

          onSubmit(isSuccess);
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
          ...formSx,
        }}
      >
        <TTRoundInput
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          color={inputColor}
          InputProps={{
            color: "secondary",
          }}
          sx={{
            flex: 1,
            minWidth: "170px",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <RoundButton variant="contained" type="submit" sx={{ mb: 2.5 }}>
            <Typography fontSize={20} sx={{ textTransform: "none" }}>
              {subscribeText}
            </Typography>
          </RoundButton>
          {cancelButton}
        </Box>
      </Box>
    </>
  );
};
export default SubscribeMailingList;
