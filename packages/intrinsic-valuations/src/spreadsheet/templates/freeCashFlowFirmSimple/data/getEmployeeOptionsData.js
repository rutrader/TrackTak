const getEmployeeOptionsData = () => {
  return {
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
      {
        format: "million",
      },
      {
        format: "million-currency",
      },
    ],
    merges: ["A1:B1"],
    rows: {
      0: {
        0: {
          merge: [0, 1],
          style: 5,
          comment:
            "Calculated from the inputs you entered in the Employee Options section. We use the Black Scholes methodology to work out the estimated market price per employee option. We then minus this from the 'Equity' cell in the Valuation Output (cell B34).",
        },
      },
      1: {
        1: {
          style: 6,
        },
      },
      2: {
        1: {
          style: 3,
        },
      },
      3: {
        1: {
          style: 4,
        },
      },
      4: {
        1: {
          style: 0,
        },
      },
      5: {
        1: {
          style: 0,
        },
      },
      6: {
        1: {
          style: 6,
        },
      },
      7: {
        1: {
          style: 3,
        },
      },
      9: {
        1: {
          style: 4,
        },
      },
      10: {
        1: {
          style: 4,
        },
      },
      12: {
        1: {
          style: 4,
        },
      },
      13: {
        1: {
          style: 4,
        },
      },
      15: {
        1: {
          style: 3,
        },
      },
      16: {
        1: {
          style: 7,
        },
      },
    },
    cols: {
      0: {
        width: 260,
      },
      1: {
        width: 165,
      },
    },
    validations: [],
    autofilter: {},
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
      ["Shares outstanding", '=FIN("sharesOutstanding")'],
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
  };
};

export default getEmployeeOptionsData;
