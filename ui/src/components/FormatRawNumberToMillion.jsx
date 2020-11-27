import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumber from "./FormatRawNumber";

export const millionModifier = 1.0e6;

const FormatRawNumberToMillion = ({ value, useCurrencySymbol, ...props }) => {
  const currencySymbol = useSelector(
    (state) => state.fundamentals.data.General.CurrencySymbol
  );

  const newValue = value ? Math.abs(value) / millionModifier : undefined;

  return (
    <FormatRawNumber
      value={newValue}
      prefix={useCurrencySymbol ? currencySymbol : undefined}
      {...props}
    />
  );
};

export default FormatRawNumberToMillion;
