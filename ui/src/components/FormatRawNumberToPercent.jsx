import React from "react";
import roundDecimal from "../shared/roundDecimal";
import FormatRawNumber from "./FormatRawNumber";

const FormatRawNumberToPercent = ({ value, ...props }) => {
  const newValue = value ? roundDecimal(value, 4) : undefined;

  return (
    <FormatRawNumber value={newValue} suffix="%" decimalScale={2} {...props} />
  );
};

export default FormatRawNumberToPercent;
