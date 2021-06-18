const formatToExcelType = (format) => {
  let type = "s";

  if (
    format === "number" ||
    format === "year" ||
    format === "percent" ||
    format === "million" ||
    format === "million-currency" ||
    format === "currency"
  ) {
    type = "n";
  }

  return type;
};

export default formatToExcelType;
