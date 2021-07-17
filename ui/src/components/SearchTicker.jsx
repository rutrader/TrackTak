import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Autocomplete,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useDebouncedCallback from "../../../packages/intrinsic-valuations/src/hooks/useDebouncedCallback";
import TTRoundInput from "./TTRoundInput";
import { getAutocompleteQuery } from "../../../packages/intrinsic-valuations/src/api/api";
import { useAuth } from "../hooks/useAuth";
import { saveSpreadsheet } from "../api/api";
import { navigate } from "gatsby";

const SearchTicker = ({ isSmallSearch }) => {
  const theme = useTheme();
  const [autoComplete, setAutoComplete] = useState([]);
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [text, setText] = useState("");
  const { getAccessToken, userData } = useAuth();

  const searchStock = async (ticker) => {
    const token = await getAccessToken();
    const response = await saveSpreadsheet(
      { name: ticker, data: {} },
      token?.jwtToken,
    );
    navigate(`/${userData.name}/my-spreadsheets/${response.data._id}`);
  };

  const getAutoCompleteDebounced = useDebouncedCallback(async (value) => {
    const { data } = await getAutocompleteQuery(`${value}?limit=9&type=stock`);

    setIsLoadingAutocomplete(false);
    setAutoComplete(data.value);
  }, 300);

  const handleOnChangeAutoComplete = (_, value) => {
    if (value?.code && value?.exchange) {
      const ticker = `${value.code}.${value.exchange}`;

      searchStock(ticker);
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
    <Box sx={{ display: "flex", position: "relative" }}>
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
                    <IconButton
                      name="Submit Company Search"
                      sx={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        position: "absolute",
                        right: 0,
                        height: "100%",
                      }}
                      type="submit"
                    >
                      <SearchIcon color="primary" />
                    </IconButton>
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
