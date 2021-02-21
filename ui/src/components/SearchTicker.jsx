import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  makeStyles,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import { getAutocompleteQuery } from "../api/api";
import useDebouncedCallback from "../hooks/useDebouncedCallback";
import { navigate } from "@reach/router";

const useStyles = makeStyles({
  submitButton: {
    borderRadius: 0,
    position: "absolute",
    right: 0,
    height: "100%",
  },
  tickerTextField: ({ removeInputPadding }) => {
    const values = {};

    if (removeInputPadding) {
      values.padding = 0;
    }

    return {
      "& .MuiInputBase-root": {
        ...values,
      },
    };
  },
});

const SearchTicker = ({ removeInputPadding }) => {
  const theme = useTheme();
  const [ticker, setTicker] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);
  const [text, setText] = useState("");
  const classes = useStyles({ removeInputPadding });
  const getAutoCompleteDebounced = useDebouncedCallback(async (value) => {
    const { data } = await getAutocompleteQuery(`${value}?limit=9&type=stock`);

    setIsLoadingAutocomplete(false);
    setAutoComplete(data.value);
  }, 300);

  const handleOnChangeAutoComplete = (_, value) => {
    if (value?.code && value?.exchange) {
      setTicker(`${value.code}.${value.exchange}`);
      setText("");
    }
  };

  const handleOnChangeSearch = async (e) => {
    const value = e.target.value;

    setText(value);

    if (value.length > 0) {
      setIsLoadingAutocomplete(true);
      getAutoCompleteDebounced(value);
    }
  };

  useEffect(() => {
    if (text.length === 0) {
      setAutoComplete([]);
    }
  }, [text]);

  return (
    <Box
      component="form"
      sx={{ display: "flex", position: "relative" }}
      onSubmit={async (e) => {
        e.preventDefault();

        if (ticker) {
          // TODO: Fix to navigate() later
          window.location.href = `/stock/${ticker}/discounted-cash-flow`;
        }
      }}
    >
      <Autocomplete
        style={{ flex: 1 }}
        open={text.length > 0}
        onChange={handleOnChangeAutoComplete}
        getOptionLabel={({ name, code, exchange }) => {
          return `${name} (${code}.${exchange})`;
        }}
        getOptionSelected={(option, value) => {
          return (
            option.code === value.code && option.exchange === value.exchange
          );
        }}
        autoComplete
        options={autoComplete.map((option) => {
          return {
            name: option.Name,
            code: option.Code,
            exchange: option.Exchange,
          };
        })}
        autoHighlight
        loading={isLoadingAutocomplete}
        popupIcon={null}
        onBlur={() => {
          setText("");
        }}
        clearIcon={null}
        popoverProps={{
          canAutoPosition: true,
        }}
        renderInput={(params) => {
          return (
            <>
              <TextField
                {...params}
                classes={{
                  root: classes.tickerTextField,
                }}
                variant="outlined"
                fullWidth
                onChange={handleOnChangeSearch}
                placeholder={isOnMobile ? "Search" : "Search, e.g. AAPL"}
              />
            </>
          );
        }}
      />
      <IconButton type="submit" className={classes.submitButton}>
        <SearchIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default SearchTicker;
