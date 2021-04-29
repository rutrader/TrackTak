const formatTypeToMask = (currencySymbol, type) => {
  if (type === "percent") {
    return {
      mask: "0.00%",
      type: "number",
    };
  }

  if (type === "million") {
    return {
      mask: "#,##0,,.00",
      type: "number",
    };
  }

  if (type === "million-currency") {
    return {
      mask: `${currencySymbol}#,##0,,.00`,
      type: "number",
    };
  }

  if (type === "currency") {
    return {
      mask: `${currencySymbol}#,##0.00`,
      type: "number",
    };
  }

  if (type === "number" || type === "year") {
    return {
      mask: "0.00",
      type: "number",
    };
  }

  return {
    type: 'text',
    mask: ''
  };
};

export default formatTypeToMask;
