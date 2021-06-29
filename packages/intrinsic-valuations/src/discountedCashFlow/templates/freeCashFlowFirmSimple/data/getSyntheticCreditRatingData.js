/* eslint-disable no-sparse-arrays */
const getSyntheticCreditRatingData = () => {
  return {
    name: "Synthetic Credit Rating",
    freeze: "A1",
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
      ["-Infinity", "0.2", "-Infinity", "0.5", "D2/D", "21.66%"],
      ["0.2", "0.65", "0.5", "0.8", "C2/C", "16.25%"],
      ["0.65", "0.8", "0.8", "1.25", "Ca2/CC", "12.38%"],
      ["0.8", "1.25", "1.25", "1.5", "Caa/CCC", "11.75%"],
      ["1.25", "1.5", "1.5", "2", "B3/B-", "10.08%"],
      ["1.5", "1.75", "2", "2.5", "B2/B", "8.25%"],
      ["1.75", "2", "2.5", "3", "B1/B+", "4.31%"],
      ["2", "2.25", "3", "3.5", "Ba2/BB", "2.95%"],
      ["2.25", "2.5", "3.5", "4", "Ba1/BB+", "2.32%"],
      ["2.5", "3", "4", "4.5", "Baa2/BBB", "1.81%"],
      ["3", "4.25", "4.5", "6", "A3/A-", "1.34%"],
      ["4.25", "5.5", "6", "7.5", "A2/A", "1.19%"],
      ["5.5", "6.5", "7.5", "9.5", "A1/A+", "1.08%"],
      ["6.5", "8.5", "9.5", "12.5", "Aa2/AA", "0.86%"],
      ["8.5", "Infinity", "12.5", "Infinity", "Aaa/AAA", "0.76%"],
    ],
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
    ],
    merges: ["A1:B1", "A10:B10", "C10:D10"],
    rows: [
      {
        cells: [
          {
            merge: [0, 1],
            style: 15,
          },
          {
            style: 15,
          },
        ],
      },
      {
        cells: [
          {
            style: 8,
          },
          {
            style: 8,
            comment:
              "Large companies usually have stable earnings and less chance of defaulting on their debt. Smaller companies are usually risker, therefore they have higher costs of debts.",
          },
          {
            style: 11,
          },
          {
            style: 11,
          },
          ,
          ,
          {
            style: 0,
          },
        ],
      },
      {
        cells: [
          ,
          {
            comment:
              "How many times over a company can satisfy it's interest expenses with just it's operating income. A good interest coverage is usually above 5. Companies with volatile operating income can produce misleading interest coverages as they differ each year.",
          },
        ],
      },
      {
        cells: [
          ,
          {
            comment:
              "The estimated bond rating that we have worked out based on the companies interest coverage. It is similar to Moody's, S&P and Fitch's ratings. We use our own synthetic credit rating because a lot of companies do not have any rating assigned by these agencies.",
          },
        ],
      },
      {
        cells: [
          ,
          {
            comment:
              "The chance of a company defaulting on it's debts within a year.",
          },
        ],
      },
      {
        cells: [
          ,
          {
            comment:
              "The chance of a country defaulting on it's debts within a year.",
          },
        ],
      },
      {
        cells: [
          {
            style: 19,
          },
          {
            comment:
              "The Synthetic Credit Rating pre-tax cost of debt that we have automatically calculated for you. This is used to work out the cost of capital.",
          },
        ],
      },
      ,
      ,
      {
        cells: [
          {
            merge: [0, 1],
            style: 16,
          },
          {
            style: 16,
          },
          {
            merge: [0, 1],
            style: 16,
          },
          {
            style: 16,
          },
        ],
      },
      {
        cells: [
          {
            style: 18,
          },
          {
            style: 18,
          },
          {
            style: 18,
          },
          {
            style: 18,
          },
          {
            style: 18,
          },
          {
            style: 18,
          },
        ],
      },
    ],
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
  };
};

export default getSyntheticCreditRatingData;
