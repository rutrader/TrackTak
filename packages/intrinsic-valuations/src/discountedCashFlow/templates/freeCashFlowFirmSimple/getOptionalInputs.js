import { styleMap, styles } from "../../utils";

export const optionalInputsSheetName = "Optional Inputs";

export const getOptionalInputs = () => {
  return {
    name: optionalInputsSheetName,
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
    },
    merges: ["A1:B1", "C1:D1", "E1:F1", "G1:H1", "I1:J1"],
    styles: [
      ...styles,
      {
        align: "center",
        underline: true,
        font: {
          bold: true,
        },
      },
    ],
    rows: {
      0: {
        cells: [
          {
            text: "Normal Debt",
            style: 5,
          },
          { text: "" },
          { text: "Convertible Debt", style: 5 },
          { text: "" },
          { text: "Preferred Stock", style: 5 },
          { text: "" },
          { text: "Employee Options", style: 5 },
          { text: "" },
          { text: "Other", style: 5 },
        ],
      },
      1: {
        cells: [
          {
            text: "Pre-tax Cost of Debt",
          },
          {
            text: "",
            style: styleMap.percent,
            comment: `If you don't enter an input we will use a synthetic pre-tax cost of debt. You can override this by entering your own calculated pre-tax cost of debt here if you want.`,
          },
          {
            text: "Book Value of Convertible Debt",
          },
          {
            text: "",
            style: styleMap["million-currency"],
            comment: `Debt which is convertible to equity at some point in time. This is found in the financial statements`,
          },
          {
            text: "Number of Preferred Shares",
          },
          {
            text: "",
            style: styleMap.million,
            comment: `Shares of a company’s stock with dividends that are paid out to shareholders before common stock dividends are issued, i.e they have priority. This is found in the financial statements.`,
          },
          {
            text: "Employee Options Outstanding",
          },
          {
            text: "",
            style: styleMap.million,
            comment: `The same as shares outstanding but specifically for the employees options outstanding instead. If the company does have employee options outstanding, enter the total number here, vested and non vested, in the money and out of the money. This is found in the financial statements.`,
          },
          { text: "Net Operating Loss (NOL)" },
          {
            text: "",
            style: styleMap["million-currency"],
            comment: `Any losses from the previous years that the company is carrying over to this year. It allows the company to reduce it's taxable income for the current year. This is found in the financial statements.`,
          },
        ],
      },
      2: {
        cells: [
          {
            text: "Average Maturity of Debt",
          },
          {
            text: "",
            style: styleMap.year,
            comment: `Years until all of the companies outstanding debt matures on average. Generally found in the footnotes to the financial statements.`,
          },
          {
            text: "Interest Expense on Convertible Debt",
          },
          {
            text: "",
            style: styleMap["million-currency"],
            comment: `The same as normal interest expense but for Convertible Debt. This is found in the financial statements.`,
          },
          {
            text: "Market Price Per Share",
          },
          {
            text: "",
            style: styleMap.currency,
            comment: `The same as normal price per share but for Preferred Stock. This is found in the financial statements.`,
          },
          {
            text: "Average Strike Price",
          },
          {
            text: "",
            style: styleMap.currency,
            comment: `Enter the weighted average strike price of the employee options outstanding. This is found in the financial statements.`,
          },
          {
            text: "Non-operating Assets",
          },
          {
            text: "",
            style: styleMap["million-currency"],
            comment: `Also known as 'cross holdings in other companies'. This is the earnings that don't (and will never) show up as part of the operating income. The most common non-operating assets are minority cross-holdings in other companies (which are not consolidated). You can find the book value of these holdings on the balance sheet, but best practice is to convert it to the market value. (Apply a price to book ratio, based on the sector that the company is in to the book value).`,
          },
        ],
      },
      3: {
        cells: [
          { text: "" },
          { text: "" },
          {
            text: "Maturity of Convertible Debt",
          },
          {
            text: "",
            style: styleMap.year,
            comment: `The same as normal maturity of debt but for Convertible Debt. This is found in the financial statements.`,
          },
          {
            text: "Annual Dividend Per Share",
          },
          {
            text: "",
            style: styleMap.currency,
            comment: `How much dividends are payed out on average per share each year. This is found in the financial statements.`,
          },
          {
            text: "Average Maturity",
          },
          {
            text: "",
            style: styleMap.year,
            comment: `The weighted average maturity of the employee options outstanding. This is found in the financial statements.`,
          },
          {
            text: "Probability of Failure",
          },
          {
            text: "",
            style: styleMap.percent,
            comment: `Many young, growth companies fail, especially if they have trouble raising cash. Many distressed companies fail because they have trouble making debt payments. This is a tough input to estimate but try to use the agencies credit rating if the company has one, if not then use the synthetic credit rating default spread as a guide.`,
          },
        ],
      },
      4: {
        cells: [
          { text: "" },
          { text: "" },
          { text: "" },
          { text: "" },
          { text: "" },
          { text: "" },
          { text: "" },
          { text: "" },
          { text: "Proceeds as a Percentage of Book value" },
          {
            text: "",
            style: styleMap.percent,
            comment: `If the company fails then sometimes there will be assets that get sold off (usually at fire sale prices) or cash left over to distribute to shareholders. This is only true if all liabilites have been paid first as shareholders are last in line if a company goes bankrupt. Sometimes however, companies will continue to run themselves into the ground with more debt to continue giving the executives a job and therefore will never have proceeds to distribute to shareholders.`,
          },
        ],
      },
    },
  };
};
