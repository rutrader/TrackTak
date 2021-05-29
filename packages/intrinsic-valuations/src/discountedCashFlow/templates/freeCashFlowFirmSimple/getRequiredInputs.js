import { styleMap, styles } from "../../utils";

export const requiredInputsSheetName = "Required Inputs";

export const getRequiredInputs = (inputQueryParams) => {
  return {
    name: requiredInputsSheetName,
    rows: {
      0: {
        cells: [
          {
            text: "CAGR in Years 1-5",
          },
          {
            text: inputQueryParams.cagrYearOneToFive,
            style: styleMap.percent,
          },
        ],
      },
      1: {
        cells: [
          {
            text: "Operating Target Margin in Year 10",
          },
          {
            text: inputQueryParams.ebitTargetMarginInYearTen,
            style: styleMap.percent,
          },
        ],
      },
      2: {
        cells: [
          {
            text: "Year of Convergence",
          },
          {
            text: inputQueryParams.yearOfConvergence,
            style: styleMap.number,
          },
        ],
      },
      3: {
        cells: [
          {
            text: "Sales to Capital Ratio",
          },
          {
            text: inputQueryParams.salesToCapitalRatio,
            style: styleMap.number,
          },
        ],
      },
    },
    styles,
  };
};
