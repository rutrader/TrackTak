import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumber from "./FormatRawNumber";

const FormatRawNumberToCurrency = ({ value, ...props }) => {
  const currencySymbol = useSelector(
    (state) => state.fundamentals.valuationCurrency
  );

  return (
    <FormatRawNumber
      value={value}
      prefix={currencySymbol}
      decimalScale={2}
      {...props}
    />
  );
};

export default FormatRawNumberToCurrency;
