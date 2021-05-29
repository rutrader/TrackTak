import { styleMap, styles } from "../../utils";

export const optionalInputsSheetName = "Optional Inputs";

export const getOptionalInputs = () => {
  return {
    name: optionalInputsSheetName,
    rows: {
      0: {
        cells: [
          {
            text: "Normal Debt",
          },
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
          },
        ],
      },
    },
    styles,
  };
};
