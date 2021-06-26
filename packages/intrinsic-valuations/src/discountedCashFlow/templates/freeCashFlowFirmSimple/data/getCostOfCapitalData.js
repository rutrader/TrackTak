const getCostOfCapitalData = () => {
  return {
    calculationOrder: 1,
    name: "Cost of Capital",
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
        format: "currency",
      },
      {
        border: {
          bottom: ["thin", "#000"],
        },
        format: "currency",
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
        bgcolor: "rgba(120, 73, 191, 0.4)",
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
        },
      },
      2: {
        cells: {
          0: {
            text: "Number of Shares Outstanding",
          },
          1: {
            style: 4,
            text: '=FIN("sharesOutstanding") / 1000000',
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
            text: '=FIN("price")',
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
            text: '=FIN("unleveredBeta")',
            comment:
              "Is a measure of the market risk of the company relative to it's peers in the same industry without the impact of debt. This determines how much risk comes with owning a stock.",
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
            text: '=FIN("riskFreeRate")',
            comment:
              "Refers to the theoretical rate of return of an investment with zero risk.",
          },
        },
      },
      6: {
        cells: {
          0: {
            text: "Equity Risk Premium",
          },
          1: {
            text: '=FIN("equityRiskPremium")',
            style: 0,
          },
        },
      },
      7: {
        cells: {},
      },
      8: {
        cells: {
          0: {
            style: 7,
            text: "Normal Debt",
          },
        },
      },
      9: {
        cells: {
          0: {
            text: "Book Value",
          },
          1: {
            text: '=FIN("bookValueOfDebt") / 1000000',
            style: 3,
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
            text: '=FIN("interestExpense") / 1000000',
            style: 3,
          },
          2: {
            text: "Estimated Market Value of Normal Debt",
          },
          3: {
            text: "=B11*(1-(1+B14)^(-B12))/B14+B10/(1+B14)^B12",
            style: 3,
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
            text: "Estimated Value of Normal Debt in Convertible",
          },
          3: {
            text:
              "='Optional Inputs'!$D$3*(1-(1+B14)^(-'Optional Inputs'!$D$4))/B14+'Optional Inputs'!$D$2/(1+B14)^'Optional Inputs'!$D$4",
            style: 3,
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
            text: "='Optional Inputs'!$D$5-D12",
            style: 3,
          },
        },
      },
      13: {
        cells: {
          0: {
            text: `="Pre-tax Cost of Debt"&" ("&B13&")"`,
          },
          1: {
            text:
              "=IF('Optional Inputs'!$B$2=\"\", FIN(\"estimatedCostOfDebt\"), 'Optional Inputs'!$B$2)",
            style: 0,
            comment:
              "By default this is the synthetic credit rating pre-tax cost of debt that we have automatically calculated for you which is fine for most cases. If you manually input a cost of debt in the Normal Debt input field then it will overwrite this synthetic cost of debt.",
          },
          2: {
            text: "Levered Beta for Equity",
          },
          3: {
            text: "=B5*(1+(1-B15)*(E16/D16))",
            style: 4,
            comment:
              "Is a measure of market risk of the company relative to it's peers in the same industry including the impact of debt on the company. This determines how much risk comes with owning a stock.",
          },
        },
      },
      14: {
        cells: {
          0: {
            text: "Marginal Tax Rate",
          },
          1: {
            text: '=FIN("marginalTaxRate")',
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
            text: "=B3*B4+D13",
            style: 13,
          },
          4: {
            text: "=D11+D12+B18",
            style: 13,
          },
          5: {
            text: "='Optional Inputs'!$F$2*'Optional Inputs'!$F$3",
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
            text: "Operating Leases",
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
            text: "Operating Leases Value",
          },
          1: {
            style: 3,
            text: '=FIN("capitalLeaseObligations") / 1000000',
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
            text:
              "=IF(ISERROR('Optional Inputs'!$F$4/'Optional Inputs'!$F$3), 0, 'Optional Inputs'!$F$4/'Optional Inputs'!$F$3)",
            style: 15,
          },
          6: {
            style: 19,
            text: "=D17*D18+E17*E18+F17*F18",
            comment:
              "The total cost of raising capital (cash) for the company, weighted by equity and debt.",
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
        width: 280,
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
