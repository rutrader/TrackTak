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
            style: 20,
          },
          6: {
            style: 0,
          },
        },
      },
      2: {
        cells: {
          1: {
            comment:
              "How many times over a company can satisfy it's interest expenses with just it's operating income. A good interest coverage is usually above 5. Companies with volatile operating income can produce misleading interest coverages as they differ each year.",
            style: 23,
          },
          3: {
            style: 21,
          },
        },
      },
      3: {
        cells: {
          1: {
            comment:
              "The estimated bond rating that we have worked out based on the companies interest coverage. It is similar to Moody's, S&P and Fitch's ratings. We use our own synthetic credit rating because a lot of companies do not have any rating assigned by these agencies.",
          },
          3: {
            style: 21,
          },
        },
      },
      4: {
        cells: {
          1: {
            comment:
              "The chance of a company defaulting on it's debts within a year.",
            style: 22,
          },
        },
      },
      5: {
        cells: {
          1: {
            comment:
              "The chance of a country defaulting on it's debts within a year.",
            style: 22,
          },
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
        },
      },
      11: {
        cells: {
          1: {
            style: 23,
          },
          3: {
            style: 23,
          },
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
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
          5: {
            style: 22,
          },
        },
      },
      25: {
        cells: {
          0: {
            style: 23,
          },
          2: {
            style: 23,
          },
          5: {
            style: 22,
          },
        },
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
        '=FIN("operatingIncome")/1000000',
        null,
        null,
        "",
      ],
      [
        "Interest Coverage",
        "=IF(D3=0,Infinity,IF(D2<0,-Infinity,D2/D3))",
        "Interest Expense",
        '=ABS(FIN("interestExpense"))/1000000',
      ],
      [
        "Estimated Bond Rating",
        '=IF(B2="Large",VLOOKUP(B3,A12:F26,5),IF(B2="Small", VLOOKUP(B3,C12:F26,3), 0))',
        "Market Capitalization",
        '=FIN("marketCapitalization")/1000000',
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
