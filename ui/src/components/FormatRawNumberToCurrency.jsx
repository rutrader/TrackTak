import React from "react";
import { useSelector } from "react-redux";
import { dcfFixedDecimalScale } from "../discountedCashFlow/DiscountedCashFlowSheet";
import FormatRawNumber from "./FormatRawNumber";

export const formatRawNumberToCurrency = (
  value,
  currencySymbol,
  decimalScale = dcfFixedDecimalScale
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
      decimalScale={dcfFixedDecimalScale}
      {...props}
    />
  );
};

export default FormatRawNumberToCurrency;
