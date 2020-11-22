import React from "react";
import NumberFormat from "react-number-format";

const FormatRawNumber = ({ value, ...props }) => {
  return (
    <NumberFormat
      thousandSeparator
      decimalScale={0}
      defaultValue="-"
      value={value}
      displayType="text"
      {...props}
    />
  );
};

export default FormatRawNumber;
