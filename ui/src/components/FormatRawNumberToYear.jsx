import React from "react";
import { dcfFixedDecimalScale } from "../discountedCashFlow/DiscountedCashFlowSheet";
import FormatRawNumber from "./FormatRawNumber";

const FormatRawNumberToYear = ({ value, ...props }) => {
  return (
    <FormatRawNumber
      value={value}
      decimalScale={dcfFixedDecimalScale}
      suffix="yr"
      {...props}
    />
  );
};

export default FormatRawNumberToYear;
