import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import React from "react";

const formatCellValue = (cell) => {
  if (!cell) return cell;

  const { value, type } = cell;
  let node = value;

  // key here is to force a re-render based on the value
  // likely a blueprintjs table bug. It's probably fixed
  // in the later versions once we upgrade
  if (type === "percent") {
    node = <FormatRawNumberToPercent key={value} value={value} />;
  }
  if (type === "million-currency") {
    node = (
      <FormatRawNumberToMillion key={value} value={value} useCurrencySymbol />
    );
  }
  if (type === "million") {
    node = <FormatRawNumberToMillion key={value} value={value} />;
  }
  if (type === "currency") {
    node = <FormatRawNumberToCurrency key={value} value={value} />;
  }
  if (type === "number") {
    node = <FormatRawNumber key={value} value={value} decimalScale={2} />;
  }

  return node;
};

export default formatCellValue;
