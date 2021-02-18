import React from "react";
import NumberFormat from "react-number-format";

const FormatRawNumber = ({ value, ...props }) => {
  let newValue = value;

  // Allows defaultValue to show for null values
  if (value === null) {
    newValue = undefined;
  }

  return (
    <NumberFormat
      thousandSeparator
      decimalScale={0}
      defaultValue="-"
      value={newValue}
      displayType="text"
      {...props}
    />
  );
};

export default FormatRawNumber;
