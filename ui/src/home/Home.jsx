import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "../axios/axios";

const TickerTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
})(TextField);

const TickerAutocomplete = withStyles({
  root: {
    "& .MuiInputBase-root": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
})(Autocomplete);

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
  const [autoComplete, setAutoComplete] = useState([]);
  const history = useHistory();

  const handleOnChangeAutoComplete = (_, value) => {
    if (value.code && value.exchange) {
      setTicker(`${value.code}.${value.exchange}`);
    }
  };

  const handleOnChangeSearch = (e) => {
    const value = e.target.value;

    if (value.length > 2 && hasTickerNotOnlyWhiteSpace()) {
      axios.get(`/api/v1/autocomplete-query/${value}`).then((response) => {
        setAutoComplete(response.data);
      });
    } else {
      setAutoComplete([]);
    }
    setTicker(value);
  };

  const hasTickerNotOnlyWhiteSpace = () => {
    const replacedWhiteSpace = ticker.replace(/ /g, "");
    return replacedWhiteSpace.length > 0;
  };

  return (
    <>
      <Box>
        <Box
          component="form"
          sx={{ display: "flex", mt: 0.5, mb: 1.5 }}
          onSubmit={async (e) => {
            e.preventDefault();
            if (hasTickerNotOnlyWhiteSpace()) {
              history.push(`/valuation/${ticker}`);
            }
          }}
        >
          <div style={{ width: "100%" }}>
            <TickerAutocomplete
              onChange={handleOnChangeAutoComplete}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              getOptionLabel={({ name, code, exchange }) => {
                if (!name || !code || !exchange) return ticker;
                return `${name} (${code}.${exchange})`;
              }}
              options={autoComplete.map((option) => ({
                name: option.Name,
                code: option.Code,
                exchange: option.Exchange,
              }))}
              renderInput={(params) => {
                return (
                  <>
                    <TickerTextField
                      {...params}
                      variant="outlined"
                      value={ticker}
                      fullWidth
                      required
                      onChange={handleOnChangeSearch}
                      placeholder="Stock ticker e.g. AMZN"
                    />
                  </>
                );
              }}
            />
          </div>
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
        Foreign stocks in this format: TICKER.EXCHANGE
      </Typography>
    </>
  );
};

export default Home;
