import React, { useEffect } from "react";
import { Router } from "@reach/router";
import DiscountedCashFlow from "../discountedCashFlow/DiscountedCashFlow";
import SyntheticRating from "../discountedCashFlow/SyntheticCreditRating";
import IndustryAverages from "../discountedCashFlow/IndustryAverages";
import { fundamentalsFilter } from "../api/api";
import { getFundamentalsThunk } from "../redux/actions/fundamentalsActions";
import selectFundamentalsIsLoaded from "../selectors/fundamentalSelectors/selectFundamentalsIsLoaded";
import { useDispatch, useSelector } from "react-redux";
import LayoutFullScreen from "../layouts/LayoutFullScreen";

const StockBase = ({ children, ticker }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getFundamentalsThunk({
        ticker: ticker,
        filter: fundamentalsFilter,
      }),
    );
  }, [dispatch, ticker]);

  const isLoaded = useSelector(selectFundamentalsIsLoaded);

  return (
    <LayoutFullScreen ticker={ticker}>
      {isLoaded ? children : null}
    </LayoutFullScreen>
  );
};

export const stockPaths = [
  "/discounted-cash-flow",
  "/synthetic-credit-rating",
  "/industry-averages",
];

const Stock = () => {
  return (
    <Router basepath="/stock">
      <StockBase path="/:ticker">
        <DiscountedCashFlow path={stockPaths[0]} />
        <SyntheticRating path={stockPaths[1]} />
        <IndustryAverages path={stockPaths[2]} />
      </StockBase>
    </Router>
  );
};
export default Stock;
