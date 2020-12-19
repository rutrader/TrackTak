export const inputQueryNames = [
  "cagrYearOneToFive",
  "ebitTargetMarginInYearTen",
  "yearOfConvergence",
  "salesToCapitalRatio",
  "numberOfOptionsOutstanding",
  "averageStrikePrice",
  "averageMaturityOfOptions",
  "averageMaturityOfDebt",
  "pretaxCostOfDebt",
  "bookValueOfConvertibleDebt",
  "interestExpenseOnConvertibleDebt",
  "maturityOfConvertibleDebt",
  "numberOfPreferredShares",
  "marketPricePerShare",
  "annualDividendPerShare",
];

const parseInputQueryParams = (location) => {
  const search = location.search;
  const queryParams = new URLSearchParams(search);
  const inputQueryParams = {};

  inputQueryNames.forEach((inputQueryName) => {
    inputQueryParams[inputQueryName] =
      parseFloat(queryParams.get(inputQueryName)) || null;
  });

  return inputQueryParams;
};

export default parseInputQueryParams;
