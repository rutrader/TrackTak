import { Box, Typography, FormControlLabel } from "@material-ui/core";
import axios from "../../../packages/intrinsic-valuations/src/api/axios";
import jsonAdapter from "axios-jsonp";
import React, { useState } from "react";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";
import Checkbox from "@material-ui/core/Checkbox";

const SubscribeMailingList = ({ locationSignup, onSubmit = () => {} }) => {
  const [checked, setChecked] = useState(false);
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
            MERGE0: checked,
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
            setChecked(true);

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
          mt: 2,
        }}
      >
        <FormControlLabel
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
          inputProps={{ "aria-label": "controlled" }}
          control={<Checkbox color="primary" />}
          label={
            <Typography>
              Occasionally send me updates on new features
            </Typography>
          }
        />
      </Box>
    </>
  );
};
export default SubscribeMailingList;
