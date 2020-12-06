const parseInputQueryParams = (location) => {
  const search = location.search;
  const queryParams = new URLSearchParams(search);
  const inputQueryParams = {
    cagrYearOneToFive: queryParams.get("cagrYearOneToFive"),
    ebitTargetMarginInYearTen: queryParams.get("ebitTargetMarginInYearTen"),
    yearOfConvergence: queryParams.get("yearOfConvergence"),
    salesToCapitalRatio: queryParams.get("salesToCapitalRatio"),
    numberOfOptionsOutstanding: queryParams.get("numberOfOptionsOutstanding"),
    averageStrikePrice: queryParams.get("averageStrikePrice"),
    averageMaturityOfOptions: queryParams.get("averageMaturityOfOptions"),
    averageMaturityOfDebt: queryParams.get("averageMaturityOfDebt"),
    pretaxCostOfDebt: queryParams.get("pretaxCostOfDebt"),
    bookValueOfConvertibleDebt: queryParams.get("bookValueOfConvertibleDebt"),
    interestExpenseOnConvertibleDebt: queryParams.get(
      "interestExpenseOnConvertibleDebt"
    ),
    maturityOfConvertibleDebt: queryParams.get("maturityOfConvertibleDebt"),
    numberOfPreferredShares: queryParams.get("numberOfPreferredShares"),
    marketPricePerShare: queryParams.get("marketPricePerShare"),
    annualDividendPerShare: queryParams.get("annualDividendPerShare"),
  };

  const parsedInputQueryParams = {};

  Object.keys(inputQueryParams).forEach((key) => {
    parsedInputQueryParams[key] = parseFloat(inputQueryParams[key]) || null;
  });

  return parsedInputQueryParams;
};

export default parseInputQueryParams;
