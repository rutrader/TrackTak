const getEmployeeOptionsData = () => {
  return {
    calculationOrder: 0,
    name: "Employee Options",
    freeze: "A1",
    styles: [
      {
        format: "percent",
      },
      {},
      {},
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
    merges: ["A1:B1"],
    rows: {
      0: {
        cells: {
          0: {
            text: "Black Scholes Employee Options Results",
            merge: [0, 1],
            style: 5,
            comment:
              "Calculated from the inputs you entered in the Employee Options section. We use the Black Scholes methodology to work out the estimated market price per employee option. We then minus this from the 'Equity' cell in the Valuation Output (cell B34).",
          },
        },
      },
      1: {
        cells: {
          0: {
            text: "Employee Options Outstanding",
          },
          1: {
            text: "='Optional Inputs'!$H$2",
            style: 4,
          },
        },
      },
      2: {
        cells: {
          0: {
            text: "Average Strike Price",
          },
          1: {
            text: "='Optional Inputs'!$H$3",
            style: 3,
          },
        },
      },
      3: {
        cells: {
          0: {
            text: "Average Maturity",
          },
          1: {
            text: "='Optional Inputs'!$H$4",
            style: 4,
          },
        },
      },
      4: {
        cells: {
          0: {
            text: "Standard deviation in stock price (volatility)",
          },
          1: {
            text: '=FIN("standardDeviationInStockPrices")',
            style: 0,
          },
        },
      },
      5: {
        cells: {
          0: {
            text: "Risk free rate",
          },
          1: {
            text: '=FIN("riskFreeRate")',
            style: 0,
          },
        },
      },
      6: {
        cells: {
          0: {
            text: "Shares outstanding",
          },
          1: {
            text: '=FIN("sharesOutstanding")/ 1000000',
            style: 4,
          },
        },
      },
      7: {
        cells: {
          0: {
            text: "Share price",
          },
          1: {
            text: '=FIN("price")',
            style: 3,
          },
        },
      },
      8: {
        cells: {
          0: {
            text: "",
          },
        },
      },
      9: {
        cells: {
          0: {
            text: "d1",
          },
          1: {
            text:
              "=IFERROR((LN(B8 / B3) + (B6 + (B5 * B5) / 2) * B4) / (B5 * SQRT(B4)), 0)",
          },
        },
      },
      10: {
        cells: {
          0: {
            text: "N (d1)",
          },
          1: {
            text: "=NORMDIST(B10, 0, 1, TRUE)",
          },
        },
      },
      11: {
        cells: {
          0: {
            text: "",
          },
        },
      },
      12: {
        cells: {
          0: {
            text: "d2",
          },
          1: {
            text: "=B10 - B5 * SQRT(B4)",
          },
        },
      },
      13: {
        cells: {
          0: {
            text: "N (d2)",
          },
          1: {
            text: "=NORMDIST(B13, 0, 1, TRUE)",
          },
        },
      },
      14: {
        cells: {
          0: {
            text: "",
          },
        },
      },
      15: {
        cells: {
          0: {
            text: "Value per option",
          },
          1: {
            text: "=B8 * B11 - B3 * EXP(-B6 * B4) * B14",
            style: 3,
          },
        },
      },
      16: {
        cells: {
          0: {
            text: "Value of all options",
          },
          1: {
            text: "=B16*B2",
            style: 3,
          },
        },
      },
      len: 100,
    },
    cols: {
      0: {
        width: 260,
      },
      1: {
        width: 165,
      },
      len: 26,
    },
    validations: [],
    autofilter: {},
  };
};

export default getEmployeeOptionsData;
