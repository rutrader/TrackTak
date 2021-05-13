const makeFormatValueForExcelOutput = (currencySymbol) => (value = 0, type) => {
  let newValue = value;

  // TODO: Fix properly in dcfReducer to now allow error values
  if (newValue === "error") {
    newValue = 0;
  }

  if (type === "percent") {
    return {
      v: newValue,
      z: "0.00%",
      t: "n",
    };
  }

  if (type === "million") {
    return {
      v: newValue,
      z: "#,##0,,.00",
      t: "n",
    };
  }

  if (type === "million-currency") {
    return {
      v: newValue,
      z: `${currencySymbol}#,##0,,.00`,
      t: "n",
    };
  }

  if (type === "currency") {
    return {
      v: newValue,
      z: `${currencySymbol}#,##0.00`,
      t: "n",
    };
  }

  if (type === "number" || type === "year") {
    return {
      v: newValue,
      z: "0.00",
      t: "n",
    };
  }

  return {
    v: newValue,
  };
};

export default makeFormatValueForExcelOutput;
