import React from "react";
import { useSelector } from "react-redux";
import PageSpinner from "./PageSpinner";

const FundamentalsSpinner = () => {
  const fundamentals = useSelector((state) => state.stock.fundamentals);

  return fundamentals ? null : <PageSpinner />;
};

export default FundamentalsSpinner;
