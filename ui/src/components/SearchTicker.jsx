import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Autocomplete,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { navigate } from "gatsby";
import SearchIcon from "@material-ui/icons/Search";
import { useDebouncedCallback } from "@tracktak/dcf-react";
import { getAutocompleteQuery } from "../api/api";
import { withStyles } from "@material-ui/styles";
import TTRoundInput from "./TTRoundInput";

const SubmitButton = withStyles({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    position: "absolute",
    right: 0,
    height: "100%",
  },
})(IconButton);

const SearchTicker = ({ isSmallSearch }) => {
  const [ticker, setTicker] = useState("");
  const theme = useTheme();
  const [autoComplete, setAutoComplete] = useState([]);
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [text, setText] = useState("");
  const getAutoCompleteDebounced = useDebouncedCallback(async (value) => {
    const { data } = await getAutocompleteQuery(`${value}?limit=9&type=stock`);

    setIsLoadingAutocomplete(false);
    setAutoComplete(data.value);
  }, 300);

  const handleOnChangeAutoComplete = (_, value) => {
    if (value?.code && value?.exchange) {
      setTicker(`${value.code}-${value.exchange}`.toLowerCase());
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
          navigate(`/stock/${ticker}/discounted-cash-flow`);
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
        renderInput={(params) => {
          return (
            <Box
              sx={{
                maxWidth: "850px",
                margin: "0 auto",
              }}
            >
              <TTRoundInput
                {...params}
                isSmallInput={isSmallSearch}
                variant="outlined"
                onChange={handleOnChangeSearch}
                placeholder={isOnMobile ? "Search" : "Search, e.g. AAPL"}
                InputProps={{
                  ...params.InputProps,
                  color: "secondary",
                  startAdornment: (
                    <SubmitButton type="submit">
                      <SearchIcon color="primary" />
                    </SubmitButton>
                  ),
                }}
              />
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default SearchTicker;
