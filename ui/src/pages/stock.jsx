import React, { useEffect } from "react";
import { Router } from "@reach/router";
import DiscountedCashFlow from "../discountedCashFlow/DiscountedCashFlow";
import SyntheticRating from "../discountedCashFlow/SyntheticCreditRating";
import IndustryAverages from "../discountedCashFlow/IndustryAverages";
import { fundamentalsFilter } from "../api/api";
import { getFundamentalsThunk } from "../redux/actions/fundamentalsActions";
import selectFundamentalsIsLoaded from "../selectors/fundamentalSelectors/selectFundamentalsIsLoaded";
import { useDispatch, useSelector } from "react-redux";

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

  if (!isLoaded) return null;

  return children;
};

const Stock = () => {
  return (
    <Router basepath="/stock">
      <StockBase path="/:ticker">
        <DiscountedCashFlow path="/discounted-cash-flow" />
        <SyntheticRating path="/synthetic-credit-rating" />
        <IndustryAverages path="/industry-averages" />
      </StockBase>
    </Router>
  );
};
export default Stock;
