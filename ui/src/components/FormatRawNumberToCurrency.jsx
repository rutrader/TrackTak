import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";

const FormatRawNumberToCurrency = ({ value, ...props }) => {
  const currencySymbol = useSelector(
    (state) => state.fundamentals.data.General.CurrencySymbol
  );

  return (
    <FormatRawNumberToMillion
      value={value}
      prefix={currencySymbol}
      decimalScale={2}
      {...props}
    />
  );
};

export default FormatRawNumberToCurrency;
