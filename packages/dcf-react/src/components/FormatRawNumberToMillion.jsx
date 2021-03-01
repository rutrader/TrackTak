import React from "react";
import { useSelector } from "react-redux";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import FormatRawNumber from "./FormatRawNumber";

export const millionModifier = 1.0e6;

const FormatRawNumberToMillion = ({ value, useCurrencySymbol, ...props }) => {
  const currencySymbol = useSelector(selectValuationCurrencySymbol);
  const newValue = value ? parseFloat(value) / millionModifier : null;

  return (
    <FormatRawNumber
      value={newValue}
      prefix={useCurrencySymbol ? currencySymbol : undefined}
      {...props}
    />
  );
};

export default FormatRawNumberToMillion;
