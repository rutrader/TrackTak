import { styleMap, styles } from "../../utils";
import { labels } from "./inputQueryNames";

const getEmployeeOptionsSheet = () => {
  const dataSheet = {
    name: "Employee Options",
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
    merges: ["A1:B1"],
    cols: {
      0: {
        width: 260,
      },
      1: {
        width: 165,
      },
    },
    rows: {
      0: {
        cells: [
          {
            text: "Black Scholes Employee Options Results",
            merge: [0, 1],
            style: 5,
            comment:
              "Calculated from the inputs you entered in the Employee Options section. We use the Black Scholes methodology to work out the estimated market price per employee option. We then minus this from the 'Equity' cell in the Valuation Output (cell B34).",
          },
        ],
      },
      1: {
        cells: [
          {
            text: labels.employeeOptionsOutstanding,
          },
          {
            text: "='Optional Inputs'!$H$2",
            style: styleMap.million,
          },
        ],
      },
      2: {
        cells: [
          {
            text: labels.averageStrikePrice,
          },
          {
            text: "='Optional Inputs'!$H$3",
            style: styleMap.currency,
          },
        ],
      },
      3: {
        cells: [
          {
            text: labels.averageMaturityOfOptions,
          },
          {
            text: "='Optional Inputs'!$H$4",
            style: styleMap.year,
          },
        ],
      },
      4: {
        cells: [
          {
            text: "Standard deviation in stock price (volatility)",
          },
          {
            text: "=standardDeviationInStockPrices",
            style: styleMap.percent,
          },
        ],
      },
      5: {
        cells: [
          {
            text: "Risk free rate",
          },
          {
            text: "=riskFreeRate",
            style: styleMap.percent,
          },
        ],
      },
      6: {
        cells: [
          {
            text: "Shares outstanding",
          },
          {
            text: "=sharesOutstanding",
            style: styleMap.million,
          },
        ],
      },
      7: {
        cells: [
          {
            text: "Share price",
          },
          {
            text: "=price",
            style: styleMap.currency,
          },
        ],
      },
      8: {
        cells: [
          {
            text: "",
          },
        ],
      },
      9: {
        cells: [
          {
            text: "d1",
          },
          {
            text:
              "=IFERROR((LN(B8 / B3) + (B6 + (B5 * B5) / 2) * B4) / (B5 * SQRT(B4)), 0)",
          },
        ],
      },
      10: {
        cells: [
          {
            text: "N (d1)",
          },
          {
            text: "=NORMSDIST(B10, TRUE)",
          },
        ],
      },
      11: {
        cells: [
          {
            text: "",
          },
        ],
      },
      12: {
        cells: [
          {
            text: "d2",
          },
          {
            text: "=B10 - B5 * SQRT(B4)",
          },
        ],
      },
      13: {
        cells: [
          {
            text: "N (d2)",
          },
          {
            text: "=NORMSDIST(B13, TRUE)",
          },
        ],
      },
      14: {
        cells: [
          {
            text: "",
          },
        ],
      },
      15: {
        cells: [
          {
            text: "Value per option",
          },
          {
            text: "=B8 * B11 - B3 * EXP(-B6 * B4) * B14",
            style: styleMap.currency,
          },
        ],
      },
      16: {
        cells: [
          {
            text: "Value of all options",
          },
          {
            text: "=B16*B2",
            style: styleMap["million-currency"],
          },
        ],
      },
    },
  };

  return dataSheet;
};

export default getEmployeeOptionsSheet;
