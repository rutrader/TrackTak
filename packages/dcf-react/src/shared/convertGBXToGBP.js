const convertGBXToGBP = (currencyCode) => {
  return currencyCode === "GBX" ? "GBP" : currencyCode;
};

export default convertGBXToGBP;
