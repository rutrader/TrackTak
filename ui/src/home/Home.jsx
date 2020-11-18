import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { financialsAction } from "../redux/actions/financialsAction";

const TickerTextField = withStyles({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
})(TextField);

const SubmitButton = withStyles({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    position: "relative",
    right: "1px",
  },
})(Button);

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(financialsAction("AMZN"));
  }, [dispatch]);
  return (
    <>
      <Box>
        <Box display="flex" mt={0.5} mb={1.5}>
          <TickerTextField
            variant="filled"
            label="Stock ticker e.g. AMZN"
            fullWidth
          />
          <SubmitButton
            color="primary"
            variant="contained"
            size="large"
            css="margin-left: 10px;"
          >
            SUBMIT
          </SubmitButton>
        </Box>
      </Box>
      <Typography color="textSecondary">
        * This must be a yahoo finance ticker
      </Typography>
    </>
  );
};

export default Home;
