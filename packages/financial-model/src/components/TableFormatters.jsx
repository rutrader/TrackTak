import React from "react";
import FormatRawNumber from "./FormatRawNumber";

export const TableNumberFormatter = (props) => (
  <FormatRawNumber decimalScale={2} {...props} />
);
