import React from "react";
import FormatRawNumber from "./FormatRawNumber";

export const percentModifier = 100;

const FormatRawNumberToPercent = ({ value, ...props }) => {
  const newValue = value ? value * percentModifier : undefined;

  return (
    <FormatRawNumber value={newValue} suffix="%" decimalScale={2} {...props} />
  );
};

export default FormatRawNumberToPercent;
