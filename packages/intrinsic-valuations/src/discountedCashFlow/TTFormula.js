import scopeNameTypeMapping from "./scopeNameTypeMapping";

const TTFormula = (scope) => (property) => {
  let value = scope[property] || 0;

  if (
    scopeNameTypeMapping[property] === "million" ||
    scopeNameTypeMapping[property] === "million-currency"
  ) {
    return value ? value / 1000000 : 0;
  }

  return value;
};

export default TTFormula;
