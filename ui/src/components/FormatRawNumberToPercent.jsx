import React from "react";
import roundDecimal from "../shared/roundDecimal";
import FormatRawNumber from "./FormatRawNumber";

const FormatRawNumberToPercent = ({ value = null, ...props }) => {
  const newValue = value !== null ? roundDecimal(value, 4) : null;

  return (
    <FormatRawNumber value={newValue} suffix="%" decimalScale={2} {...props} />
  );
};

export default FormatRawNumberToPercent;
