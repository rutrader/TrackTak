import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import React from "react";

const TableMillionFormatter = (props) => (
  <FormatRawNumberToMillion decimalScale={2} {...props} />
);

export default TableMillionFormatter;
