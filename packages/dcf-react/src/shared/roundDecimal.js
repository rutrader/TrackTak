const roundDecimal = (value, decimalPlaces) => {
  const power = Math.pow(10, decimalPlaces);
  return Math.round(value * power) / 100;
};

export default roundDecimal;
