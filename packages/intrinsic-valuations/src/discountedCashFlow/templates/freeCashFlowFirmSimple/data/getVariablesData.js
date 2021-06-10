import { queryNames } from "../inputQueryNames";

const getVariablesData = (inputQueryParams) => {
  return [
    {
      name: "Required Inputs",
      freeze: "A1",
      styles: [
        {
          format: "percent",
        },
        {
          format: "million",
        },
        {
          format: "million-currency",
        },
        {
          format: "currency",
        },
        {
          format: "number",
        },
        {
          bgcolor: "rgba(47, 219, 171, 0.4)",
          format: "percent",
        },
        {
          bgcolor: "rgba(47, 219, 171, 0.4)",
          format: "number",
        },
      ],
      merges: [],
      rows: {
        0: {
          cells: [
            {
              text: "CAGR in Years 1-5 *",
            },
            {
              text: inputQueryParams[queryNames.cagrInYears_1_5],
              style: 5,
              comment:
                "Compound Annual Growth Rate - look at: a. Revenue growth in your company in recent years b. Your company's revenues, relative to the overall market size and larger players in the sector.",
            },
          ],
        },
        1: {
          height: 35,
          cells: [
            {
              text: "Operating Target Margin in\nYear 10 *",
            },
            {
              text: inputQueryParams[queryNames.ebitTargetMarginInYear_10],
              style: 5,
              comment:
                "Start by looking at your company's current pre-tax operating margin but also look at the average for your industry.",
            },
          ],
        },
        2: {
          cells: [
            {
              text: "Year of Convergence *",
            },
            {
              text: inputQueryParams[queryNames.yearOfConvergence],
              style: 6,
              comment:
                "The forecast year in which the companies current Operating margin will converge on the target Operating margin.",
            },
          ],
        },
        3: {
          cells: [
            {
              text: "Sales to Capital Ratio *",
            },
            {
              text: inputQueryParams[queryNames.salesToCapitalRatio],
              style: 6,
              comment:
                "The default value is set to the industry average as this is usually a good starting point. You should also look at the previous years sales to capital ratio's in the above table to fine tune this value. In the DCF output we compute how much the company is going to reinvest to keep the business growing in future years. The higher you set this number, the more efficiently the business is growing and the higher the value of your growth.",
            },
          ],
        },
        len: 100,
      },
      cols: {
        0: {
          width: 170,
        },
        1: {
          width: 75,
        },
        len: 26,
      },
      validations: [],
      autofilter: {},
    },
    {
      name: "Optional Inputs",
      freeze: "A1",
      styles: [
        {
          format: "percent",
        },
        {
          format: "million",
        },
        {
          format: "million-currency",
        },
        {
          format: "currency",
        },
        {
          format: "number",
        },
        {
          align: "center",
          underline: true,
          font: {
            bold: true,
          },
        },
      ],
      merges: ["A1:B1", "C1:D1", "E1:F1", "G1:H1", "I1:J1"],
      rows: {
        0: {
          cells: [
            {
              merge: [0, 1],
              text: "Normal Debt",
              style: 5,
            },
            {
              text: "",
            },
            {
              text: "Convertible Debt",
              style: 5,
              merge: [0, 1],
            },
            {
              text: "",
            },
            {
              text: "Preferred Stock",
              style: 5,
              merge: [0, 1],
            },
            {
              text: "",
            },
            {
              text: "Employee Options",
              style: 5,
              merge: [0, 1],
            },
            {
              text: "",
            },
            {
              text: "Other",
              style: 5,
              merge: [0, 1],
            },
          ],
        },
        1: {
          cells: [
            {
              text: "Pre-tax Cost of Debt",
            },
            {
              text: inputQueryParams[queryNames.pretaxCostOfDebt],
              style: 0,
              comment:
                "If you don't enter an input we will use a synthetic pre-tax cost of debt. You can override this by entering your own calculated pre-tax cost of debt here if you want.",
            },
            {
              text: "Book Value of Convertible Debt",
            },
            {
              text: inputQueryParams[queryNames.bookValueOfConvertibleDebt],
              style: 2,
              comment:
                "Debt which is convertible to equity at some point in time. This is found in the financial statements",
            },
            {
              text: "Number of Preferred Shares",
            },
            {
              text: inputQueryParams[queryNames.numberOfPreferredShares],
              style: 1,
              comment:
                "Shares of a company’s stock with dividends that are paid out to shareholders before common stock dividends are issued, i.e they have priority. This is found in the financial statements.",
            },
            {
              text: "Employee Options Outstanding",
            },
            {
              text: inputQueryParams[queryNames.employeeOptionsOutstanding],
              style: 1,
              comment:
                "The same as shares outstanding but specifically for the employees options outstanding instead. If the company does have employee options outstanding, enter the total number here, vested and non vested, in the money and out of the money. This is found in the financial statements.",
            },
            {
              text: "Net Operating Loss",
            },
            {
              text: inputQueryParams[queryNames.netOperatingLoss],
              style: 2,
              comment:
                "Any losses from the previous years that the company is carrying over to this year. It allows the company to reduce it's taxable income for the current year. This is found in the financial statements.",
            },
          ],
        },
        2: {
          cells: [
            {
              text: "Average Maturity of Debt",
            },
            {
              text: inputQueryParams[queryNames.averageMaturityOfDebt],
              style: 4,
              comment:
                "Years until all of the companies outstanding debt matures on average. Generally found in the footnotes to the financial statements.",
            },
            {
              text: "Interest Expense on Convertible Debt",
            },
            {
              text:
                inputQueryParams[queryNames.interestExpenseOnConvertibleDebt],
              style: 2,
              comment:
                "The same as normal interest expense but for Convertible Debt. This is found in the financial statements.",
            },
            {
              text: "Market Price Per Share",
            },
            {
              text: inputQueryParams[queryNames.marketPricePerShare],
              style: 3,
              comment:
                "The same as normal price per share but for Preferred Stock. This is found in the financial statements.",
            },
            {
              text: "Average Strike Price",
            },
            {
              text: inputQueryParams[queryNames.averageStrikePrice],
              style: 3,
              comment:
                "Enter the weighted average strike price of the employee options outstanding. This is found in the financial statements.",
            },
            {
              text: "Non-operating assets",
            },
            {
              text: inputQueryParams[queryNames.nonOperatingAssets],
              style: 2,
              comment:
                "Also known as 'cross holdings in other companies'. This is the earnings that don't (and will never) show up as part of the operating income. The most common non-operating assets are minority cross-holdings in other companies (which are not consolidated). You can find the book value of these holdings on the balance sheet, but best practice is to convert it to the market value. (Apply a price to book ratio, based on the sector that the company is in to the book value).",
            },
          ],
        },
        3: {
          cells: [
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "Maturity of Convertible Debt",
            },
            {
              text: inputQueryParams[queryNames.maturityOfConvertibleDebt],
              style: 4,
              comment:
                "The same as normal maturity of debt but for Convertible Debt. This is found in the financial statements.",
            },
            {
              text: "Annual Dividend Per Share",
            },
            {
              text: inputQueryParams[queryNames.annualDividendPerShare],
              style: 3,
              comment:
                "How much dividends are payed out on average per share each year. This is found in the financial statements.",
            },
            {
              text: "Average Maturity",
            },
            {
              text: inputQueryParams[queryNames.averageMaturityOfOptions],
              style: 4,
              comment:
                "The weighted average maturity of the employee options outstanding. This is found in the financial statements.",
            },
            {
              text: "Probability of Failure",
            },
            {
              text: inputQueryParams[queryNames.probabilityOfFailure],
              style: 0,
              comment:
                "Many young, growth companies fail, especially if they have trouble raising cash. Many distressed companies fail because they have trouble making debt payments. This is a tough input to estimate but try to use the agencies credit rating if the company has one, if not then use the synthetic credit rating default spread as a guide.",
            },
          ],
        },
        4: {
          cells: [
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "Proceeds as a Percentage of Book value",
            },
            {
              text:
                inputQueryParams[queryNames.proceedsAsAPercentageOfBookValue],
              style: 0,
              comment:
                "If the company fails then sometimes there will be assets that get sold off (usually at fire sale prices) or cash left over to distribute to shareholders. This is only true if all liabilites have been paid first as shareholders are last in line if a company goes bankrupt. Sometimes however, companies will continue to run themselves into the ground with more debt to continue giving the executives a job and therefore will never have proceeds to distribute to shareholders.",
            },
          ],
        },
        len: 100,
      },
      cols: {
        0: {
          width: 155,
        },
        1: {
          width: 75,
        },
        2: {
          width: 230,
        },
        3: {
          width: 85,
        },
        4: {
          width: 175,
        },
        5: {
          width: 85,
        },
        6: {
          width: 195,
        },
        7: {
          width: 85,
        },
        8: {
          width: 250,
        },
        9: {
          width: 85,
        },
        len: 26,
      },
      validations: [],
      autofilter: {},
    },
  ];
};

export default getVariablesData;
