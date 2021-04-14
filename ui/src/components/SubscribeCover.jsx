import React from "react";
import {
  selectGeneral,
  useHasAllRequiredInputsFilledIn,
  useIsClient,
} from "@tracktak/dcf-react";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import SubscribeMailingList from "./SubscribeMailingList";
import subscribePopupShownHook from "../hooks/subscribePopupShownHook";
import { useSelector } from "react-redux";

const SubscribeCover = () => {
  const [
    subscribePopupShown,
    setSubscribePopupShown,
  ] = subscribePopupShownHook();
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();
  const general = useSelector(selectGeneral);
  const isOnClient = useIsClient();

  const handleClose = () => {
    setSubscribePopupShown(true);
  };

  if (!isOnClient) return null;

  return !subscribePopupShown && hasAllRequiredInputsFilledIn ? (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "30%",
        transform: "translate(-50%, -30%)",
        minWidth: "285px",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Unlock Free {general.code} DCF
        </Typography>
        <Typography color="textPrimary">
          Get notified immediately when we release new features for{" "}
          {general.name}.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <SubscribeMailingList
            subscribeText="Subscribe"
            locationSignup="Cover"
            formSx={{
              maxWidth: "100%",
            }}
            onSubmit={(isSuccess) => {
              if (isSuccess) {
                setSubscribePopupShown(true);
              }
            }}
            cancelButton={
              <Button onClick={handleClose} color="primary" variant="outlined">
                <Typography sx={{ textTransform: "none" }}>View DCF</Typography>
              </Button>
            }
          />
        </Box>
      </Paper>
    </Box>
  ) : null;
};

export default SubscribeCover;
