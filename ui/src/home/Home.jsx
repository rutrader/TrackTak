import React, { useState } from "react";
import { Box, Button, TextField, withStyles } from "@material-ui/core";
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

            const replacedWhiteSpace = ticker.replace(/ /g, "");

            if (replacedWhiteSpace !== "") {
              history.push(`/valuation/${ticker}`);
            }
          }}
        >
          <TickerTextField
            value={ticker}
            fullWidth
            required
            onChange={(e) => {
              setTicker(e.currentTarget.value);
            }}
            placeholder="Stock ticker e.g. AMZN"
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
    </>
  );
};

export default Home;
