import React from "react";
import FormatRawNumber from "./FormatRawNumber";

export const millionModifier = 1.0e6;

const FormatRawNumberToMillion = ({ value, ...props }) => {
  const newValue = value ? Math.abs(value) / millionModifier : undefined;

  return <FormatRawNumber value={newValue} {...props} />;
};

export default FormatRawNumberToMillion;
