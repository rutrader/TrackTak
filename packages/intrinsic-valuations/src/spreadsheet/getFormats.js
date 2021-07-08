// Temporary until patterns are in the cell
// instead of formats
const getFormats = (currencySymbol) => {
  const formats = {
    "million-currency": {
      key: "million-currency",
      title: () => "Million Currency",
      type: "number",
      format: "million-currency",
      label: `${currencySymbol}1,000,000`,
      pattern: `"${currencySymbol}"#,###.##,,`,
    },
    million: {
      key: "million",
      title: () => "Million",
      type: "number",
      format: "million",
      label: `1,000,000`,
      pattern: `#,###.##,,`,
    },
    currency: {
      key: "currency",
      title: () => "Currency",
      type: "number",
      format: "currency",
      label: `${currencySymbol}10.00`,
      pattern: `"${currencySymbol}"#,##0.##`,
    },
  };

  return formats;
};

export default getFormats;
