import React, { useState } from "react";
import { Box, TextField, Typography, withStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getFinancials } from "../redux/actions/financialsActions";
import { LoadingButton } from "@material-ui/lab";

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
})(LoadingButton);

const Home = () => {
  const [ticker, setTicker] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.financials.isLoading);

  return (
    <>
      <Box>
        <Box
          component="form"
          sx={{ display: "flex", mt: 0.5, mb: 1.5 }}
          onSubmit={(e) => {
            e.preventDefault();

            dispatch(getFinancials(ticker));
          }}
        >
          <TickerTextField
            variant="outlined"
            label="Stock ticker e.g. AMZN"
            fullWidth
            onChange={(e) => {
              setTicker(e.currentTarget.value);
            }}
          />
          <SubmitButton
            pending={isLoading}
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
