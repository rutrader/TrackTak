import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
} from "../redux/thunks/fundamentalsThunks";
import selectFundamentalsIsLoaded from "../selectors/fundamentalSelectors/selectIsFundamentalsLoaded";
import convertHyphenTickerToDot from "../shared/convertHyphenTickerToDot";
import Spreadsheet from "./Spreadsheet";

const SpreadsheetContainer = ({ ticker }) => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectFundamentalsIsLoaded);

  useEffect(() => {
    const convertedTicker = convertHyphenTickerToDot(ticker);

    dispatch(
      getFundamentalsThunk({
        ticker: convertedTicker,
      }),
    );

    dispatch(
      getLastPriceCloseThunk({
        ticker: convertedTicker,
      }),
    );
  }, [dispatch, ticker]);

  return isLoaded ? <Spreadsheet /> : null;
};

export default SpreadsheetContainer;
