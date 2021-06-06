import { camelCase } from "change-case";

export const labels = {
  cagrInYears_1_5: "CAGR in Years 1-5",
  ebitTargetMarginInYear_10: "Operating Target Margin in Year 10",
  yearOfConvergence: "Year of Convergence",
  salesToCapitalRatio: "Sales to Capital Ratio",
  pretaxCostOfDebt: "Pre-tax Cost of Debt",
  averageMaturityOfDebt: "Average Maturity of Debt",
  bookValueOfConvertibleDebt: "Book Value of Convertible Debt",
  interestExpenseOnConvertibleDebt: "Interest Expense on Convertible Debt",
  maturityOfConvertibleDebt: "Maturity of Convertible Debt",
  numberOfPreferredShares: "Number of Preferred Shares",
  marketPricePerShare: "Market Price Per Share",
  annualDividendPerShare: "Annual Dividend Per Share",
  employeeOptionsOutstanding: "Employee Options Outstanding",
  averageStrikePrice: "Average Strike Price",
  averageMaturityOfOptions: "Average Maturity",
  netOperatingLoss: "Net Operating Loss",
  nonOperatingAssets: "Non-operating assets",
  probabilityOfFailure: "Probability of Failure",
  proceedsAsAPercentageOfBookValue: "Proceeds as a Percentage of Book value",
};

export const queryNames = Object.keys(labels).reduce((prev, curr) => {
  // TODO: Remove once we convert to ebit fully
  if (curr === "ebitTargetMarginInYear_10") {
    return {
      ...prev,
      [curr]: camelCase("EBIT Target Margin in Year 10"),
    };
  }
  return {
    ...prev,
    [curr]: camelCase(labels[curr]),
  };
}, {});
