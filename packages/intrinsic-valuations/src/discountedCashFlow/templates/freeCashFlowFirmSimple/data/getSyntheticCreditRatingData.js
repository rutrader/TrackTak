/* eslint-disable no-sparse-arrays */
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
    ],
    merges: ["A1:B1", "A10:B10", "C10:D10"],
    rows: [
      {
        cells: [
          {
            text: "Synthetic Credit Rating",
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
            text: "Company Size",
            style: 8,
          },
          {
            style: 8,
            text: "Large",
          },
          {
            text: "Operating Income",
            style: 11,
          },
          {
            style: 11,
            text: '=FIN("operatingIncome")',
          },
          ,
          ,
          {
            text: "",
            style: 0,
          },
        ],
      },
      {
        cells: [
          {
            text: "Interest Coverage",
          },
          {
            text: "=IF(D3=0,Infinity,IF(D2<0,-Infinity,D2/D3))",
          },
          {
            text: "Interest Expense",
          },
          {
            text: '=ABS(FIN("interestExpense"))',
          },
        ],
      },
      {
        cells: [
          {
            text: "Estimated Bond Rating",
          },
          {
            text:
              '=IF(B2="Large",VLOOKUP(B3,A12:F26,5),IF(B2="Small", VLOOKUP(B3,C12:F26,3), 0))',
          },
          {
            text: "Market Capitalization",
          },
          {
            text: '=FIN("marketCapitalization")',
          },
        ],
      },
      {
        cells: [
          {
            text: "Estimated Country Default Spread",
          },
          {
            text: "0.76%",
          },
        ],
      },
      {
        cells: [
          {
            text: "Estimated Country Default Spread",
          },
          {
            text: "0%",
          },
        ],
      },
      {
        cells: [
          {
            text: "Estimated Pre-tax Cost of Debt",
            style: 19,
          },
          {
            text: "2.28%",
          },
        ],
      },
      ,
      ,
      {
        cells: [
          {
            text: "Large Companies (< $5,000m Market Cap)",
            merge: [0, 1],
            style: 16,
          },
          {
            style: 16,
          },
          {
            merge: [0, 1],
            text: "Smaller & Riskier Companies (< $5,000m Market Cap)",
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
            text: "Interest Coverage From",
            style: 18,
          },
          {
            text: "Interest Coverage To",
            style: 18,
          },
          {
            text: "Interest Coverage From",
            style: 18,
          },
          {
            text: "Interest Coverage To",
            style: 18,
          },
          {
            text: "Rating",
            style: 18,
          },
          {
            text: "Spread",
            style: 18,
          },
        ],
      },
      {
        cells: [
          {
            text: "-Infinity",
          },
          {
            text: "0.2",
          },
          {
            text: "-Infinity",
          },
          {
            text: "0.5",
          },
          {
            text: "D2/D",
          },
          {
            text: "21.66%",
          },
        ],
      },
      {
        cells: [
          {
            text: "0.2",
          },
          {
            text: "0.65",
          },
          {
            text: "0.5",
          },
          {
            text: "0.8",
          },
          {
            text: "C2/C",
          },
          {
            text: "16.25%",
          },
        ],
      },
      {
        cells: [
          {
            text: "0.65",
          },
          {
            text: "0.8",
          },
          {
            text: "0.8",
          },
          {
            text: "1.25",
          },
          {
            text: "Ca2/CC",
          },
          {
            text: "12.38%",
          },
        ],
      },
      {
        cells: [
          {
            text: "0.8",
          },
          {
            text: "1.25",
          },
          {
            text: "1.25",
          },
          {
            text: "1.5",
          },
          {
            text: "Caa/CCC",
          },
          {
            text: "11.75%",
          },
        ],
      },
      {
        cells: [
          {
            text: "1.25",
          },
          {
            text: "1.5",
          },
          {
            text: "1.5",
          },
          {
            text: "2",
          },
          {
            text: "B3/B-",
          },
          {
            text: "10.08%",
          },
        ],
      },
      {
        cells: [
          {
            text: "1.5",
          },
          {
            text: "1.75",
          },
          {
            text: "2",
          },
          {
            text: "2.5",
          },
          {
            text: "B2/B",
          },
          {
            text: "8.25%",
          },
        ],
      },
      {
        cells: [
          {
            text: "1.75",
          },
          {
            text: "2",
          },
          {
            text: "2.5",
          },
          {
            text: "3",
          },
          {
            text: "B1/B+",
          },
          {
            text: "4.31%",
          },
        ],
      },
      {
        cells: [
          {
            text: "2",
          },
          {
            text: "2.25",
          },
          {
            text: "3",
          },
          {
            text: "3.5",
          },
          {
            text: "Ba2/BB",
          },
          {
            text: "2.95%",
          },
        ],
      },
      {
        cells: [
          {
            text: "2.25",
          },
          {
            text: "2.5",
          },
          {
            text: "3.5",
          },
          {
            text: "4",
          },
          {
            text: "Ba1/BB+",
          },
          {
            text: "2.32%",
          },
        ],
      },
      {
        cells: [
          {
            text: "2.5",
          },
          {
            text: "3",
          },
          {
            text: "4",
          },
          {
            text: "4.5",
          },
          {
            text: "Baa2/BBB",
          },
          {
            text: "1.81%",
          },
        ],
      },
      {
        cells: [
          {
            text: "3",
          },
          {
            text: "4.25",
          },
          {
            text: "4.5",
          },
          {
            text: "6",
          },
          {
            text: "A3/A-",
          },
          {
            text: "1.34%",
          },
        ],
      },
      {
        cells: [
          {
            text: "4.25",
          },
          {
            text: "5.5",
          },
          {
            text: "6",
          },
          {
            text: "7.5",
          },
          {
            text: "A2/A",
          },
          {
            text: "1.19%",
          },
        ],
      },
      {
        cells: [
          {
            text: "5.5",
          },
          {
            text: "6.5",
          },
          {
            text: "7.5",
          },
          {
            text: "9.5",
          },
          {
            text: "A1/A+",
          },
          {
            text: "1.08%",
          },
        ],
      },
      {
        cells: [
          {
            text: "6.5",
          },
          {
            text: "8.5",
          },
          {
            text: "9.5",
          },
          {
            text: "12.5",
          },
          {
            text: "Aa2/AA",
          },
          {
            text: "0.86%",
          },
        ],
      },
      {
        cells: [
          {
            text: "8.5",
          },
          {
            text: "Infinity",
          },
          {
            text: "12.5",
          },
          {
            text: "Infinity",
          },
          {
            text: "Aaa/AAA",
          },
          {
            text: "0.76%",
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
