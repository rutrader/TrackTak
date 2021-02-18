import FormatRawNumberToMillion from "./FormatRawNumberToMillion";

const TableMillionFormatter = (props) => (
  <FormatRawNumberToMillion decimalScale={2} {...props} />
);

export default TableMillionFormatter;
