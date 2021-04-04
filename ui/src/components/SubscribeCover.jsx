import React from "react";
import {
  FormatRawNumberToCurrency,
  selectCells,
  selectGeneral,
  useHasAllRequiredInputsFilledIn,
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
  const cells = useSelector(selectCells);

  const handleClose = () => {
    setSubscribePopupShown(true);
  };

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
          Unlock the Free {general.code} DCF
        </Typography>
        <Typography color="textPrimary">
          Subscribe to see why {general.name} has an estimated value of{" "}
          <FormatRawNumberToCurrency value={cells.B36.value} />.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <SubscribeMailingList
            subscribeText="View DCF"
            locationSignup="Cover"
            onSubmit={(isSuccess) => {
              if (isSuccess) {
                setSubscribePopupShown(true);
              }
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleClose} color="primary">
            <Typography sx={{ textTransform: "none" }}>No thanks</Typography>
          </Button>
        </Box>
      </Paper>
    </Box>
  ) : null;
};

export default SubscribeCover;
