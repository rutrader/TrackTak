import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import React from "react";
import FormatRawNumber from "./FormatRawNumber";

export const TableMillionFormatter = (props) => (
  <FormatRawNumberToMillion decimalScale={2} {...props} />
);

export const TableNumberFormatter = (props) => (
  <FormatRawNumber decimalScale={2} {...props} />
);
