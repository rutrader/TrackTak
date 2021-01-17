import React from "react";
import { useSelector } from "react-redux";
import { dcfFixedDecimalScale } from "../discountedCashFlow/DiscountedCashFlowSheet";
import FormatRawNumber from "./FormatRawNumber";

export const millionModifier = 1.0e6;

export const modifyValue = (value, decimalScale = dcfFixedDecimalScale) => {
  return value
    ? (parseFloat(value) / millionModifier).toFixed(decimalScale)
    : null;
};

const FormatRawNumberToMillion = ({ value, useCurrencySymbol, ...props }) => {
  const currencySymbol = useSelector(
    (state) => state.fundamentals.valuationCurrencySymbol
  );

  return (
    <FormatRawNumber
      value={modifyValue(value)}
      prefix={useCurrencySymbol ? currencySymbol : undefined}
      decimalScale={dcfFixedDecimalScale}
      {...props}
    />
  );
};

export default FormatRawNumberToMillion;
