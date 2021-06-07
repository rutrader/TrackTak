import { styles } from "../../utils";
import { labels, queryNames } from "./inputQueryNames";
import { alpha } from "@material-ui/core/styles";

export const requiredInputsSheetName = "Required Inputs";
export const requiredInputsId = "required-inputs";

const requiredFieldLabel = (label) => `${label} *`;

export const getRequiredInputs = (inputQueryParams, theme) => {
  const bgcolor = alpha(theme.palette.primary.light, 0.4);

  return {
    name: requiredInputsSheetName,
    cols: {
      0: {
        width: 170,
      },
      1: {
        width: 75,
      },
    },
    styles: [
      ...styles,
      {
        bgcolor,
        format: "percent",
      },
      {
        bgcolor,
        format: "number",
      },
    ],
    rows: {
      0: {
        cells: [
          {
            text: requiredFieldLabel(labels.cagrInYears_1_5),
          },
          {
            text: inputQueryParams[queryNames.cagrInYears_1_5],
            style: 5,
            comment: `Compound Annual Growth Rate - look at: a. Revenue growth in your company in recent years b. Your company's revenues, relative to the overall market size and larger players in the sector.`,
          },
        ],
      },
      1: {
        height: 35,
        cells: [
          { text: requiredFieldLabel("Operating Target Margin in\nYear 10") },
          {
            text: inputQueryParams[queryNames.ebitTargetMarginInYear_10],
            style: 5,
            comment: `Start by looking at your company's current pre-tax operating margin but also look at the average for your industry.`,
          },
        ],
      },
      2: {
        cells: [
          {
            text: requiredFieldLabel(labels.yearOfConvergence),
          },
          {
            text: inputQueryParams[queryNames.yearOfConvergence],
            style: 6,
            comment: `The forecast year in which the companies current Operating margin will converge on the target Operating margin.`,
          },
        ],
      },
      3: {
        cells: [
          {
            text: requiredFieldLabel(labels.salesToCapitalRatio),
          },
          {
            text: inputQueryParams[queryNames.salesToCapitalRatio],
            style: 6,
            comment: `The default value is set to the industry average as this is usually a good starting point. You should also look at the previous years sales to capital ratio's in the above table to fine tune this value. In the DCF output we compute how much the company is going to reinvest to keep the business growing in future years. The higher you set this number, the more efficiently the business is growing and the higher the value of your growth.`,
          },
        ],
      },
    },
  };
};
