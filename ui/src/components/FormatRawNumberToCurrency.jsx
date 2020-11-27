import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumber from "./FormatRawNumber";

const FormatRawNumberToCurrency = ({ value, ...props }) => {
  const currencySymbol = useSelector(
    (state) => state.fundamentals.data.General.CurrencySymbol
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
