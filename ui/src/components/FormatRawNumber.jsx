import React from "react";
import NumberFormat from "react-number-format";

const fixedDecimalScale = 0;

const modifyValue = (value) => {
  let newValue = value;

  // Allows defaultValue to show for null values
  if (value === null) {
    newValue = undefined;
  }

  return newValue;
};

export const formatRawNumber = (value, decimalScale = fixedDecimalScale) => {
  return modifyValue(parseFloat(value, 10), decimalScale);
};

const FormatRawNumber = ({ value, ...props }) => {
  return (
    <NumberFormat
      thousandSeparator
      decimalScale={fixedDecimalScale}
      defaultValue="-"
      value={modifyValue(value)}
      displayType="text"
      {...props}
    />
  );
};

export default FormatRawNumber;
