import {
  Box,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { setItem } from "../shared/guardedLocalStorage";
import RoundButton from "./RoundButton";

const EmailInput = withStyles({
  root: {
    flex: 1,
    minWidth: "170px",
    "& input": {
      height: "inherit",
      boxSizing: "border-box",
    },
    "& fieldset": {
      border: "none",
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => {
  const shapePseudo = {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "inherit",
    borderRadius: "50%",
    transform: "scale(1.2)",
  };
  const shape = {
    position: "absolute",
    width: "367px",
    height: "367px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.04)",
    top: "-220px",
    left: "-220px",
    zIndex: -1,
    "&::before": shapePseudo,
    "&::after": {
      ...shapePseudo,
      transform: "scale(1.4)",
    },
  };

  return {
    subscribeWrapper: {
      borderRadius: "30px",
      background: "linear-gradient(to right bottom, #6240c8 0%, #a145fe 100%)",
      position: "relative",
      overflow: "hidden",
      zIndex: 1,
      padding: `${theme.spacing(8.75)} ${theme.spacing(2)}`,
    },
    shapeOne: shape,
    shapeTwo: {
      ...shape,
      top: "auto",
      left: "auto",
      bottom: "-220px",
      right: "-220px",
    },
    row: {
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      display: "flex",
    },
    input: {
      borderRadius: "33px",
      color: "#fff",
      height: "69px",
      border: "1px solid transparent",
      transition: "all 0.3s ease-out 0s",
      backgroundColor: "#9B5FEC",
      "&.Mui-focused": {
        borderColor: "#fff",
      },
    },
  };
});

const SubscribeMailingList = ({ subscribeText = "Join", locationSignup }) => {
  const classes = useStyles();

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
      <EmailInput
        variant="outlined"
        type="email"
        name="MERGE0"
        placeholder="Enter your email"
        InputProps={{
          className: classes.input,
          disableUnderline: true,
        }}
      />
      <RoundButton variant="contained" type="submit">
        <Typography fontSize={20} fontWeight={600}>
          {subscribeText}
        </Typography>
      </RoundButton>
    </Box>
  );
};
export default SubscribeMailingList;
