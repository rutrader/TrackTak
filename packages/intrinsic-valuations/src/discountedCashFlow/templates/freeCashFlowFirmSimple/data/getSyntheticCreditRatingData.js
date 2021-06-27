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
    rows: {
      0: {
        cells: {
          0: {
            text: "Synthetic Credit Rating",
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
            text: "Company Size",
            style: 8,
          },
          1: {
            style: 8,
            text: "Large",
          },
          2: {
            text: "Operating Income",
            style: 11,
          },
          3: {
            style: 11,
            text: '=FIN("operatingIncome")',
          },
          6: {
            text: "",
            style: 0,
          },
        },
      },
      2: {
        cells: {
          0: {
            text: "Interest Coverage",
          },
          1: {
            text: "=IF(D3=0,100000,IF(D2<0,-100000,D2/D3))",
          },
          2: {
            text: "Interest Expense",
          },
          3: {
            text: '=ABS(FIN("interestExpense"))',
          },
        },
      },
      3: {
        cells: {
          0: {
            text: "Estimated Bond Rating",
          },
          1: {
            text: '=IF(B2="Large",VLOOKUP(B3,A12:B26,2,TRUE),0)',
          },
          2: {
            text: "Market Capitalization",
          },
          3: {
            text: '=FIN("marketCapitalization")',
          },
        },
      },
      4: {
        cells: {
          0: {
            text: "Estimated Country Default Spread",
          },
          1: {
            text: "0.76%",
          },
        },
      },
      5: {
        cells: {
          0: {
            text: "Estimated Country Default Spread",
          },
          1: {
            text: "0%",
          },
        },
      },
      6: {
        cells: {
          0: {
            text: "Estimated Pre-tax Cost of Debt",
            style: 19,
          },
          1: {
            text: "2.28%",
          },
        },
      },
      7: {
        cells: {
          0: {
            text: "",
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
            text: "Large Companies (< $5,000m Market Cap)",
            merge: [0, 1],
            style: 16,
          },
          1: {
            style: 16,
          },
          2: {
            merge: [0, 1],
            text: "Smaller & Riskier Companies (< $5,000m Market Cap)",
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
            text: "Interest Coverage From",
            style: 18,
          },
          1: {
            text: "Interest Coverage To",
            style: 18,
          },
          2: {
            text: "Interest Coverage From",
            style: 18,
          },
          3: {
            text: "Interest Coverage To",
            style: 18,
          },
          4: {
            text: "Rating",
            style: 18,
          },
          5: {
            text: "Spread",
            style: 18,
          },
        },
      },
      11: {
        cells: {
          0: {
            text: "8.5",
          },
          1: {
            text: "100000",
          },
          2: {
            text: "12.5",
          },
          3: {
            text: "Infinity",
          },
          4: {
            text: "Aaa/AAA",
          },
          5: {
            text: "0.76%",
          },
        },
      },
      12: {
        cells: {
          0: {
            text: "6.5",
          },
          1: {
            text: "8.5",
          },
          2: {
            text: "9.5",
          },
          3: {
            text: "12.5",
          },
          4: {
            text: "Aa2/AA",
          },
          5: {
            text: "0.86%",
          },
        },
      },
      13: {
        cells: {
          0: {
            text: "5.5",
          },
          1: {
            text: "6.5",
          },
          2: {
            text: "7.5",
          },
          3: {
            text: "9.5",
          },
          4: {
            text: "A1/A+",
          },
          5: {
            text: "1.08%",
          },
        },
      },
      14: {
        cells: {
          0: {
            text: "4.25",
          },
          1: {
            text: "5.5",
          },
          2: {
            text: "6",
          },
          3: {
            text: "7.5",
          },
          4: {
            text: "A2/A",
          },
          5: {
            text: "1.19%",
          },
        },
      },
      15: {
        cells: {
          0: {
            text: "3",
          },
          1: {
            text: "4.25",
          },
          2: {
            text: "4.5",
          },
          3: {
            text: "6",
          },
          4: {
            text: "A3/A-",
          },
          5: {
            text: "1.34%",
          },
        },
      },
      16: {
        cells: {
          0: {
            text: "2.5",
          },
          1: {
            text: "3",
          },
          2: {
            text: "4",
          },
          3: {
            text: "4.5",
          },
          4: {
            text: "Baa2/BBB",
          },
          5: {
            text: "1.81%",
          },
        },
      },
      17: {
        cells: {
          0: {
            text: "2.25",
          },
          1: {
            text: "2.5",
          },
          2: {
            text: "3.5",
          },
          3: {
            text: "4",
          },
          4: {
            text: "Ba1/BB+",
          },
          5: {
            text: "2.32%",
          },
        },
      },
      18: {
        cells: {
          0: {
            text: "2",
          },
          1: {
            text: "2.25",
          },
          2: {
            text: "3",
          },
          3: {
            text: "3.5",
          },
          4: {
            text: "Ba2/BB",
          },
          5: {
            text: "2.95%",
          },
        },
      },
      19: {
        cells: {
          0: {
            text: "1.75",
          },
          1: {
            text: "2",
          },
          2: {
            text: "2.5",
          },
          3: {
            text: "3",
          },
          4: {
            text: "B1/B+",
          },
          5: {
            text: "4.31%",
          },
        },
      },
      20: {
        cells: {
          0: {
            text: "1.5",
          },
          1: {
            text: "1.75",
          },
          2: {
            text: "2",
          },
          3: {
            text: "2.5",
          },
          4: {
            text: "B2/B",
          },
          5: {
            text: "8.25%",
          },
        },
      },
      21: {
        cells: {
          0: {
            text: "1.25",
          },
          1: {
            text: "1.5",
          },
          2: {
            text: "1.5",
          },
          3: {
            text: "2",
          },
          4: {
            text: "B3/B-",
          },
          5: {
            text: "10.08%",
          },
        },
      },
      22: {
        cells: {
          0: {
            text: "0.8",
          },
          1: {
            text: "1.25",
          },
          2: {
            text: "1.25",
          },
          3: {
            text: "1.5",
          },
          4: {
            text: "Caa/CCC",
          },
          5: {
            text: "11.75%",
          },
        },
      },
      23: {
        cells: {
          0: {
            text: "0.65",
          },
          1: {
            text: "0.8",
          },
          2: {
            text: "0.8",
          },
          3: {
            text: "1.25",
          },
          4: {
            text: "Ca2/CC",
          },
          5: {
            text: "12.38%",
          },
        },
      },
      24: {
        cells: {
          0: {
            text: "0.2",
          },
          1: {
            text: "0.65",
          },
          2: {
            text: "0.5",
          },
          3: {
            text: "0.8",
          },
          4: {
            text: "C2/C",
          },
          5: {
            text: "16.25%",
          },
        },
      },
      25: {
        cells: {
          0: {
            text: "-100000",
          },
          1: {
            text: "0.2",
          },
          2: {
            text: "-Infinity",
          },
          3: {
            text: "0.5",
          },
          4: {
            text: "D2/D",
          },
          5: {
            text: "21.66%",
          },
        },
      },
      len: 100,
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
        width: 149,
      },
      len: 26,
    },
    validations: [],
    autofilter: {},
  };
};

export default getSyntheticCreditRatingData;
