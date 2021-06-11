const getCostOfCapitalData = () => {
  return {
    calculationOrder: 2,
    name: "Cost of Capital",
    freeze: "A1",
    styles: [
      {
        format: "percent",
      },
      {
        format: "million",
      },
      {
        format: "million-currency",
      },
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
        font: {
          bold: true,
        },
      },
      {
        font: {
          bold: true,
        },
        underline: true,
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
        underline: true,
      },
      {
        font: {
          bold: false,
        },
        underline: false,
      },
      {
        font: {
          bold: true,
        },
        underline: false,
      },
      {
        underline: true,
      },
      {
        border: {
          right: ["thin", "#000"],
          bottom: ["thin", "#000"],
        },
        format: "million-currency",
      },
      {
        border: {
          bottom: ["thin", "#000"],
        },
        format: "million-currency",
      },
      {
        border: {
          right: ["thin", "#000"],
        },
        format: "percent",
      },
      {
        border: {
          right: ["thin", "#000"],
          bottom: ["thin", "#000"],
        },
        font: {
          bold: true,
        },
      },
      {
        border: {
          right: ["thin", "#000"],
        },
        font: {
          bold: true,
        },
      },
      {
        border: {
          bottom: ["thin", "#000"],
        },
        font: {
          bold: true,
        },
      },
      {
        bgcolor: "#a7d08c",
        format: "percent",
      },
      {
        border: {
          right: ["thin", "#000"],
          bottom: ["thin", "#000"],
        },
        format: "percent",
      },
      {
        border: {
          bottom: ["thin", "#000"],
        },
        format: "percent",
      },
    ],
    merges: ["A1:B1"],
    rows: {
      0: {
        cells: {
          0: {
            text: "Estimated Cost of Capital",
            merge: [0, 1],
            style: 5,
          },
        },
      },
      1: {
        cells: {
          0: {
            text: "Equity",
            style: 7,
          },
          2: {
            style: 7,
            text: "Operating Leases",
          },
        },
      },
      2: {
        cells: {
          0: {
            text: "Number of Shares Outstanding",
          },
          1: {
            style: 1,
            text: "=sharesOutstanding",
          },
          2: {
            text: "Operating Leases Value",
          },
          3: {
            style: 2,
            text: "=capitalLeaseObligations",
          },
        },
      },
      3: {
        cells: {
          0: {
            text: "Market Price per Share",
          },
          1: {
            style: 3,
            text: "=price",
          },
        },
      },
      4: {
        cells: {
          0: {
            text: "Unlevered Beta",
          },
          1: {
            style: 4,
            text: "=unleveredBeta",
          },
          2: {
            text: "Preferred Stock",
            style: 7,
          },
        },
      },
      5: {
        cells: {
          0: {
            text: "Riskfree Rate",
          },
          1: {
            style: 0,
            text: "=riskFreeRate",
          },
          2: {
            text: "Number of Preferred Shares Outstanding",
          },
          3: {
            style: 1,
            text: "='Optional Inputs'!$F$2",
          },
        },
      },
      6: {
        cells: {
          0: {
            text: "Equity Risk Premium",
          },
          1: {
            text: "=equityRiskPremium",
            style: 0,
          },
          2: {
            text: "Market Price per Preferred Share",
          },
          3: {
            text: "='Optional Inputs'!$F$3",
            style: 3,
          },
        },
      },
      7: {
        cells: {
          2: {
            text: "Annual Dividend per Preferred Share",
          },
          3: {
            text: "='Optional Inputs'!$F$4",
            style: 3,
          },
        },
      },
      8: {
        cells: {
          0: {
            style: 7,
            text: "Straight Debt",
          },
        },
      },
      9: {
        cells: {
          0: {
            text: "Book Value",
          },
          1: {
            text: "=bookValueOfDebt",
            style: 2,
          },
          2: {
            text: "Output",
            style: 7,
          },
        },
      },
      10: {
        cells: {
          0: {
            text: "Interest Expense",
          },
          1: {
            text: "=interestExpense",
            style: 2,
          },
          2: {
            text: "Estimated Market Value of Straight Debt",
          },
          3: {
            text: "=B11*(1-(1+B14)^(-B12))/B14+B10/(1+B14)^B12",
            style: 2,
          },
        },
      },
      11: {
        cells: {
          0: {
            text: "Average Maturity",
          },
          1: {
            text: "='Optional Inputs'!$B$3",
            style: 4,
          },
          2: {
            text: "Estimated Value of Straight Debt in Convertible",
          },
          3: {
            text: "=B19*(1-(1+B14)^(-B20))/B14+B18/(1+B14)^B20",
            style: 2,
          },
        },
      },
      12: {
        cells: {
          0: {
            text: "Method of Calculating Pre-tax Cost of Debt",
          },
          1: {
            text: `=IF('Optional Inputs'!$B$2="", "Synthetic Credit Rating", "Manual Input")`,
          },
          2: {
            text: "Estimated Value of Equity in Convertible",
          },
          3: {
            text: "=B21-D12",
            style: 2,
          },
        },
      },
      13: {
        cells: {
          0: {
            text: "Pre-tax Cost of Debt",
          },
          1: {
            text: `=IF('Optional Inputs'!$B$2="", estimatedCostOfDebt, 'Optional Inputs'!$B$2)`,
            style: 0,
          },
          2: {
            text: "Levered Beta for Equity",
          },
          3: {
            text: "=B5*(1+(1-B15)*(E16/D16))",
            style: 4,
          },
        },
      },
      14: {
        cells: {
          0: {
            text: "Marginal Tax Rate",
          },
          1: {
            text: "=marginalTaxRate",
            style: 0,
          },
          2: {
            style: 13,
          },
          3: {
            text: "Equity",
            style: 16,
          },
          4: {
            text: "Debt",
            style: 16,
          },
          5: {
            text: "Preferred Stock",
            style: 16,
          },
          6: {
            text: "Capital",
            style: 18,
          },
        },
      },
      15: {
        cells: {
          2: {
            text: "Market Value",
            style: 16,
          },
          3: {
            text: "=B3*B4",
            style: 13,
          },
          4: {
            text: "=D11+D12+D3",
            style: 13,
          },
          5: {
            text: "=D6*D7",
            style: 13,
          },
          6: {
            text: "=SUM(D16:F16)",
            style: 14,
          },
        },
      },
      16: {
        cells: {
          0: {
            style: 7,
            text: "Convertible Debt",
          },
          2: {
            text: "Weight in Cost of Capital",
            style: 16,
          },
          3: {
            text: "=D16/G16",
            style: 20,
          },
          4: {
            text: "=E16/G16",
            style: 20,
          },
          5: {
            text: "=F16/G16",
            style: 20,
          },
          6: {
            text: "=SUM(D17:F17)",
            style: 21,
          },
        },
      },
      17: {
        cells: {
          0: {
            text: "Book Value of Convertible Debt",
          },
          1: {
            text: "='Optional Inputs'!$D$2",
            style: 2,
          },
          2: {
            text: "Cost of Component",
            style: 17,
          },
          3: {
            text: "=B6+D14*B7",
            style: 15,
          },
          4: {
            text: "=B14*(1-B15)",
            style: 15,
          },
          5: {
            text: "=IF(ISERROR(D8/D7), 0, D8/D7)",
            style: 15,
          },
          6: {
            style: 19,
            text: "=D17*D18+E17*E18+F17*F18",
          },
        },
      },
      18: {
        cells: {
          0: {
            text: "Interest Expense on Convertible Debt",
          },
          1: {
            text: "='Optional Inputs'!$D$3",
            style: 2,
          },
        },
      },
      19: {
        cells: {
          0: {
            text: "Average Maturity of Convertible Debt",
          },
          1: {
            text: "='Optional Inputs'!$D$4",
            style: 4,
          },
        },
      },
      20: {
        cells: {
          0: {
            text: "Market Value of Convertible Bond",
          },
          1: {
            text: "='Optional Inputs'!$D$5",
            style: 2,
          },
        },
      },
      25: {
        cells: {
          0: {
            style: 7,
            text: "",
          },
        },
      },
      len: 102,
    },
    cols: {
      0: {
        width: 259,
      },
      1: {
        width: 150,
      },
      2: {
        width: 281,
      },
      len: 26,
    },
    validations: [],
    autofilter: {},
  };
};

export default getCostOfCapitalData;
