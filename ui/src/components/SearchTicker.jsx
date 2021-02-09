import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/core";
import { useHistory } from "react-router";
import SearchIcon from "@material-ui/icons/Search";
import { getAutocompleteQuery } from "../api/api";
import useDebouncedCallback from "../hooks/useDebouncedCallback";

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

const SearchTicker = ({ removeInputPadding }) => {
  const theme = useTheme();
  const [ticker, setTicker] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const history = useHistory();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);
  const getAutoCompleteDebounced = useDebouncedCallback(async (value) => {
    const { data } = await getAutocompleteQuery(`${value}?limit=9&type=stock`);

    setIsLoadingAutocomplete(false);
    setAutoComplete(data.value);
  }, 500);

  const handleOnChangeAutoComplete = (_, value) => {
    if (value?.code && value?.exchange) {
      setTicker(`${value.code}.${value.exchange}`);
    }
  };

  const handleOnChangeSearch = async (e) => {
    const value = e.target.value;

    if (value.length > 1) {
      setIsLoadingAutocomplete(true);
      getAutoCompleteDebounced(value);
    } else {
      setAutoComplete([]);
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", position: "relative" }}
      onSubmit={async (e) => {
        e.preventDefault();

        if (ticker) {
          history.push(`/discounted-cash-flow/${ticker}`);
        }
      }}
    >
      <Autocomplete
        style={{ flex: 1 }}
        onChange={handleOnChangeAutoComplete}
        getOptionLabel={({ name, code, exchange }) => {
          return `${name} (${code}.${exchange})`;
        }}
        getOptionSelected={(option, value) => {
          return (
            option.code === value.code && option.exchange === value.exchange
          );
        }}
        options={autoComplete.map((option) => {
          return {
            name: option.Name,
            code: option.Code,
            exchange: option.Exchange,
          };
        })}
        maxSearchResults={5}
        autoHighlight
        loading={isLoadingAutocomplete}
        popupIcon={null}
        onBlur={() => {
          if (!ticker) {
            setAutoComplete([]);
          }
        }}
        closeIcon={null}
        popoverProps={{
          canAutoPosition: true,
        }}
        renderInput={(params) => {
          return (
            <>
              <TickerTextField
                {...params}
                $removeInputPadding={removeInputPadding}
                variant="outlined"
                fullWidth
                onChange={handleOnChangeSearch}
                placeholder={isOnMobile ? "Search" : "Search, e.g. AAPL"}
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
