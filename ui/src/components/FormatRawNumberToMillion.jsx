import React from "react";
import FormatRawNumber from "./FormatRawNumber";

const FormatRawNumberToMillion = ({ value, ...props }) => {
  const newValue = value ? Math.abs(value) / 1.0e6 : undefined;

  return <FormatRawNumber value={newValue} {...props} />;
};

export default FormatRawNumberToMillion;
