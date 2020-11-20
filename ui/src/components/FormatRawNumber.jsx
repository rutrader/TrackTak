import React from "react";
import NumberFormat from "react-number-format";
import formatRawNumberToMillion from "../shared/formatRawNumber";

const FormatRawNumber = ({ value, ...props }) => {
  return (
    <NumberFormat
      thousandSeparator
      decimalScale={0}
      defaultValue="-"
      value={value ? formatRawNumberToMillion(value) : undefined}
      displayType="text"
      {...props}
    />
  );
};

export default FormatRawNumber;
