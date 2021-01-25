const formatValueForExcelOutput = (value = 0, currencySymbol, type) => {
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

  if (type === "number") {
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

export default formatValueForExcelOutput;
