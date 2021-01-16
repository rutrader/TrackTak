import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumber from "./FormatRawNumber";

const fixedDecimalScale = 2;

export const formatRawNumberToCurrency = (
  value,
  currencySymbol,
  decimalScale = fixedDecimalScale
) => {
  if (!value) return value;

  return `${currencySymbol}${parseFloat(value, 10).toFixed(decimalScale)}`;
};

const FormatRawNumberToCurrency = ({ value, ...props }) => {
  const currencySymbol = useSelector(
    (state) => state.fundamentals.valuationCurrencySymbol
  );

  return (
    <FormatRawNumber
      value={value}
      prefix={currencySymbol}
      decimalScale={fixedDecimalScale}
      {...props}
    />
  );
};

export default FormatRawNumberToCurrency;
