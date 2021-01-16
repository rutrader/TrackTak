import React from "react";
import roundDecimal from "../shared/roundDecimal";
import FormatRawNumber from "./FormatRawNumber";

const fixedDecimalScale = 2;

const roundValue = (value) => {
  return value !== null ? roundDecimal(value, 4) : null;
};

export const formatRawNumberToPercent = (
  value,
  decimalScale = fixedDecimalScale
) => {
  if (!value) return value;

  return `${roundValue(parseFloat(value, 10)).toFixed(decimalScale)}%`;
};

const FormatRawNumberToPercent = ({ value = null, ...props }) => {
  return (
    <FormatRawNumber
      value={roundValue(value)}
      suffix="%"
      decimalScale={fixedDecimalScale}
      {...props}
    />
  );
};

export default FormatRawNumberToPercent;
