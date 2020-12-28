import React, { useState } from "react";
import { Box, IconButton, TextField, withStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/core";
import { useHistory } from "react-router";
import SearchIcon from "@material-ui/icons/Search";
import { getAutocompleteQuery } from "../api/api";

const TickerTextField = withStyles({
  root: ({ $removeInputPadding }) => {
    const values = {};

    if ($removeInputPadding) {
      values.padding = 0;
    }

    return {
      "& .MuiInputBase-root": {
        ...values,
      },
    };
  },
})(TextField);

const SubmitButton = withStyles({
  root: {
    borderRadius: 0,
    position: "absolute",
    right: 0,
    height: "100%",
  },
})(IconButton);

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

    setTicker(value);

    if (value.length > 1 && hasTickerNotOnlyWhiteSpace()) {
      const { data } = await getAutocompleteQuery(value);
      setAutoComplete(data.value);
    } else {
      setAutoComplete([]);
    }
  };

  const hasTickerNotOnlyWhiteSpace = () => {
    const replacedWhiteSpace = ticker.replace(/ /g, "");

    return replacedWhiteSpace.length > 0;
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", position: "relative" }}
      onSubmit={async (e) => {
        e.preventDefault();
        if (hasTickerNotOnlyWhiteSpace()) {
          history.push(`/discounted-cash-flow/${ticker}`);
        }
      }}
    >
      <Autocomplete
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
                placeholder="Search, e.g. AAPL"
              />
            </>
          );
        }}
      />
      <SubmitButton type="submit">
        <SearchIcon color="primary" />
      </SubmitButton>
    </Box>
  );
};

export default SearchTicker;
