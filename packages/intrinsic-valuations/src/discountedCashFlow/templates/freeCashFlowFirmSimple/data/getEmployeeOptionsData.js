const getEmployeeOptionsData = () => {
  return {
    calculationOrder: 0,
    name: "Employee Options",
    freeze: "A1",
    serializedValues: [
      ["Black Scholes Employee Options Results"],
      ["Employee Options Outstanding", "='Optional Inputs'!$H$2"],
      ["Average Strike Price", "='Optional Inputs'!$H$3"],
      ["Average Maturity", "='Optional Inputs'!$H$4"],
      [
        "Standard deviation in stock price (volatility)",
        '=FIN("standardDeviationInStockPrices")',
      ],
      ["Risk free rate", '=FIN("riskFreeRate")'],
      ["Shares outstanding", '=FIN("sharesOutstanding")/ 1000000'],
      ["Share price", '=FIN("price")'],
      [""],
      [
        "d1",
        "=IFERROR((LN(B8 / B3) + (B6 + (B5 * B5) / 2) * B4) / (B5 * SQRT(B4)), 0)",
      ],
      ["N (d1)", "=NORMDIST(B10, 0, 1, TRUE)"],
      [""],
      ["d2", "=B10 - B5 * SQRT(B4)"],
      ["N (d2)", "=NORMDIST(B13, 0, 1, TRUE)"],
      [""],
      ["Value per option", "=B8 * B11 - B3 * EXP(-B6 * B4) * B14"],
      ["Value of all options", "=B16*B2"],
    ],
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
            merge: [0, 1],
            style: 5,
            comment:
              "Calculated from the inputs you entered in the Employee Options section. We use the Black Scholes methodology to work out the estimated market price per employee option. We then minus this from the 'Equity' cell in the Valuation Output (cell B34).",
          },
        },
      },
      1: {
        cells: {
          1: {
            style: 4,
          },
        },
      },
      2: {
        cells: {
          1: {
            style: 3,
          },
        },
      },
      3: {
        cells: {
          1: {
            style: 4,
          },
        },
      },
      4: {
        cells: {
          1: {
            style: 0,
          },
        },
      },
      5: {
        cells: {
          1: {
            style: 0,
          },
        },
      },
      6: {
        cells: {
          1: {
            style: 4,
          },
        },
      },
      7: {
        cells: {
          1: {
            style: 3,
          },
        },
      },
      15: {
        cells: {
          1: {
            style: 3,
          },
        },
      },
      16: {
        cells: {
          1: {
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
