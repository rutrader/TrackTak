/* eslint-disable no-sparse-arrays */
const getDCFValuationData = (isOnMobile) => {
  let desktopData;

  if (!isOnMobile) {
    desktopData = {
      freeze: "B38",
    };
  }

  return {
    ...desktopData,
    active: true,
    calculationOrder: 2,
    name: "DCF Valuation",
    serializedValues: [
      ["", "Base Year", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Terminal Year"],
      [
        "Revenues",
        '=FIN("revenue") / 1000000',
        "=B2*(1+'Required Inputs'!$B$1)",
        "=C2*(1+'Required Inputs'!$B$1)",
        "=D2*(1+'Required Inputs'!$B$1)",
        "=E2*(1+'Required Inputs'!$B$1)",
        "=F2*(1+'Required Inputs'!$B$1)",
        "=G2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5))",
        "=H2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 2)",
        "=I2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 3)",
        "=J2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 4)",
        "=K2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 5)",
        '=L2*(1+FIN("riskFreeRate"))',
      ],
      [
        "Operating Margin",
        "=B4/B2",
        "=IF(C1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - C1))",
        "=IF(D1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - D1))",
        "=IF(E1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - E1))",
        "=IF(F1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - F1))",
        "=IF(G1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - G1))",
        "=IF(H1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - H1))",
        "=IF(I1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - I1))",
        "=IF(J1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - J1))",
        "=IF(K1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - K1))",
        "=IF(L1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - L1))",
        "=L3",
      ],
      [
        "Operating Income",
        '=IFERROR(FIN("operatingIncome") / 1000000, 0)',
        "=C3*C2",
        "=D3*D2",
        "=E3*E2",
        "=F3*F2",
        "=G3*G2",
        "=H3*H2",
        "=I3*I2",
        "=J3*J2",
        "=K3*K2",
        "=L3*L2",
        "=M3*M2",
      ],
      [
        "Tax Rate",
        '=FIN("pastThreeYearsAverageEffectiveTaxRate")',
        "=B5",
        "=C5",
        "=D5",
        "=E5",
        "=F5",
        "=G5+(M5-G5)/5",
        "=H5+(M5-G5)/5",
        "=I5+(M5-G5)/5",
        "=J5+(M5-G5)/5",
        "=K5+(M5-G5)/5",
        '=FIN("marginalTaxRate")',
      ],
      [
        "NOPAT",
        "=IF(B4 > 0, B4 * (1-B5), B4)",
        "=IF(C4 > 0, IF(C4 < B9, C4, C4 - (C4 - B9) * C5), C4)",
        "=IF(D4 > 0, IF(D4 < C9, D4, D4 - (D4 - C9) * D5), D4)",
        "=IF(E4 > 0, IF(E4 < D9, E4, E4 - (E4 - D9) * E5), E4)",
        "=IF(F4 > 0, IF(F4 < E9, F4, F4 - (F4 - E9) * F5), F4)",
        "=IF(G4 > 0, IF(G4 < F9, G4, G4 - (G4 - F9) * G5), G4)",
        "=IF(H4 > 0, IF(H4 < G9, H4, H4 - (H4 - G9) * H5), H4)",
        "=IF(I4 > 0, IF(I4 < H9, I4, I4 - (I4 - H9) * I5), I4)",
        "=IF(J4 > 0, IF(J4 < I9, J4, J4 - (J4 - I9) * J5), J4)",
        "=IF(K4 > 0, IF(K4 < J9, K4, K4 - (K4 - J9) * K5), K4)",
        "=IF(L4 > 0, IF(L4 < K9, L4, L4 - (L4 - K9) * L5), L4)",
        "=M4*(1-M5)",
      ],
      [
        "- Reinvestment",
        "",
        "=IF(C2 > B2, (C2-B2) / C15, 0)",
        "=(D2-C2)/D15",
        "=(E2-D2)/E15",
        "=(F2-E2)/F15",
        "=(G2-F2)/G15",
        "=(H2-G2)/H15",
        "=(I2-H2)/I15",
        "=(J2-I2)/J15",
        "=(K2-J2)/K15",
        "=(L2-K2)/L15",
        '=IF(FIN("riskFreeRate") > 0, (FIN("riskFreeRate") / M17) * M6, 0)',
      ],
      [
        "FCFF",
        "",
        "=C6 - C7",
        "=D6 - D7",
        "=E6 - E7",
        "=F6 - F7",
        "=G6 - G7",
        "=H6 - H7",
        "=I6 - I7",
        "=J6 - J7",
        "=K6 - K7",
        "=L6 - L7",
        "=M6 - M7",
      ],
      [
        "NOL",
        "='Optional Inputs'!J2",
        "=IF(C4 < 0, B9 - C4, IF(B9 > C4, B9 - C4, 0))",
        "=IF(D4 < 0, C9 - D4, IF(C9 > D4, C9 - D4, 0))",
        "=IF(E4 < 0, D9 - E4, IF(D9 > E4, D9 - E4, 0))",
        "=IF(F4 < 0, E9 - F4, IF(E9 > F4, E9 - F4, 0))",
        "=IF(G4 < 0, F9 - G4, IF(F9 > G4, F9 - G4, 0))",
        "=IF(H4 < 0, G9 - H4, IF(G9 > H4, G9 - H4, 0))",
        "=IF(I4 < 0, H9 - I4, IF(H9 > I4, H9 - I4, 0))",
        "=IF(J4 < 0, I9 - J4, IF(I9 > J4, I9 - J4, 0))",
        "=IF(K4 < 0, J9 - K4, IF(J9 > K4, J9 - K4, 0))",
        "=IF(L4 < 0, K9 - L4, IF(K9 > L4, K9 - L4, 0))",
        "=IF(M4 < 0, L9 - M4, IF(L9 > M4, L9 - M4, 0))",
      ],
      ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      [
        "Cost of Capital",
        "",
        "='Cost of Capital'!$G$18",
        "=C11",
        "=D11",
        "=E11",
        "=F11",
        "=G11-(G11-M11)/5",
        "=H11-(G11-M11)/5",
        "=I11-(G11-M11)/5",
        "=J11-(G11-M11)/5",
        "=K11-(G11-M11)/5",
        '=FIN("matureMarketEquityRiskPremium") + FIN("riskFreeRate")',
      ],
      [
        "Cumulated Discount Factor",
        "",
        "=1/(1+C11)",
        "=C12*(1/(1+D11))",
        "=D12*(1/(1+E11))",
        "=E12*(1/(1+F11))",
        "=F12*(1/(1+G11))",
        "=G12*(1/(1+H11))",
        "=H12*(1/(1+I11))",
        "=I12*(1/(1+J11))",
        "=J12*(1/(1+K11))",
        "=K12*(1/(1+L11))",
        "",
      ],
      [
        "PV (FCFF)",
        "",
        "=C8*C12",
        "=D8*D12",
        "=E8*E12",
        "=F8*F12",
        "=G8*G12",
        "=H8*H12",
        "=I8*I12",
        "=J8*J12",
        "=K8*K12",
        "=L8*L12",
        "",
      ],
      ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      [
        "Sales to Capital Ratio",
        "",
        "='Required Inputs'!$B$4",
        "=C15",
        "=D15",
        "=E15",
        "=F15",
        "=G15",
        "=H15",
        "=I15",
        "=J15",
        "=K15",
        "",
      ],
      [
        "Invested Capital",
        '=IFERROR(FIN("investedCapital") / 1000000, 0)',
        "=B16+C7",
        "=C16+D7",
        "=D16+E7",
        "=E16+F7",
        "=F16+G7",
        "=G16+H7",
        "=H16+I7",
        "=I16+J7",
        "=J16+K7",
        "=K16+L7",
        "",
      ],
      [
        "ROIC",
        "=B6/B16",
        "=C6/C16",
        "=D6/D16",
        "=E6/E16",
        "=F6/F16",
        "=G6/G16",
        "=H6/H16",
        "=I6/I16",
        "=J6/J16",
        "=K6/K16",
        "=L6/L16",
        "=L11",
      ],
      ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["Terminal Cash Flow", "=M8", "", "", "", "", "", "", "", "", "", "", ""],
      [
        "Terminal Cost of Capital",
        "=M11",
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
        '=B19/(B20-FIN("riskFreeRate"))',
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
        "=B21*L12",
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
        "=SUM(C13, D13, E13, F13, G13, H13, I13, J13, K13, L13)",
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
      ["Sum of PV", "=B22+B23", "", "", "", "", "", "", "", "", "", "", ""],
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
        '=((FIN("bookValueOfEquity")/1000000)+(FIN("bookValueOfDebt")/1000000))*\'Optional Inputs\'!J5',
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
        "=B24*(1-B25)+B26*B25",
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
        '=IFERROR(FIN("bookValueOfDebt") / 1000000, 0)',
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
        '=IFERROR(FIN("minorityInterest")  / 1000000, 0)',
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
        '=IFERROR(FIN("cashAndShortTermInvestments") / 1000000, 0)',
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
        "=B27-B28-B29+B30+B31",
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
        "=B32-B33",
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
        '=IF(B34/FIN("sharesOutstanding") < 0, 0, B34/(FIN("sharesOutstanding") / 1000000))',
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
      ["Margin of Safety", "=IFERROR((B36-B35)/B36, 0)"],
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
        format: "currency",
        color: "#43cea2",
      },
    ],
    merges: [],
    rows: [
      {
        cells: [
          ,
          ,
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
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
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
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
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
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
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
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
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
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
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
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
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
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
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
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
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
        ],
      },
      ,
      {
        cells: [
          ,
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
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
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
        ],
      },
      ,
      {
        cells: [
          ,
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
          },
          {
            style: 4,
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
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
          {
            style: 3,
          },
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
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
          {
            style: 0,
          },
        ],
      },
      ,
      {
        cells: [
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
          },
        ],
      },
      {
        cells: [
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
            style: 3,
          },
        ],
      },
      {
        cells: [
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
            style: 3,
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
      {
        cells: [
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
            style: 3,
          },
        ],
      },
      {
        cells: [
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
            style: 3,
          },
        ],
      },
      {
        cells: [
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
            style: 3,
          },
        ],
      },
      {
        cells: [
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
            style: 3,
          },
        ],
      },
      {
        cells: [
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
            style: 3,
          },
        ],
      },
      {
        cells: [
          ,
          {
            style: 5,
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
    ],
    cols: {
      0: {
        width: 170,
      },
    },
    validations: [],
    autofilter: {},
  };
};

export default getDCFValuationData;
