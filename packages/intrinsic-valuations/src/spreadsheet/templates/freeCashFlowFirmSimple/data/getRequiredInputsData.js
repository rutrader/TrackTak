const getRequiredInputsData = () => {
  return {
    name: "Required Inputs",
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
        bgcolor: "rgba(47, 219, 171, 0.4)",
        format: "percent",
      },
      {
        bgcolor: "rgba(47, 219, 171, 0.4)",
        format: "number",
      },
      {
        bgcolor: "#ffe59a",
      },
    ],
    merges: [],
    serializedValues: [
      [
        "CAGR in Years 1-5 *",
        null,
        null,
        "Fill out the green input cells to generate your DCF",
      ],
      [
        "Operating Target Margin in\nYear 10 *",
        null,
        null,
        "Numbers are in millions, expect per share amounts",
      ],
      ["Year of Convergence *"],
      ["Sales to Capital Ratio *", `=FIN("sales/Capital")`],
    ],
    rows: {
      0: {
        cells: {
          0: {},
          1: {
            style: 5,
            comment:
              "Compound Annual Growth Rate - look at: a. Revenue growth in your company in recent years b. Your company's revenues, relative to the overall market size and larger players in the sector.",
          },
          2: {},
          3: {
            style: 7,
          },
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
        },
      },
      1: {
        height: 35,
        cells: {
          0: {},
          1: {
            style: 5,
            comment:
              "Start by looking at your company's current pre-tax operating margin but also look at the average for your industry.",
          },
          2: {},
          3: {
            style: 7,
          },
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
        },
      },
      2: {
        cells: {
          0: {},
          1: {
            style: 6,
            comment:
              "The forecast year in which the companies current Operating margin will converge on the target Operating margin.",
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
        },
      },
      3: {
        cells: {
          0: {},
          1: {
            style: 6,
            comment:
              "The efficiency of how much the company has to reinvest the business to grow. The formula is Revenue / Invested Capital. The higher the number the more efficient the company is. The default value is set to the industry average as this is usually a good starting point. You should also look at the previous years sales to capital ratio's in the above table to fine tune this value. In the DCF output we compute how much the company is going to reinvest to keep the business growing in future years. The higher you set this number, the more efficiently the business is growing and the higher the value of your growth.",
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
        },
      },
      4: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
        },
      },
      5: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
        },
      },
      6: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
        },
      },
      7: {
        cells: {},
      },
      8: {
        cells: {},
      },
      9: {
        cells: {},
      },
      10: {
        cells: {},
      },
      11: {
        cells: {},
      },
      12: {
        cells: {},
      },
      13: {
        cells: {},
      },
      14: {
        cells: {},
      },
      15: {
        cells: {},
      },
      16: {
        cells: {},
      },
      17: {
        cells: {},
      },
      18: {
        cells: {},
      },
      19: {
        cells: {},
      },
      20: {
        cells: {},
      },
      21: {
        cells: {},
      },
      22: {
        cells: {},
      },
      23: {
        cells: {},
      },
      24: {
        cells: {},
      },
      25: {
        cells: {},
      },
      26: {
        cells: {},
      },
      27: {
        cells: {},
      },
      28: {
        cells: {},
      },
      29: {
        cells: {},
      },
      30: {
        cells: {},
      },
      31: {
        cells: {},
      },
      32: {
        cells: {},
      },
      33: {
        cells: {},
      },
      34: {
        cells: {},
      },
      35: {
        cells: {},
      },
      36: {
        cells: {},
      },
      37: {
        cells: {},
      },
      38: {
        cells: {},
      },
      39: {
        cells: {},
      },
      40: {
        cells: {},
      },
      41: {
        cells: {},
      },
      42: {
        cells: {},
      },
      43: {
        cells: {},
      },
      44: {
        cells: {},
      },
      45: {
        cells: {},
      },
      46: {
        cells: {},
      },
      47: {
        cells: {},
      },
      48: {
        cells: {},
      },
      49: {
        cells: {},
      },
      50: {
        cells: {},
      },
      51: {
        cells: {},
      },
      52: {
        cells: {},
      },
      53: {
        cells: {},
      },
      54: {
        cells: {},
      },
      55: {
        cells: {},
      },
      56: {
        cells: {},
      },
      57: {
        cells: {},
      },
      58: {
        cells: {},
      },
      59: {
        cells: {},
      },
      60: {
        cells: {},
      },
      61: {
        cells: {},
      },
      62: {
        cells: {},
      },
      63: {
        cells: {},
      },
      64: {
        cells: {},
      },
      65: {
        cells: {},
      },
      66: {
        cells: {},
      },
      67: {
        cells: {},
      },
      68: {
        cells: {},
      },
      69: {
        cells: {},
      },
      70: {
        cells: {},
      },
      71: {
        cells: {},
      },
      72: {
        cells: {},
      },
      73: {
        cells: {},
      },
      74: {
        cells: {},
      },
      75: {
        cells: {},
      },
      76: {
        cells: {},
      },
      77: {
        cells: {},
      },
      78: {
        cells: {},
      },
      79: {
        cells: {},
      },
      80: {
        cells: {},
      },
      81: {
        cells: {},
      },
      82: {
        cells: {},
      },
      83: {
        cells: {},
      },
      84: {
        cells: {},
      },
      85: {
        cells: {},
      },
      86: {
        cells: {},
      },
      87: {
        cells: {},
      },
      88: {
        cells: {},
      },
      89: {
        cells: {},
      },
      90: {
        cells: {},
      },
      91: {
        cells: {},
      },
      92: {
        cells: {},
      },
      93: {
        cells: {},
      },
      94: {
        cells: {},
      },
      95: {
        cells: {},
      },
      96: {
        cells: {},
      },
      97: {
        cells: {},
      },
      98: {
        cells: {},
      },
      99: {
        cells: {},
      },
    },
    cols: {
      0: {
        width: 170,
      },
      1: {
        width: 75,
      },
      3: {
        width: 305,
      },
    },
    validations: [],
    autofilter: {},
  };
};

export default getRequiredInputsData;
