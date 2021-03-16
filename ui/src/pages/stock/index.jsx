import React from "react";
import { Router } from "@reach/router";
import LayoutFullScreen from "../../layouts/LayoutFullScreen";
import DiscountedCashFlowPage from "./ticker/discounted-cash-flow";
import SyntheticCreditRatingPage from "./ticker/synthetic-credit-rating";
import IndustryAveragesPage from "./ticker/industry-averages";

const Stock = () => {
  return (
    <Router basepath="/stock/:ticker">
      <LayoutFullScreen path="/">
        <DiscountedCashFlowPage path="/discounted-cash-flow" />
        <SyntheticCreditRatingPage path="/synthetic-credit-rating" />
        <IndustryAveragesPage path="/industry-averages" />
      </LayoutFullScreen>
    </Router>
  );
};
export default Stock;
