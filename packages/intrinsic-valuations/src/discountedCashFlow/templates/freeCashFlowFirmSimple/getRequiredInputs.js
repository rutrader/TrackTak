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
    rows: {
      0: {
        cells: [
          {
            text: cagrInYears_1_5Label,
          },
          {
            text: inputQueryParams.cagrInYears_1_5,
            style: styleMap.percent,
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
          },
        ],
      },
    },
    styles,
  };
};
