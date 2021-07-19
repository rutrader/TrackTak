const formatToExcelType = (format) => {
  let type = "s";

  if (format === "number") {
    type = "n";
  }

  return type;
};

export default formatToExcelType;
