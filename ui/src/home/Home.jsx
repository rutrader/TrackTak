import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const TickerTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
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
  const [ticker, setTicker] = useState("");
  const history = useHistory();

  return (
    <>
      <Box>
        <Box
          component="form"
          sx={{ display: "flex", mt: 0.5, mb: 1.5 }}
          onSubmit={async (e) => {
            e.preventDefault();

            history.push(`/valuation/${ticker}`);
          }}
        >
          <TickerTextField
            label="Stock ticker e.g. AMZN"
            fullWidth
            onChange={(e) => {
              setTicker(e.currentTarget.value);
            }}
          />
          <SubmitButton
            color="primary"
            variant="contained"
            size="large"
            type="submit"
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
