import { isNil } from "lodash-es";
import React from "react";
import roundDecimal from "../shared/roundDecimal";
import FormatRawNumber from "./FormatRawNumber";

const FormatRawNumberToPercent = ({ value, ...props }) => {
  const newValue = isNil(value) ? null : roundDecimal(value, 4);

  return (
    <FormatRawNumber value={newValue} suffix="%" decimalScale={2} {...props} />
  );
};

export default FormatRawNumberToPercent;
