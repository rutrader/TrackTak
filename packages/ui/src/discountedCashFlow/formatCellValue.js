import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";

const formatCellValue = (cell) => {
  if (!cell) return cell;

  const { value, type } = cell;
  let node = value;

  if (type === "percent") {
    node = <FormatRawNumberToPercent value={value} />;
  }
  if (type === "million-currency") {
    node = <FormatRawNumberToMillion value={value} useCurrencySymbol />;
  }
  if (type === "million") {
    node = <FormatRawNumberToMillion value={value} />;
  }
  if (type === "currency") {
    node = <FormatRawNumberToCurrency value={value} />;
  }
  if (type === "number") {
    node = <FormatRawNumber value={value} decimalScale={2} />;
  }

  return node;
};

export default formatCellValue;
