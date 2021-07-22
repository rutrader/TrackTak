import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Autocomplete,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import dayjs from "dayjs";
import SearchIcon from "@material-ui/icons/Search";
import useDebouncedCallback from "../../../packages/intrinsic-valuations/src/hooks/useDebouncedCallback";
import TTRoundInput from "./TTRoundInput";
import { getAutocompleteQuery } from "../../../packages/intrinsic-valuations/src/api/api";
import { getAccessToken, useAuth } from "../hooks/useAuth";
import { createSpreadsheet } from "../api/api";
import { navigate } from "gatsby";
import freeCashFlowToFirmData, {
  freeCashFlowToFirmVariablesData,
} from "../../../packages/intrinsic-valuations/src/spreadsheet/templates/freeCashFlowFirmSimple/data";
import { useDispatch } from "react-redux";
import {
  getExchangeRatesThunk,
  getFundamentalsThunk,
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "../../../packages/intrinsic-valuations/src/redux/thunks/stockThunks";
import convertStockAPIData from "../../../packages/intrinsic-valuations/src/shared/convertStockAPIData";
import { setMessage } from "../redux/actions/snackbarActions";

const SearchTicker = ({ isSmallSearch, sx }) => {
  const theme = useTheme();
  const [autoComplete, setAutoComplete] = useState([]);
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [text, setText] = useState("");
  const { userData } = useAuth();
  const dispatch = useDispatch();

  const fetchData = async (ticker) => {
    const { payload: fundamentals } = await dispatch(
      getFundamentalsThunk({
        ticker,
      }),
    );

    const values = await Promise.all([
      dispatch(
        getExchangeRatesThunk({
          currencyCode: fundamentals.general.currencyCode,
          incomeStatement: fundamentals.incomeStatement,
          balanceSheet: fundamentals.balanceSheet,
        }),
      ),
      dispatch(
        getLastPriceCloseThunk({
          ticker,
        }),
      ),

      dispatch(
        getTenYearGovernmentBondLastCloseThunk({
          countryISO: fundamentals.general.countryISO,
        }),
      ),
    ]);

    return convertStockAPIData(
      fundamentals,
      values[0].payload,
      values[1].payload,
      values[2].payload,
    );
  };

  const createUserSpreadsheet = async (ticker) => {
    const financialData = await fetchData(ticker);
    const token = await getAccessToken();
    const data = {
      datas: freeCashFlowToFirmData,
      variablesDatas: freeCashFlowToFirmVariablesData,
    };
    const sheetData = { name: ticker, data };
    const response = await createSpreadsheet(
      { sheetData, financialData },
      token?.jwtToken,
    );
    navigate(
      `/${userData.name}/my-spreadsheets/${response.data.spreadsheet._id}`,
    );
    dispatch(
      setMessage({
        severity: "success",
        message: `${
          financialData?.general.name
        }'s financial data has been frozen to ${dayjs().format(
          "DD MMM YYYY",
        )} for your valuation.`,
      }),
    );
  };

  const getAutoCompleteDebounced = useDebouncedCallback(async (value) => {
    const { data } = await getAutocompleteQuery(`${value}?limit=9&type=stock`);

    setIsLoadingAutocomplete(false);
    setAutoComplete(data.value);
  }, 300);

  const handleOnChangeAutoComplete = (_, value) => {
    if (value?.code && value?.exchange) {
      const ticker = `${value.code}.${value.exchange}`;

      createUserSpreadsheet(ticker);
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
    <Box sx={{ display: "flex", position: "relative", ...sx }}>
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
