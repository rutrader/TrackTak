/* eslint-disable no-sparse-arrays */
const getCostOfCapitalData = () => {
  return {
    calculationOrder: 1,
    name: "Cost of Capital",
    freeze: "A1",
    serializedValues: [
      ["Estimated Cost of Capital"],
      ["Equity"],
      ["Number of Shares Outstanding", '=FIN("sharesOutstanding") / 1000000'],
      ["Market Price per Share", '=FIN("price")'],
      ["Unlevered Beta", '=FIN("unleveredBeta")'],
      ["Riskfree Rate", '=FIN("riskFreeRate")'],
      ["Equity Risk Premium", '=FIN("equityRiskPremium")'],
      [],
      ["Normal Debt"],
      ["Book Value", '=FIN("bookValueOfDebt") / 1000000', "Output"],
      [
        "Interest Expense",
        '=FIN("interestExpense") / 1000000',
        "Estimated Market Value of Normal Debt",
        "=B11*(1-(1+B14)^(-B12))/B14+B10/(1+B14)^B12",
      ],
      [
        "Average Maturity",
        "='Optional Inputs'!$B$3",
        "Estimated Value of Normal Debt in Convertible",
        "='Optional Inputs'!$D$3*(1-(1+B14)^(-'Optional Inputs'!$D$4))/B14+'Optional Inputs'!$D$2/(1+B14)^'Optional Inputs'!$D$4",
      ],
      [
        "Method of Calculating Pre-tax Cost of Debt",
        '=IF(\'Optional Inputs\'!$B$2="", "Synthetic Credit Rating", "Manual Input")',
        "Estimated Value of Equity in Convertible",
        "='Optional Inputs'!$D$5-D12",
      ],
      [
        '="Pre-tax Cost of Debt"&" ("&B13&")"',
        "=IF('Optional Inputs'!$B$2=\"\", FIN(\"estimatedCostOfDebt\"), 'Optional Inputs'!$B$2)",
        "Levered Beta for Equity",
        "=B5*(1+(1-B15)*(E16/D16))",
      ],
      [
        "Marginal Tax Rate",
        '=FIN("marginalTaxRate")',
        null,
        "Equity",
        "Debt",
        "Preferred Stock",
        "Capital",
      ],
      [
        null,
        null,
        "Market Value",
        "=B3*B4+D13",
        "=D11+D12+B18",
        "='Optional Inputs'!$F$2*'Optional Inputs'!$F$3",
        "=SUM(D16:F16)",
      ],
      [
        "Operating Leases",
        null,
        "Weight in Cost of Capital",
        "=D16/G16",
        "=E16/G16",
        "=F16/G16",
        "=SUM(D17:F17)",
      ],
      [
        "Operating Leases Value",
        '=FIN("capitalLeaseObligations") / 1000000',
        "Cost of Component",
        "=B6+D14*B7",
        "=B14*(1-B15)",
        "=IF(ISERROR('Optional Inputs'!$F$4/'Optional Inputs'!$F$3), 0, 'Optional Inputs'!$F$4/'Optional Inputs'!$F$3)",
        "=D17*D18+E17*E18+F17*F18",
      ],
      [""],
    ],
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
    rows: [
      {
        cells: [
          {
            merge: [0, 1],
            style: 5,
          },
        ],
      },
      {
        cells: [
          {
            style: 7,
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 4,
          },
        ],
      },
      {
        cells: [
          {
            style: 3,
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 4,
            comment:
              "Is a measure of the market risk of the company relative to it's peers in the same industry without the impact of debt. This determines how much risk comes with owning a stock.",
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 0,
            comment:
              "Refers to the theoretical rate of return of an investment with zero risk.",
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 0,
          },
        ],
      },
      ,
      {
        cells: [
          {
            style: 7,
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 3,
          },
          {
            style: 7,
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 3,
          },

          ,
          {
            style: 3,
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 4,
          },
          ,
          {
            style: 3,
          },
        ],
      },
      {
        cells: [
          ,
          ,
          ,
          {
            style: 3,
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 0,
            comment:
              "By default this is the synthetic credit rating pre-tax cost of debt that we have automatically calculated for you which is fine for most cases. If you manually input a cost of debt in the Normal Debt input field then it will overwrite this synthetic cost of debt.",
          },
          ,
          {
            style: 4,
            comment:
              "Is a measure of market risk of the company relative to it's peers in the same industry including the impact of debt on the company. This determines how much risk comes with owning a stock.",
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 0,
          },
          {
            style: 13,
          },
          {
            style: 16,
          },
          {
            style: 16,
          },
          {
            style: 16,
          },
          {
            style: 18,
          },
        ],
      },
      {
        cells: [
          ,
          ,
          {
            style: 16,
          },
          {
            style: 13,
          },
          {
            style: 13,
          },
          {
            style: 13,
          },
          {
            style: 14,
          },
        ],
      },
      {
        cells: [
          {
            style: 7,
          },
          ,
          {
            style: 16,
          },
          {
            style: 20,
          },
          {
            style: 20,
          },
          {
            style: 20,
          },
          {
            style: 21,
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 3,
          },
          {
            style: 17,
          },
          {
            style: 15,
          },
          {
            style: 15,
          },
          {
            style: 15,
          },
          {
            style: 19,
            comment:
              "The total cost of raising capital (cash) for the company, weighted by equity and debt.",
          },
        ],
      },
    ],
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
    },
  };
};

export default getCostOfCapitalData;
