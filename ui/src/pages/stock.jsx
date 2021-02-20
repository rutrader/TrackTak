import React from "react";
import { Router } from "@reach/router";
import LayoutFullScreen from "../layouts/LayoutFullScreen";
import DiscountedCashFlow from "../discountedCashFlow/DiscountedCashFlow";
import SyntheticRating from "../discountedCashFlow/SyntheticCreditRating";
import IndustryAverages from "../discountedCashFlow/IndustryAverages";

const Stock = () => {
  return (
    <LayoutFullScreen>
      <Router basepath="/stock">
        <DiscountedCashFlow path="/discounted-cash-flow/:ticker" />
        <SyntheticRating path="/synthetic-credit-rating/:ticker" />
        <IndustryAverages path="/industry-averages/:ticker" />
      </Router>
    </LayoutFullScreen>
  );
};
export default Stock;
