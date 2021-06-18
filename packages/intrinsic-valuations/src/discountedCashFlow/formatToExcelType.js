const formatToExcelType = (format, currencySymbol) => {
  if (format === "percent") {
    return {
      z: "0.00%",
      t: "n",
    };
  }

  if (format === "currency") {
    return {
      z: `${currencySymbol}#,##0.00`,
      t: "n",
    };
  }

  if (format === "number" || format === "year") {
    return {
      z: "0.00",
      t: "n",
    };
  }

  return {
    t: "s",
  };
};

export default formatToExcelType;
