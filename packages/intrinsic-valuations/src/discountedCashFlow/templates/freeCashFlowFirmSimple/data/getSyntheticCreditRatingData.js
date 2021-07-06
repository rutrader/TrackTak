const getSyntheticCreditRatingData = () => {
  return {
    name: "Synthetic Credit Rating",
    freeze: "A1",
    styles: [
      {
        font: {
          bold: true,
        },
      },
      {
        font: {
          bold: true,
        },
        align: "center",
      },
      {
        font: {
          bold: true,
        },
        align: "center",
        underline: true,
      },
      {
        font: {
          bold: true,
        },
        underline: true,
      },
      {
        font: {
          bold: true,
        },
        underline: false,
      },
      {
        font: {
          bold: true,
        },
        underline: false,
        align: "center",
      },
      {
        align: "center",
      },
      {
        font: {
          bold: true,
        },
        underline: false,
        align: "left",
      },
      {
        font: {
          bold: false,
        },
        underline: false,
        align: "left",
      },
      {
        font: {
          bold: false,
        },
        underline: false,
        align: "center",
      },
      {
        font: {
          bold: false,
        },
        align: "center",
      },
      {
        font: {
          bold: false,
        },
        align: "left",
      },
      {
        align: "center",
        font: {
          size: 14,
        },
      },
      {
        align: "center",
        font: {
          size: 12,
        },
      },
      {
        font: {
          bold: true,
          size: 14,
        },
        align: "center",
      },
      {
        font: {
          bold: true,
          size: 14,
        },
        align: "center",
        underline: true,
      },
      {
        font: {
          bold: true,
          size: 12,
        },
        align: "center",
      },
      {
        align: "center",
        font: {
          size: 10,
        },
      },
      {
        align: "center",
        font: {
          size: 10,
          bold: true,
        },
      },
      {
        font: {
          bold: false,
        },
      },
      {
        font: {
          bold: false,
        },
        align: "left",
        format: "currency",
      },
      {
        format: "currency",
      },
      {
        format: "percent",
      },
      {
        format: "number",
      },
      {
        font: {
          bold: false,
        },
        align: "left",
        format: "million-currency",
      },
      {
        format: "million-currency",
      },
    ],
    merges: ["A1:B1", "A10:B10", "C10:D10"],
    rows: {
      0: {
        cells: {
          0: {
            merge: [0, 1],
            style: 15,
          },
          1: {
            style: 15,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
        },
      },
      1: {
        cells: {
          0: {
            style: 8,
          },
          1: {
            style: 8,
            comment:
              "Large companies usually have stable earnings and less chance of defaulting on their debt. Smaller companies are usually risker, therefore they have higher costs of debts.",
          },
          2: {
            style: 11,
          },
          3: {
            style: 24,
          },
          4: {},
          5: {},
          6: {
            style: 0,
          },
          7: {},
          8: {},
        },
      },
      2: {
        cells: {
          0: {},
          1: {
            comment:
              "How many times over a company can satisfy it's interest expenses with just it's operating income. A good interest coverage is usually above 5. Companies with volatile operating income can produce misleading interest coverages as they differ each year.",
            style: 23,
          },
          2: {},
          3: {
            style: 25,
          },
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
        },
      },
      3: {
        cells: {
          0: {},
          1: {
            comment:
              "The estimated bond rating that we have worked out based on the companies interest coverage. It is similar to Moody's, S&P and Fitch's ratings. We use our own synthetic credit rating because a lot of companies do not have any rating assigned by these agencies.",
          },
          2: {},
          3: {
            style: 25,
          },
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
        },
      },
      4: {
        cells: {
          0: {},
          1: {
            comment:
              "The chance of a company defaulting on it's debts within a year.",
            style: 22,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
        },
      },
      5: {
        cells: {
          0: {},
          1: {
            comment:
              "The chance of a country defaulting on it's debts within a year.",
            style: 22,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
        },
      },
      6: {
        cells: {
          0: {
            style: 19,
          },
          1: {
            comment:
              "The Synthetic Credit Rating pre-tax cost of debt that we have automatically calculated for you. This is used to work out the cost of capital.",
            style: 22,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
        },
      },
      7: {
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
        },
      },
      8: {
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
        },
      },
      9: {
        cells: {
          0: {
            merge: [0, 1],
            style: 16,
          },
          1: {
            style: 16,
          },
          2: {
            merge: [0, 1],
            style: 16,
          },
          3: {
            style: 16,
          },
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
        },
      },
      10: {
        cells: {
          0: {
            style: 18,
          },
          1: {
            style: 18,
          },
          2: {
            style: 18,
          },
          3: {
            style: 18,
          },
          4: {
            style: 18,
          },
          5: {
            style: 18,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      11: {
        cells: {
          0: {},
          1: {
            style: 23,
          },
          2: {},
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      12: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      13: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      14: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      15: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      16: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      17: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      18: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      19: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      20: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      21: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      22: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      23: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      24: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 23,
          },
          2: {
            style: 23,
          },
          3: {
            style: 23,
          },
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      25: {
        cells: {
          0: {
            style: 23,
          },
          1: {},
          2: {
            style: 23,
          },
          3: {},
          4: {},
          5: {
            style: 22,
          },
          6: {},
          7: {},
          8: {},
        },
      },
      26: {
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
        },
      },
      27: {
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
        },
      },
      28: {
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
        },
      },
      29: {
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
        },
      },
      30: {
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
        },
      },
      31: {
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
        },
      },
      32: {
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
        },
      },
      33: {
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
        },
      },
      34: {
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
        },
      },
      35: {
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
        },
      },
      36: {
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
        },
      },
      37: {
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
        },
      },
      38: {
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
        },
      },
      39: {
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
        },
      },
      40: {
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
        },
      },
      41: {
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
        },
      },
      42: {
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
        },
      },
      43: {
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
        },
      },
      44: {
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
        },
      },
      45: {
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
        },
      },
      46: {
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
        },
      },
      47: {
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
        },
      },
      48: {
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
        },
      },
      49: {
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
        },
      },
      50: {
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
        },
      },
      51: {
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
        },
      },
      52: {
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
        },
      },
      53: {
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
        },
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
        width: 283,
      },
      1: {
        width: 273,
      },
      2: {
        width: 252,
      },
      3: {
        width: 238,
      },
    },
    validations: [],
    autofilter: {},
    serializedValues: [
      ["Synthetic Credit Rating"],
      [
        "Company Size",
        "Large",
        "Operating Income",
        '=FIN("operatingIncome")',
        null,
        null,
        "",
      ],
      [
        "Interest Coverage",
        "=IF(D3=0,Infinity,IF(D2<0,-Infinity,D2/D3))",
        "Interest Expense",
        '=ABS(FIN("interestExpense"))',
      ],
      [
        "Estimated Bond Rating",
        '=IF(B2="Large",VLOOKUP(B3,A12:F26,5),IF(B2="Small", VLOOKUP(B3,C12:F26,3), 0))',
        "Market Capitalization",
        '=FIN("marketCapitalization")',
      ],
      [
        "Estimated Company Default Spread",
        '=IF(B2="Large",VLOOKUP(B3,A12:F26,6),IF(B2="Small", VLOOKUP(B3,C12:F26,4), 0))',
      ],
      ["Estimated Country Default Spread", '=FIN("adjDefaultSpread")'],
      ["Estimated Pre-tax Cost of Debt", '=FIN("riskFreeRate")+B5+B6'],
      [""],
      [""],
      [
        "Large Companies (< $5,000m Market Cap)",
        null,
        "Smaller & Riskier Companies (< $5,000m Market Cap)",
      ],
      [
        "Interest Coverage From",
        "Interest Coverage To",
        "Interest Coverage From",
        "Interest Coverage To",
        "Rating",
        "Spread",
      ],
      ["-Infinity", "0.2", "-Infinity", "0.5", "D2/D", "17.44%\r"],
      ["0.2", "0.65", "0.5", "0.8", "C2/C", "13.09%\r"],
      ["0.65", "0.8", "0.8", "1.25", "Ca2/CC", "9.97%\r"],
      ["0.8", "1.25", "1.25", "1.5", "Caa/CCC", "9.46%\r"],
      ["1.25", "1.5", "1.5", "2", "B3/B-", "5.94%\r"],
      ["1.5", "1.75", "2", "2.5", "B2/B", "4.86%\r"],
      ["1.75", "2", "2.5", "3", "B1/B+", "4.05%\r"],
      ["2", "2.25", "3", "3.5", "Ba2/BB", "2.77%\r"],
      ["2.25", "2.5", "3.5", "4", "Ba1/BB+", "2.31%\r"],
      ["2.5", "3", "4", "4.5", "Baa2/BBB", "1.71%\r"],
      ["3", "4.25", "4.5", "6", "A3/A-", "1.33%\r"],
      ["4.25", "5.5", "6", "7.5", "A2/A", "1.18%\r"],
      ["5.5", "6.5", "7.5", "9.5", "A1/A+", "1.07%\r"],
      ["6.5", "8.5", "9.5", "12.5", "Aa2/AA", "0.85%\r"],
      ["8.5", "Infinity", "12.5", "Infinity", "Aaa/AAA", "0.69%\r"],
      [null, null, null, null, null, ""],
    ],
  };
};

export default getSyntheticCreditRatingData;
