import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  makeStyles,
  TextField,
  useMediaQuery,
  useTheme,
  Autocomplete,
} from "@material-ui/core";
import { navigate } from "gatsby";
import SearchIcon from "@material-ui/icons/Search";
import { useDebouncedCallback } from "@tracktak/dcf-react";
import { getAutocompleteQuery } from "../api/api";
import { withStyles } from "@material-ui/styles";

const TickerTextField = withStyles((theme) => ({
  root: ({ $isSmallSearch }) => {
    const styles = {};

    if ($isSmallSearch) {
      styles["& .MuiInputBase-root"] = {
        height: "40px",
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("md")]: {
          width: "40ch",
        },
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
}))(TextField);

const useStyles = makeStyles((theme) => ({
  input: {
    background: "#fff",
    borderRadius: "50px",
    fontSize: "18px",
    padding: theme.spacing(1, 1, 1, 2),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "90ch",
    },
  },
  search: {
    position: "relative",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
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
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);
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
      style={{ display: "flex", position: "relative" }}
      onSubmit={async (e) => {
        e.preventDefault();

        if (ticker) {
          navigate(`/stock/${ticker}/discounted-cash-flow`);
        }
      }}
    >
      <Autocomplete
        style={{ flex: 1, marginLeft: "10px" }}
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
            <>
              <TickerTextField
                className={classes.search}
                {...params}
                style={{ display: "flex", alignItems: "center" }}
                $isSmallSearch={isSmallSearch}
                variant="outlined"
                fullWidth
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
