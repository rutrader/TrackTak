import React, { useState } from "react";
import { Box, Button, TextField, withStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "../axios/axios";

const TickerTextField = withStyles({
  root: ({ $removeInputPadding }) => {
    const values = {};

    if ($removeInputPadding) {
      values.padding = 0;
    }

    return {
      "& .MuiInputBase-root": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        ...values,
      },
    };
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

const SearchTicker = ({ buttonSize, removeInputPadding }) => {
  const [ticker, setTicker] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const history = useHistory();

  const handleOnChangeAutoComplete = (_, value) => {
    if (value.code && value.exchange) {
      setTicker(`${value.code}.${value.exchange}`);
    }
  };

  const handleOnChangeSearch = async (e) => {
    const value = e.target.value;

    if (value.length > 2 && hasTickerNotOnlyWhiteSpace()) {
      const res = await axios.get(`/api/v1/autocomplete-query/${value}`);
      setAutoComplete(res.data);
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
    <Box
      component="form"
      sx={{ display: "flex" }}
      onSubmit={async (e) => {
        e.preventDefault();
        if (hasTickerNotOnlyWhiteSpace()) {
          history.push(`/valuation/${ticker}`);
        }
      }}
    >
      <TickerAutocomplete
        style={{ flex: 1 }}
        onChange={handleOnChangeAutoComplete}
        freeSolo
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
                $removeInputPadding={removeInputPadding}
                variant="outlined"
                value={ticker}
                fullWidth
                required
                onChange={handleOnChangeSearch}
                placeholder="Search for a stock"
              />
            </>
          );
        }}
      />
      <SubmitButton variant="contained" size={buttonSize} type="submit">
        Search
      </SubmitButton>
    </Box>
  );
};

export default SearchTicker;