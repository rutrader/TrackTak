import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumber from "./FormatRawNumber";

export const millionModifier = 1.0e6;

const modifyValue = (value) => {
  return value ? parseFloat(value) / millionModifier : null;
};

export const formatRawNumberToMillion = (
  value,
  currencySymbol,
  decimalScale = 2
) => {
  if (!value) return value;

  return `${currencySymbol}${modifyValue(value).toFixed(decimalScale)}`;
};

const FormatRawNumberToMillion = ({ value, useCurrencySymbol, ...props }) => {
  const currencySymbol = useSelector(
    (state) => state.fundamentals.valuationCurrencySymbol
  );

  return (
    <FormatRawNumber
      value={modifyValue(value)}
      prefix={useCurrencySymbol ? currencySymbol : undefined}
      {...props}
    />
  );
};

export default FormatRawNumberToMillion;
