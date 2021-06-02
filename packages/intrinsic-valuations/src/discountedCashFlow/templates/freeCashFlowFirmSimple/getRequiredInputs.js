import { styleMap, styles } from "../../utils";
import {
  cagrInYears_1_5Label,
  ebitTargetMarginInYear_10Label,
  salesToCapitalRatioLabel,
  yearOfConvergenceLabel,
} from "./inputQueryNames";

export const requiredInputsSheetName = "Required Inputs";
export const requiredInputsId = "required-inputs";

export const getRequiredInputs = (inputQueryParams) => {
  return {
    name: requiredInputsSheetName,
    cols: {
      0: {
        width: 185,
      },
      1: {
        width: 75,
      },
    },
    styles,
    rows: {
      0: {
        cells: [
          {
            text: cagrInYears_1_5Label,
          },
          {
            text: inputQueryParams.cagrInYears_1_5,
            style: styleMap.percent,
            comment: `Compound Annual Growth Rate - look at: a. Revenue growth in your company in recent years b. Your company's revenues, relative to the overall market size and larger players in the sector.`,
          },
        ],
      },
      1: {
        cells: [
          {
            text: ebitTargetMarginInYear_10Label,
          },
          {
            text: inputQueryParams.ebitTargetMarginInYear_10,
            style: styleMap.percent,
            comment: `Earnings Before Interest and Taxes - Start by looking at your company's current pre-tax operating margin but also look at the average for your industry.`,
          },
        ],
      },
      2: {
        cells: [
          {
            text: yearOfConvergenceLabel,
          },
          {
            text: inputQueryParams.yearOfConvergence,
            style: styleMap.number,
            comment: `The forecast year in which the companies current Operating margin will converge on the target Operating margin.`,
          },
        ],
      },
      3: {
        cells: [
          {
            text: salesToCapitalRatioLabel,
          },
          {
            text: inputQueryParams.salesToCapitalRatio,
            style: styleMap.number,
            comment: `The default value is set to the industry average as this is usually a good starting point. You should also look at the previous years sales to capital ratio's in the above table to fine tune this value. In the DCF output we compute how much the company is going to reinvest to keep the business growing in future years. The higher you set this number, the more efficiently the business is growing and the higher the value of your growth.`,
          },
        ],
      },
    },
  };
};
