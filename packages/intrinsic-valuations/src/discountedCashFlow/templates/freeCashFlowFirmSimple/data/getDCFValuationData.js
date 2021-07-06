import {
  getDatesFromStatement,
  getStatements,
} from "../../financialStatements";

const getDCFValuationData = ({ incomeStatements, balanceSheets }) => {
  const dates = getDatesFromStatement(incomeStatements);

  const incomeStatementOverview = getStatements(incomeStatements, [
    "revenue",
    "operatingIncome",
    "operatingMargin",
  ]);
  const balanceSheetOverview = getStatements(balanceSheets, [
    "bookValueOfEquity",
    "bookValueOfDebt",
    "investedCapital",
    "salesToCapitalRatio",
  ]);

  const overview = [dates, ...incomeStatementOverview, ...balanceSheetOverview];

  const data = {
    calculationOrder: 2,
    name: "DCF Valuation",
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
        format: "currency",
        color: "#43cea2",
      },
      {
        font: {
          bold: true,
        },
      },
      {
        font: {
          bold: true,
          size: 14,
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
          size: 18,
        },
        align: "center",
      },
      {
        font: {
          bold: false,
        },
      },
      {
        font: {
          bold: true,
          size: 18,
        },
        align: "left",
      },
      {
        strike: true,
      },
      {
        strike: false,
      },
      {
        strike: false,
        font: {
          name: "Source Sans Pro",
        },
      },
      {
        strike: false,
        font: {
          name: "Arial",
        },
      },
      {
        font: {
          bold: true,
          size: 12,
        },
      },
      {
        font: {
          bold: false,
          size: 12,
        },
      },
      {
        font: {
          bold: true,
          size: 12,
        },
        align: "center",
      },
      {
        textwrap: true,
      },
      {
        font: {
          bold: true,
        },
        format: "number",
      },
      {
        font: {
          bold: false,
          size: 10,
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
          bold: false,
        },
        format: "number",
      },
      {
        font: {
          bold: true,
          size: 10,
        },
      },
      {
        font: {
          size: 14,
        },
      },
      {
        font: {
          bold: true,
          size: 12,
        },
        align: "left",
      },
      {
        align: "center",
      },
      {
        align: "left",
      },
      {
        textwrap: false,
      },
      {
        font: {
          size: 12,
        },
      },
      {
        format: "million-currency",
      },
      {
        format: "normal",
      },
      {
        format: "normal",
        color: "#43cea2",
      },
      {
        color: "#fdc101",
      },
      {
        color: "#7f7f7f",
      },
      {
        color: "#ffc001",
      },
      {
        color: "#000100",
      },
      {
        color: "#000100",
        bgcolor: "#fff2cd",
      },
      {
        color: "#000100",
        bgcolor: "#ffe59a",
      },
      {
        format: "currency",
        color: "#00b04e",
      },
      {
        format: "million",
      },
      {
        color: "#000100",
        bgcolor: "#ffffff",
      },
    ],
    merges: ["A1:B1", "A6:B6", "A2:B2", "A3:B3", "D2:E2", "D8:E8", "D3:W6"],
    rows: {
      0: {
        cells: {
          0: {
            merge: [0, 1],
            style: 8,
          },
          1: {
            style: 8,
          },
          2: {
            style: 42,
          },
          3: {
            style: 42,
          },
          4: {
            style: 42,
          },
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      1: {
        cells: {
          0: {
            merge: [0, 1],
            style: 27,
          },
          1: {
            style: 27,
          },
          2: {},
          3: {
            merge: [0, 1],
            style: 16,
          },
          4: {
            style: 16,
          },
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      2: {
        cells: {
          0: {
            merge: [0, 1],
            style: 27,
          },
          1: {
            style: 27,
          },
          2: {},
          3: {
            merge: [3, 19],
            style: 19,
          },
          4: {
            style: 19,
          },
          5: {
            style: 19,
          },
          6: {
            style: 19,
          },
          7: {
            style: 19,
          },
          8: {
            style: 19,
          },
          9: {
            style: 19,
          },
          10: {
            style: 19,
          },
          11: {
            style: 19,
          },
          12: {
            style: 19,
          },
          13: {
            style: 19,
          },
          14: {
            style: 19,
          },
          15: {
            style: 19,
          },
          16: {
            style: 19,
          },
          17: {
            style: 19,
          },
          18: {
            style: 19,
          },
          19: {
            style: 19,
          },
          20: {
            style: 19,
          },
          21: {
            style: 19,
          },
          22: {
            style: 19,
          },
          23: {},
          24: {},
          25: {},
        },
      },
      3: {
        cells: {
          0: {
            style: 23,
          },
          1: {
            style: 41,
            comment:
              "Refers to a company's total stock currently held by public investors, including share blocks held by institutional investors and restricted shares owned by the company’s officers and insiders.",
          },
          2: {
            style: 29,
          },
          3: {
            style: 19,
          },
          4: {
            style: 19,
          },
          5: {
            style: 19,
          },
          6: {
            style: 19,
          },
          7: {
            style: 19,
          },
          8: {
            style: 19,
          },
          9: {
            style: 19,
          },
          10: {
            style: 19,
          },
          11: {
            style: 19,
          },
          12: {
            style: 19,
          },
          13: {
            style: 19,
          },
          14: {
            style: 19,
          },
          15: {
            style: 19,
          },
          16: {
            style: 19,
          },
          17: {
            style: 19,
          },
          18: {
            style: 19,
          },
          19: {
            style: 19,
          },
          20: {
            style: 19,
          },
          21: {
            style: 19,
          },
          22: {
            style: 19,
          },
          23: {},
          24: {},
          25: {},
        },
      },
      4: {
        cells: {
          0: {},
          1: {},
          2: {
            style: 29,
          },
          3: {
            style: 19,
          },
          4: {
            style: 19,
          },
          5: {
            style: 19,
          },
          6: {
            style: 19,
          },
          7: {
            style: 19,
          },
          8: {
            style: 19,
          },
          9: {
            style: 19,
          },
          10: {
            style: 19,
          },
          11: {
            style: 19,
          },
          12: {
            style: 19,
          },
          13: {
            style: 19,
          },
          14: {
            style: 19,
          },
          15: {
            style: 19,
          },
          16: {
            style: 19,
          },
          17: {
            style: 19,
          },
          18: {
            style: 19,
          },
          19: {
            style: 19,
          },
          20: {
            style: 19,
          },
          21: {
            style: 19,
          },
          22: {
            style: 19,
          },
          23: {},
          24: {},
          25: {},
        },
      },
      5: {
        cells: {
          0: {
            merge: [0, 1],
            style: 26,
          },
          1: {
            style: 26,
          },
          2: {
            style: 29,
          },
          3: {
            style: 19,
          },
          4: {
            style: 19,
          },
          5: {
            style: 19,
          },
          6: {
            style: 19,
          },
          7: {
            style: 19,
          },
          8: {
            style: 19,
          },
          9: {
            style: 19,
          },
          10: {
            style: 19,
          },
          11: {
            style: 19,
          },
          12: {
            style: 19,
          },
          13: {
            style: 19,
          },
          14: {
            style: 19,
          },
          15: {
            style: 19,
          },
          16: {
            style: 19,
          },
          17: {
            style: 19,
          },
          18: {
            style: 19,
          },
          19: {
            style: 19,
          },
          20: {
            style: 19,
          },
          21: {
            style: 19,
          },
          22: {
            style: 19,
          },
          23: {},
          24: {},
          25: {},
        },
      },
      6: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {
            style: 19,
          },
          4: {
            style: 19,
          },
          5: {
            style: 19,
          },
          6: {
            style: 19,
          },
          7: {
            style: 19,
          },
          8: {
            style: 19,
          },
          9: {
            style: 19,
          },
          10: {
            style: 19,
          },
          11: {
            style: 19,
          },
          12: {
            style: 19,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      7: {
        cells: {
          0: {},
          1: {
            style: 0,
          },
          2: {},
          3: {
            merge: [0, 1],
            style: 16,
          },
          4: {
            style: 16,
          },
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      8: {
        cells: {
          0: {},
          1: {
            style: 0,
          },
          2: {},
          3: {},
          4: {
            style: 6,
          },
          5: {
            style: 6,
          },
          6: {
            style: 6,
          },
          7: {
            style: 6,
          },
          8: {
            style: 6,
          },
          9: {
            style: 6,
          },
          10: {
            style: 6,
          },
          11: {
            style: 6,
          },
          12: {
            style: 6,
          },
          13: {
            style: 6,
          },
          14: {
            style: 6,
          },
          15: {
            style: 6,
          },
          16: {
            style: 6,
          },
          17: {
            style: 6,
          },
          18: {
            style: 6,
          },
          19: {
            style: 6,
          },
          20: {
            style: 6,
          },
          21: {
            style: 6,
          },
          22: {
            style: 6,
          },
          23: {
            style: 6,
          },
          24: {
            style: 6,
          },
          25: {
            style: 6,
          },
        },
      },
      9: {
        cells: {
          0: {},
          1: {
            style: 0,
          },
          2: {},
          3: {
            style: 6,
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {
            style: 31,
          },
          14: {
            style: 31,
          },
          15: {
            style: 31,
          },
          16: {
            style: 31,
          },
          17: {
            style: 31,
          },
          18: {
            style: 31,
          },
          19: {
            style: 31,
          },
          20: {
            style: 31,
          },
          21: {
            style: 31,
          },
          22: {
            style: 31,
          },
          23: {
            style: 31,
          },
          24: {
            style: 31,
          },
          25: {
            style: 31,
          },
        },
      },
      10: {
        cells: {
          0: {},
          1: {
            style: 4,
          },
          2: {},
          3: {
            style: 6,
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {
            style: 31,
          },
          14: {
            style: 31,
          },
          15: {
            style: 31,
          },
          16: {
            style: 31,
          },
          17: {
            style: 31,
          },
          18: {
            style: 31,
          },
          19: {
            style: 31,
          },
          20: {
            style: 31,
          },
          21: {
            style: 31,
          },
          22: {
            style: 31,
          },
          23: {
            style: 31,
          },
          24: {
            style: 31,
          },
          25: {
            style: 31,
          },
        },
      },
      11: {
        cells: {
          0: {},
          1: {
            style: 0,
          },
          2: {},
          3: {
            style: 6,
          },
          4: {
            style: 0,
          },
          5: {
            style: 0,
          },
          6: {
            style: 0,
          },
          7: {
            style: 0,
          },
          8: {
            style: 0,
          },
          9: {
            style: 0,
          },
          10: {
            style: 0,
          },
          11: {
            style: 0,
          },
          12: {
            style: 0,
          },
          13: {
            style: 0,
          },
          14: {
            style: 0,
          },
          15: {
            style: 0,
          },
          16: {
            style: 0,
          },
          17: {
            style: 0,
          },
          18: {
            style: 0,
          },
          19: {
            style: 0,
          },
          20: {
            style: 0,
          },
          21: {
            style: 0,
          },
          22: {
            style: 0,
          },
          23: {
            style: 0,
          },
          24: {
            style: 0,
          },
          25: {
            style: 0,
          },
        },
      },
      12: {
        cells: {
          0: {},
          1: {
            style: 4,
          },
          2: {},
          3: {
            style: 6,
            comment:
              "Also known as Total Stock Holder Equity. The amount of assets remaining after all of it's liabilities have been paid. This is because Assets = Liabilities + Equity.",
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {
            style: 31,
          },
          14: {
            style: 31,
          },
          15: {
            style: 31,
          },
          16: {
            style: 31,
          },
          17: {
            style: 31,
          },
          18: {
            style: 31,
          },
          19: {
            style: 31,
          },
          20: {
            style: 31,
          },
          21: {
            style: 31,
          },
          22: {
            style: 31,
          },
          23: {
            style: 31,
          },
          24: {
            style: 31,
          },
          25: {
            style: 31,
          },
        },
      },
      13: {
        cells: {
          0: {},
          1: {
            style: 4,
          },
          2: {},
          3: {
            style: 6,
            comment:
              "The total amount of debt the company owes which is recorded in the books of the company. We include capital lease obligations in this number as lease obligations are a form of debt.",
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {
            style: 31,
          },
          14: {
            style: 31,
          },
          15: {
            style: 31,
          },
          16: {
            style: 31,
          },
          17: {
            style: 31,
          },
          18: {
            style: 31,
          },
          19: {
            style: 31,
          },
          20: {
            style: 31,
          },
          21: {
            style: 31,
          },
          22: {
            style: 31,
          },
          23: {
            style: 31,
          },
          24: {
            style: 31,
          },
          25: {
            style: 31,
          },
        },
      },
      14: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {
            style: 6,
            comment:
              "The amount of capital that has been invested into the business. The formula is (Book Value of Equity + Book Value of Debt) - Cash & Short Term Investments. We minus the cash out because cash is not an investment as it returns nothing.",
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {
            style: 31,
          },
          14: {
            style: 31,
          },
          15: {
            style: 31,
          },
          16: {
            style: 31,
          },
          17: {
            style: 31,
          },
          18: {
            style: 31,
          },
          19: {
            style: 31,
          },
          20: {
            style: 31,
          },
          21: {
            style: 31,
          },
          22: {
            style: 31,
          },
          23: {
            style: 31,
          },
          24: {
            style: 31,
          },
          25: {
            style: 31,
          },
        },
      },
      15: {
        cells: {
          0: {},
          1: {},
          2: {},
          3: {
            style: 6,
          },
          4: {
            style: 4,
          },
          5: {
            style: 4,
          },
          6: {
            style: 4,
          },
          7: {
            style: 4,
          },
          8: {
            style: 4,
          },
          9: {
            style: 4,
          },
          10: {
            style: 4,
          },
          11: {
            style: 4,
          },
          12: {
            style: 4,
          },
          13: {
            style: 4,
          },
          14: {
            style: 4,
          },
          15: {
            style: 4,
          },
          16: {
            style: 4,
          },
          17: {
            style: 4,
          },
          18: {
            style: 4,
          },
          19: {
            style: 4,
          },
          20: {
            style: 4,
          },
          21: {
            style: 4,
          },
          22: {
            style: 4,
          },
          23: {
            style: 4,
          },
          24: {
            style: 4,
          },
          25: {
            style: 4,
          },
        },
      },
      16: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      17: {
        cells: {
          0: {
            style: 16,
          },
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      18: {
        cells: {
          0: {},
          1: {
            style: 6,
          },
          2: {
            style: 20,
          },
          3: {
            style: 20,
          },
          4: {
            style: 20,
          },
          5: {
            style: 20,
          },
          6: {
            style: 20,
          },
          7: {
            style: 20,
          },
          8: {
            style: 20,
          },
          9: {
            style: 20,
          },
          10: {
            style: 20,
          },
          11: {
            style: 20,
          },
          12: {
            style: 6,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      19: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 31,
          },
          3: {
            style: 31,
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      20: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 0,
          },
          2: {
            style: 0,
          },
          3: {
            style: 0,
          },
          4: {
            style: 0,
          },
          5: {
            style: 0,
          },
          6: {
            style: 0,
          },
          7: {
            style: 0,
          },
          8: {
            style: 0,
          },
          9: {
            style: 0,
          },
          10: {
            style: 0,
          },
          11: {
            style: 0,
          },
          12: {
            style: 0,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
        height: 25,
      },
      21: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 31,
          },
          3: {
            style: 31,
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      22: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 0,
          },
          2: {
            style: 0,
          },
          3: {
            style: 0,
          },
          4: {
            style: 0,
          },
          5: {
            style: 0,
          },
          6: {
            style: 0,
          },
          7: {
            style: 0,
          },
          8: {
            style: 0,
          },
          9: {
            style: 0,
          },
          10: {
            style: 0,
          },
          11: {
            style: 0,
          },
          12: {
            style: 0,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      23: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 31,
          },
          3: {
            style: 31,
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      24: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 31,
          },
          3: {
            style: 31,
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      25: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 31,
          },
          3: {
            style: 31,
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      26: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 31,
          },
          3: {
            style: 31,
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      27: {
        cells: {
          0: {
            style: 6,
          },
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      28: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 0,
          },
          2: {
            style: 0,
          },
          3: {
            style: 0,
          },
          4: {
            style: 0,
          },
          5: {
            style: 0,
          },
          6: {
            style: 0,
          },
          7: {
            style: 0,
          },
          8: {
            style: 0,
          },
          9: {
            style: 0,
          },
          10: {
            style: 0,
          },
          11: {
            style: 0,
          },
          12: {
            style: 0,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      29: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 4,
          },
          2: {
            style: 4,
          },
          3: {
            style: 4,
          },
          4: {
            style: 4,
          },
          5: {
            style: 4,
          },
          6: {
            style: 4,
          },
          7: {
            style: 4,
          },
          8: {
            style: 4,
          },
          9: {
            style: 4,
          },
          10: {
            style: 4,
          },
          11: {
            style: 4,
          },
          12: {
            style: 4,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
        height: 25,
      },
      30: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 31,
          },
          3: {
            style: 31,
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
          "-1": {},
        },
      },
      31: {
        cells: {
          0: {
            style: 6,
          },
          1: {},
          2: {
            style: 4,
          },
          3: {
            style: 4,
          },
          4: {
            style: 4,
          },
          5: {
            style: 4,
          },
          6: {
            style: 4,
          },
          7: {
            style: 4,
          },
          8: {
            style: 4,
          },
          9: {
            style: 4,
          },
          10: {
            style: 4,
          },
          11: {
            style: 4,
          },
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      32: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 4,
          },
          2: {
            style: 4,
          },
          3: {
            style: 4,
          },
          4: {
            style: 4,
          },
          5: {
            style: 4,
          },
          6: {
            style: 4,
          },
          7: {
            style: 4,
          },
          8: {
            style: 4,
          },
          9: {
            style: 4,
          },
          10: {
            style: 4,
          },
          11: {
            style: 4,
          },
          12: {
            style: 4,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      33: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 31,
          },
          3: {
            style: 31,
          },
          4: {
            style: 31,
          },
          5: {
            style: 31,
          },
          6: {
            style: 31,
          },
          7: {
            style: 31,
          },
          8: {
            style: 31,
          },
          9: {
            style: 31,
          },
          10: {
            style: 31,
          },
          11: {
            style: 31,
          },
          12: {
            style: 31,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      34: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 0,
          },
          2: {
            style: 0,
          },
          3: {
            style: 0,
          },
          4: {
            style: 0,
          },
          5: {
            style: 0,
          },
          6: {
            style: 0,
          },
          7: {
            style: 0,
          },
          8: {
            style: 0,
          },
          9: {
            style: 0,
          },
          10: {
            style: 0,
          },
          11: {
            style: 0,
          },
          12: {
            style: 0,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      35: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 0,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      36: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      37: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 0,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      38: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
          17: {},
          18: {},
          19: {},
          20: {},
          21: {},
          22: {},
          23: {},
          24: {},
          25: {},
        },
      },
      39: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      40: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      41: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      42: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 0,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      43: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      44: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      45: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      46: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      47: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      48: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      49: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      50: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      51: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 31,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      52: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 3,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      53: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 40,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      54: {
        cells: {
          0: {
            style: 6,
          },
          1: {
            style: 0,
          },
          2: {
            style: 32,
          },
          3: {
            style: 32,
          },
          4: {
            style: 32,
          },
          5: {
            style: 32,
          },
          6: {
            style: 32,
          },
          7: {
            style: 32,
          },
          8: {
            style: 32,
          },
          9: {
            style: 32,
          },
          10: {
            style: 32,
          },
          11: {
            style: 32,
          },
          12: {
            style: 32,
          },
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      55: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      56: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      57: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      58: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      59: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      60: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      61: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      62: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          "-1": {},
        },
      },
      63: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      64: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      65: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          "-1": {},
        },
      },
      66: {
        cells: {
          0: {},
          1: {
            style: 33,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          "-1": {},
        },
      },
      67: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          "-1": {},
        },
      },
      68: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
          "-1": {},
        },
      },
      69: {
        cells: {
          0: {},
          1: {
            style: 32,
          },
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      70: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      71: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      72: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      73: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      74: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      75: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      76: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      77: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      78: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
          16: {},
        },
      },
      79: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      80: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      81: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      82: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      83: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      84: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      85: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      86: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      87: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      88: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      89: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      90: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      91: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      92: {
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
          10: {},
          11: {},
          12: {},
          13: {},
          14: {},
          15: {},
        },
      },
      93: {
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
      94: {
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
      "-1": {
        cells: {
          4: {},
          6: {},
          8: {},
        },
      },
    },
    cols: {
      0: {
        width: 196,
      },
      1: {
        width: 130,
      },
      2: {
        width: 108,
      },
      3: {
        width: 150,
      },
    },
    validations: [],
    autofilter: {},
    serializedValues: [
      ['=FIN("name")'],
      ['=FIN("code")&"."&FIN("exchange")', null, null, "Business Description"],
      [
        '=FIN("price")&" "&FIN("currencyCode")',
        null,
        null,
        '=FIN("description")',
      ],
      ["Shares Outstanding", '=FIN("sharesOutstanding")'],
      [],
      ["Industry Averages Overview"],
      ["Category", '=FIN("industryName")'],
      [
        "CAGR Past Five Years",
        '=FIN("annualAverageCAGRLastFiveYears")',
        null,
        "Financials Overview",
      ],
      [
        "Pre-tax Operating Margin (TTM)",
        '=FIN("preTaxOperatingMarginUnadjusted")',
      ],
      ["ROIC (TTM)", '=FIN("afterTaxROIC")'],
      ["Sales to Capital Ratio", '=FIN("sales/Capital")'],
      ["WACC", '=FIN("costOfCapital")'],
      ["Unlevered Beta", '=FIN("unleveredBeta")'],
      ["Levered Beta", '=FIN("equityLeveredBeta")'],
      [],
      [],
      [],
      ["DCF Valuaton"],
      ["", "Base Year", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Terminal Year"],
      [
        "Revenues",
        '=FIN("revenue")',
        "=B20*(1+'Required Inputs'!$B$1)",
        "=C20*(1+'Required Inputs'!$B$1)",
        "=D20*(1+'Required Inputs'!$B$1)",
        "=E20*(1+'Required Inputs'!$B$1)",
        "=F20*(1+'Required Inputs'!$B$1)",
        "=G20*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5))",
        "=H20*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 2)",
        "=I20*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 3)",
        "=J20*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 4)",
        "=K20*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 5)",
        '=L20*(1+FIN("riskFreeRate"))',
      ],
      [
        "Operating Margin",
        "=B22/B20",
        "=IF(C19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - C19))",
        "=IF(D19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - D19))",
        "=IF(E19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - E19))",
        "=IF(F19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - F19))",
        "=IF(G19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - G19))",
        "=IF(H19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - H19))",
        "=IF(I19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - I19))",
        "=IF(J19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - J19))",
        "=IF(K19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - K19))",
        "=IF(L19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - L19))",
        "=L21",
      ],
      [
        "Operating Income",
        '=IFERROR(FIN("operatingIncome"), 0)',
        "=C21*C20",
        "=D21*D20",
        "=E21*E20",
        "=F21*F20",
        "=G21*G20",
        "=H21*H20",
        "=I21*I20",
        "=J21*J20",
        "=K21*K20",
        "=L21*L20",
        "=M21*M20",
      ],
      [
        "Tax Rate",
        '=FIN("pastThreeYearsAverageEffectiveTaxRate")',
        "=B23",
        "=C23",
        "=D23",
        "=E23",
        "=F23",
        "=G23+(M23-G23)/5",
        "=H23+(M23-G23)/5",
        "=I23+(M23-G23)/5",
        "=J23+(M23-G23)/5",
        "=K23+(M23-G23)/5",
        '=FIN("marginalTaxRate")',
      ],
      [
        "NOPAT",
        "=IF(B22 > 0, B22 * (1-B23), B22)",
        "=IF(C22 > 0, IF(C22 < B27, C22, C22 - (C22 - B27) * C23), C22)",
        "=IF(D22 > 0, IF(D22 < C27, D22, D22 - (D22 - C27) * D23), D22)",
        "=IF(E22 > 0, IF(E22 < D27, E22, E22 - (E22 - D27) * E23), E22)",
        "=IF(F22 > 0, IF(F22 < E27, F22, F22 - (F22 - E27) * F23), F22)",
        "=IF(G22 > 0, IF(G22 < F27, G22, G22 - (G22 - F27) * G23), G22)",
        "=IF(H22 > 0, IF(H22 < G27, H22, H22 - (H22 - G27) * H23), H22)",
        "=IF(I22 > 0, IF(I22 < H27, I22, I22 - (I22 - H27) * I23), I22)",
        "=IF(J22 > 0, IF(J22 < I27, J22, J22 - (J22 - I27) * J23), J22)",
        "=IF(K22 > 0, IF(K22 < J27, K22, K22 - (K22 - J27) * K23), K22)",
        "=IF(L22 > 0, IF(L22 < K27, L22, L22 - (L22 - K27) * L23), L22)",
        "=M22*(1-M23)",
      ],
      [
        "- Reinvestment",
        "",
        "=IF(C20 > B20, (C20-B20) / C33, 0)",
        "=(D20-C20)/D33",
        "=(E20-D20)/E33",
        "=(F20-E20)/F33",
        "=(G20-F20)/G33",
        "=(H20-G20)/H33",
        "=(I20-H20)/I33",
        "=(J20-I20)/J33",
        "=(K20-J20)/K33",
        "=(L20-K20)/L33",
        '=IF(FIN("riskFreeRate") > 0, (FIN("riskFreeRate") / M35) * M24, 0)',
      ],
      [
        "FCFF",
        "",
        "=C24 - C25",
        "=D24 - D25",
        "=E24 - E25",
        "=F24 - F25",
        "=G24 - G25",
        "=H24 - H25",
        "=I24 - I25",
        "=J24 - J25",
        "=K24 - K25",
        "=L24 - L25",
        "=M24 - M25",
      ],
      [
        "NOL",
        "='Optional Inputs'!J2",
        "=IF(C22 < 0, B27 - C22, IF(B27 > C22, B27 - C22, 0))",
        "=IF(D22 < 0, C27 - D22, IF(C27 > D22, C27 - D22, 0))",
        "=IF(E22 < 0, D27 - E22, IF(D27 > E22, D27 - E22, 0))",
        "=IF(F22 < 0, E27 - F22, IF(E27 > F22, E27 - F22, 0))",
        "=IF(G22 < 0, F27 - G22, IF(F27 > G22, F27 - G22, 0))",
        "=IF(H22 < 0, G27 - H22, IF(G27 > H22, G27 - H22, 0))",
        "=IF(I22 < 0, H27 - I22, IF(H27 > I22, H27 - I22, 0))",
        "=IF(J22 < 0, I27 - J22, IF(I27 > J22, I27 - J22, 0))",
        "=IF(K22 < 0, J27 - K22, IF(J27 > K22, J27 - K22, 0))",
        "=IF(L22 < 0, K27 - L22, IF(K27 > L22, K27 - L22, 0))",
        "=IF(M22 < 0, L27 - M22, IF(L27 > M22, L27 - M22, 0))",
      ],
      ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      [
        "Cost of Capital",
        "",
        "='Cost of Capital'!$G$18",
        "=C29",
        "=D29",
        "=E29",
        "=F29",
        "=G29-(G29-M29)/5",
        "=H29-(G29-M29)/5",
        "=I29-(G29-M29)/5",
        "=J29-(G29-M29)/5",
        "=K29-(G29-M29)/5",
        '=FIN("matureMarketEquityRiskPremium") + FIN("riskFreeRate")',
      ],
      [
        "Cumulated Discount Factor",
        "",
        "=1/(1+C29)",
        "=C30*(1/(1+D29))",
        "=D30*(1/(1+E29))",
        "=E30*(1/(1+F29))",
        "=F30*(1/(1+G29))",
        "=G30*(1/(1+H29))",
        "=H30*(1/(1+I29))",
        "=I30*(1/(1+J29))",
        "=J30*(1/(1+K29))",
        "=K30*(1/(1+L29))",
        "",
      ],
      [
        "PV (FCFF)",
        "",
        "=C26*C30",
        "=D26*D30",
        "=E26*E30",
        "=F26*F30",
        "=G26*G30",
        "=H26*H30",
        "=I26*I30",
        "=J26*J30",
        "=K26*K30",
        "=L26*L30",
        "",
      ],
      ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      [
        "Sales to Capital Ratio",
        "",
        "='Required Inputs'!$B$4",
        "=C33",
        "=D33",
        "=E33",
        "=F33",
        "=G33",
        "=H33",
        "=I33",
        "=J33",
        "=K33",
        "",
      ],
      [
        "Invested Capital",
        '=IFERROR(FIN("investedCapital"), 0)',
        "=B34+C25",
        "=C34+D25",
        "=D34+E25",
        "=E34+F25",
        "=F34+G25",
        "=G34+H25",
        "=H34+I25",
        "=I34+J25",
        "=J34+K25",
        "=K34+L25",
        "",
      ],
      [
        "ROIC",
        "=B24/B34",
        "=C24/C34",
        "=D24/D34",
        "=E24/E34",
        "=F24/F34",
        "=G24/G34",
        "=H24/H34",
        "=I24/I34",
        "=J24/J34",
        "=K24/K34",
        "=L24/L34",
        "=L29",
      ],
      ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      [
        "Terminal Cash Flow",
        "=M26",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Terminal Cost of Capital",
        "=M29",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Terminal Value",
        '=B37/(B38-FIN("riskFreeRate"))',
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "PV (Terminal Value)",
        "=B39*L30",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "PV (CF Over Next 10 Years",
        "=SUM(C31, D31, E31, F31, G31, H31, I31, J31, K31, L31)",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      ["Sum of PV", "=B40+B41", "", "", "", "", "", "", "", "", "", "", ""],
      [
        "Probability of Failure",
        "='Optional Inputs'!J4",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Proceeds if the Firm Fails",
        '=((FIN("bookValueOfEquity"))+(FIN("bookValueOfDebt")))*\'Optional Inputs\'!J5',
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Operating Assets",
        "=B42*(1-B43)+B44*B43",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "- Debt",
        '=IFERROR(FIN("bookValueOfDebt"), 0)',
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "- Minority Interests",
        '=IFERROR(FIN("minorityInterest") , 0)',
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "+ Cash",
        '=IFERROR(FIN("cashAndShortTermInvestments"), 0)',
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "+ Non-Operating Assets",
        "='Optional Inputs'!J3",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Equity",
        "=B45-B46-B47+B48+B49",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "- Options",
        "='Employee Options'!$B$17",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Common Stock Equity",
        "=B50-B51",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Current Price",
        '=FIN("price")',
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Estimated Value Per Share",
        '=IF(B52/FIN("sharesOutstanding") < 0, 0, B52/(FIN("sharesOutstanding")))',
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      ["Margin of Safety", "=IFERROR((B54-B53)/B54, 0)"],
    ],
  };

  data.serializedValues[8] = [
    ...data.serializedValues[8],
    null,
    ...overview[0],
  ];
  data.serializedValues[9] = [
    ...data.serializedValues[9],
    null,
    ...overview[1],
  ];
  data.serializedValues[10] = [
    ...data.serializedValues[10],
    null,
    ...overview[2],
  ];
  data.serializedValues[11] = [
    ...data.serializedValues[11],
    null,
    ...overview[3],
  ];
  data.serializedValues[12] = [
    ...data.serializedValues[12],
    null,
    ...overview[4],
  ];
  data.serializedValues[13] = [
    ...data.serializedValues[13],
    null,
    ...overview[5],
  ];
  data.serializedValues[14] = [
    ...data.serializedValues[14],
    null,
    null,
    null,
    ...overview[6],
  ];
  data.serializedValues[15] = [
    ...data.serializedValues[15],
    null,
    null,
    null,
    ...overview[7],
  ];

  return data;
};

export default getDCFValuationData;
