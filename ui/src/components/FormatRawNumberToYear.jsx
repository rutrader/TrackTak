import React from "react";
import FormatRawNumber from "./FormatRawNumber";

const FormatRawNumberToYear = ({ value, ...props }) => {
  return (
    <FormatRawNumber value={value} decimalScale={2} suffix="yr" {...props} />
  );
};

export default FormatRawNumberToYear;
