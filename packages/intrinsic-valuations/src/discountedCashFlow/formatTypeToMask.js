const formatTypeToMask = (currencySymbol, type) => {
  if (type === "percent") {
    return {
      type: "text",
      disabledMaskOnEdition: true,
    };
  }

  if (type === "million") {
    return {
      mask: "#,##.00",
      type: "number",
      disabledMaskOnEdition: true,
    };
  }

  if (type === "million-currency") {
    return {
      mask: `${currencySymbol}#,##.00`,
      type: "number",
      disabledMaskOnEdition: true,
    };
  }

  if (type === "currency") {
    return {
      mask: `${currencySymbol}#,##0.00`,
      type: "number",
      disabledMaskOnEdition: true,
    };
  }

  if (type === "number" || type === "year") {
    return {
      mask: "#.00",
      type: "number",
      disabledMaskOnEdition: true,
    };
  }

  return {
    type: "text",
  };
};

export default formatTypeToMask;
