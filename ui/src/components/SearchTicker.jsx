import React, { useState } from "react";
import {
  Box,
  IconButton,
  makeStyles,
  TextField,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/core";
import { useHistory } from "react-router";
import SearchIcon from "@material-ui/icons/Search";
import { getAutocompleteQuery } from "../api/api";

const TickerTextField = withStyles({
  root: ({ $isSmallSearch }) => {
    const styles = {};

    if ($isSmallSearch) {
      styles["& .MuiInputBase-root"] = {
        padding: 0,
        width: "487px",
        height: "40px",
      };

      styles["& .PrivateNotchedOutline-root-17"] = {
        top: 0,
      };
      styles["& .MuiOutlinedInput-inputAdornedStart"] = {
        marginLeft: "15px",
      };
    }

    return styles;
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  input: {
    width: "900px",
    borderRadius: "33px",
    fontSize: "16px",
    marginRight: "15px",
    height: "69px",
    padding: "0 30px",
    background: "#fff",
  },
}));

const SubmitButton = withStyles({
  root: {
    borderRadius: 0,
    position: "absolute",
    right: 0,
    height: "100%",
  },
})(IconButton);

const SearchTicker = ({ isSmallSearch }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [ticker, setTicker] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const history = useHistory();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      style={{ display: "flex", position: "relative" }}
      onSubmit={async (e) => {
        e.preventDefault();
        if (hasTickerNotOnlyWhiteSpace()) {
          history.push(`/discounted-cash-flow/${ticker}`);
        }
      }}
    >
      <Autocomplete
        style={{ flex: 1, marginLeft: "10px" }}
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
                style={{ display: "flex", alignItems: "center" }}
                $isSmallSearch={isSmallSearch}
                variant="outlined"
                value={ticker}
                fullWidth
                required
                onChange={handleOnChangeSearch}
                placeholder={isOnMobile ? "Search" : "Search, e.g. AAPL"}
                InputProps={{
                  ...params.InputProps,
                  className: classes.input,
                  disableUnderline: true,
                  startAdornment: (
                    <SubmitButton type="submit">
                      <SearchIcon color="primary" />
                    </SubmitButton>
                  ),
                }}
              />
            </>
          );
        }}
      />
    </Box>
  );
};

export default SearchTicker;
