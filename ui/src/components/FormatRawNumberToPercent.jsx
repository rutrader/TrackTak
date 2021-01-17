import React from "react";
import { dcfFixedDecimalScale } from "../discountedCashFlow/DiscountedCashFlowSheet";
import roundDecimal from "../shared/roundDecimal";
import FormatRawNumber from "./FormatRawNumber";

const roundValue = (value) => {
  return value !== null ? roundDecimal(value, 4) : null;
};

export const formatRawNumberToPercent = (
  value,
  decimalScale = dcfFixedDecimalScale
) => {
  if (!value) return value;

  return `${roundValue(parseFloat(value, 10)).toFixed(decimalScale)}%`;
};

const FormatRawNumberToPercent = ({ value = null, ...props }) => {
  return (
    <FormatRawNumber
      value={roundValue(value)}
      suffix="%"
      decimalScale={dcfFixedDecimalScale}
      {...props}
    />
  );
};

export default FormatRawNumberToPercent;
