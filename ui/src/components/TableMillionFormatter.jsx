import FormatRawNumberToMillion from "./FormatRawNumberToMillion";

const TableValueMillionFormatter = (props) => (
  <FormatRawNumberToMillion decimalScale={2} {...props} />
);

export default TableValueMillionFormatter;
