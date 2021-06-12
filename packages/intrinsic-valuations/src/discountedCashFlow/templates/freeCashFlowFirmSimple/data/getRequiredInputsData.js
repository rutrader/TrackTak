import { queryNames } from "../inputQueryNames";

const getRequiredInputsData = (inputQueryParams) => {
  return {
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
        cells: {
          0: {
            text: "CAGR in Years 1-5 *",
          },
          1: {
            text: inputQueryParams[queryNames.cagrInYears_1_5],
            style: 5,
            comment:
              "Compound Annual Growth Rate - look at: a. Revenue growth in your company in recent years b. Your company's revenues, relative to the overall market size and larger players in the sector.",
          },
        },
      },
      1: {
        height: 35,
        cells: {
          0: {
            text: "Operating Target Margin in\nYear 10 *",
          },
          1: {
            text: inputQueryParams[queryNames.ebitTargetMarginInYear_10],
            style: 5,
            comment:
              "Start by looking at your company's current pre-tax operating margin but also look at the average for your industry.",
          },
        },
      },
      2: {
        cells: {
          0: {
            text: "Year of Convergence *",
          },
          1: {
            text: inputQueryParams[queryNames.yearOfConvergence],
            style: 6,
            comment:
              "The forecast year in which the companies current Operating margin will converge on the target Operating margin.",
          },
        },
      },
      3: {
        cells: {
          0: {
            text: "Sales to Capital Ratio *",
          },
          1: {
            text: inputQueryParams[queryNames.salesToCapitalRatio],
            style: 6,
            comment:
              "The default value is set to the industry average as this is usually a good starting point. You should also look at the previous years sales to capital ratio's in the above table to fine tune this value. In the DCF output we compute how much the company is going to reinvest to keep the business growing in future years. The higher you set this number, the more efficiently the business is growing and the higher the value of your growth.",
          },
        },
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
  };
};

export default getRequiredInputsData;
