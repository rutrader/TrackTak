import {
  makeStyles,
  Box,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  subscribeWrapper: {
    borderRadius: "30px",
    background: "linear-gradient(to right bottom, #6240c8 0%, #a145fe 100%)",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  shapeOne: {
    position: "absolute",
    width: "367px",
    height: "367px",
    borderRadius: "50%",
    background: "rgba($white, .04)",
    top: "-220px",
    left: "-220px",
    zIndex: "-1",
  },
  shapeTwo: {
    bottom: "-220px",
    right: "-220px",
    top: "auto",
    left: "auto",
  },
  subscribeForm: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    width: "487px",
    borderRadius: "33px",
    background: "rgba($white, .15)",
    color: "white",
    fontSize: "16px",
    marginRight: "15px",
    height: "65px",
    padding: "0 30px",
    border: "1px solid transparent",
    marginBottom: "20px",
  },
  button: {
    color: "#43cea2",
    marginBottom: "20px",
  },
}));

const SubscribeSection = () => {
  const classes = useStyles();
  return (
    <Box className={classes.subscribeWrapper}>
      <div className={classes.shapeOne}></div>
      <div className={classes.shapeTwo}></div>
      <Box>
        <Box>
          <Typography>Newsletter</Typography>
          <Typography>Subscribe Our Newsletter</Typography>
          <Typography>
            Sign up today to get exclusive access to the premium and 50% off for
            life.
          </Typography>
        </Box>
      </Box>
      <Box>
        <form className={classes.subscribeForm}>
          <TextField
            className={classes.input}
            variant="outlined"
            placeholder="Enter your email"
          />
          <Button type="submit" className={classes.button}>
            SUBSCRIBE
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SubscribeSection;
