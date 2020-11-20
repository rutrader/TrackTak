const formatRawNumberToMillion = (value) => {
  return Math.abs(value) / 1.0e6 + "M";
};

export default formatRawNumberToMillion;
