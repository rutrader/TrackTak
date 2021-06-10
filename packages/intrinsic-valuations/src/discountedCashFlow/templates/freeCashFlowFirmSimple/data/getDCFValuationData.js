const getDCFValuationData = (isOnMobile) => {
  let desktopData;

  if (!isOnMobile) {
    desktopData = {
      freeze: "B38",
    };
  }

  return {
    ...desktopData,
    name: "DCF Valuation",
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
    ],
    merges: [],
    rows: {
      0: {
        cells: [
          {
            text: "",
          },
          {
            text: "Base Year",
          },
          {
            text: 1,
            style: 4,
          },
          {
            text: 2,
            style: 4,
          },
          {
            text: 3,
            style: 4,
          },
          {
            text: 4,
            style: 4,
          },
          {
            text: 5,
            style: 4,
          },
          {
            text: 6,
            style: 4,
          },
          {
            text: 7,
            style: 4,
          },
          {
            text: 8,
            style: 4,
          },
          {
            text: 9,
            style: 4,
          },
          {
            text: 10,
            style: 4,
          },
          {
            text: "Terminal Year",
          },
        ],
      },
      1: {
        cells: [
          {
            text: "Revenues",
          },
          {
            text: "=totalRevenue",
            style: 2,
          },
          {
            text: "=B2*(1+'Required Inputs'!$B$1)",
            style: 2,
          },
          {
            text: "=C2*(1+'Required Inputs'!$B$1)",
            style: 2,
          },
          {
            text: "=D2*(1+'Required Inputs'!$B$1)",
            style: 2,
          },
          {
            text: "=E2*(1+'Required Inputs'!$B$1)",
            style: 2,
          },
          {
            text: "=F2*(1+'Required Inputs'!$B$1)",
            style: 2,
          },
          {
            text:
              "=G2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-riskFreeRate) / 5))",
            style: 2,
          },
          {
            text:
              "=H2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-riskFreeRate) / 5) * 2)",
            style: 2,
          },
          {
            text:
              "=I2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-riskFreeRate) / 5) * 3)",
            style: 2,
          },
          {
            text:
              "=J2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-riskFreeRate) / 5) * 4)",
            style: 2,
          },
          {
            text:
              "=K2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-riskFreeRate) / 5) * 5)",
            style: 2,
          },
          {
            text: "=L2*(1+riskFreeRate)",
            style: 2,
          },
        ],
      },
      2: {
        cells: [
          {
            text: "Operating Margin",
          },
          {
            text: "=B4/B2",
            style: 0,
          },
          {
            text:
              "=IF(C1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - C1))",
            style: 0,
          },
          {
            text:
              "=IF(D1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - D1))",
            style: 0,
          },
          {
            text:
              "=IF(E1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - E1))",
            style: 0,
          },
          {
            text:
              "=IF(F1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - F1))",
            style: 0,
          },
          {
            text:
              "=IF(G1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - G1))",
            style: 0,
          },
          {
            text:
              "=IF(H1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - H1))",
            style: 0,
          },
          {
            text:
              "=IF(I1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - I1))",
            style: 0,
          },
          {
            text:
              "=IF(J1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - J1))",
            style: 0,
          },
          {
            text:
              "=IF(K1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - K1))",
            style: 0,
          },
          {
            text:
              "=IF(L1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - L1))",
            style: 0,
          },
          {
            text: "=L3",
            style: 0,
          },
        ],
      },
      3: {
        cells: [
          {
            text: "Operating Income",
          },
          {
            text: "=operatingIncome",
            style: 2,
          },
          {
            text: "=C3*C2",
            style: 2,
          },
          {
            text: "=D3*D2",
            style: 2,
          },
          {
            text: "=E3*E2",
            style: 2,
          },
          {
            text: "=F3*F2",
            style: 2,
          },
          {
            text: "=G3*G2",
            style: 2,
          },
          {
            text: "=H3*H2",
            style: 2,
          },
          {
            text: "=I3*I2",
            style: 2,
          },
          {
            text: "=J3*J2",
            style: 2,
          },
          {
            text: "=K3*K2",
            style: 2,
          },
          {
            text: "=L3*L2",
            style: 2,
          },
          {
            text: "=M3*M2",
            style: 2,
          },
        ],
      },
      4: {
        cells: [
          {
            text: "Tax Rate",
          },
          {
            text: "=pastThreeYearsAverageEffectiveTaxRate",
            style: 0,
          },
          {
            text: "=B5",
            style: 0,
          },
          {
            text: "=C5",
            style: 0,
          },
          {
            text: "=D5",
            style: 0,
          },
          {
            text: "=E5",
            style: 0,
          },
          {
            text: "=F5",
            style: 0,
          },
          {
            text: "=G5+(M5-G5)/5",
            style: 0,
          },
          {
            text: "=H5+(M5-G5)/5",
            style: 0,
          },
          {
            text: "=I5+(M5-G5)/5",
            style: 0,
          },
          {
            text: "=J5+(M5-G5)/5",
            style: 0,
          },
          {
            text: "=K5+(M5-G5)/5",
            style: 0,
          },
          {
            text: "=marginalTaxRate",
            style: 0,
          },
        ],
      },
      5: {
        cells: [
          {
            text: "NOPAT",
          },
          {
            text: "=IF(B4 > 0, B4 * (1-B5), B4)",
            style: 2,
          },
          {
            text: "=IF(C4 > 0, IF(C4 < B9, C4, C4 - (C4 - B9) * C5), C4)",
            style: 2,
          },
          {
            text: "=IF(D4 > 0, IF(D4 < C9, D4, D4 - (D4 - C9) * D5), D4)",
            style: 2,
          },
          {
            text: "=IF(E4 > 0, IF(E4 < D9, E4, E4 - (E4 - D9) * E5), E4)",
            style: 2,
          },
          {
            text: "=IF(F4 > 0, IF(F4 < E9, F4, F4 - (F4 - E9) * F5), F4)",
            style: 2,
          },
          {
            text: "=IF(G4 > 0, IF(G4 < F9, G4, G4 - (G4 - F9) * G5), G4)",
            style: 2,
          },
          {
            text: "=IF(H4 > 0, IF(H4 < G9, H4, H4 - (H4 - G9) * H5), H4)",
            style: 2,
          },
          {
            text: "=IF(I4 > 0, IF(I4 < H9, I4, I4 - (I4 - H9) * I5), I4)",
            style: 2,
          },
          {
            text: "=IF(J4 > 0, IF(J4 < I9, J4, J4 - (J4 - I9) * J5), J4)",
            style: 2,
          },
          {
            text: "=IF(K4 > 0, IF(K4 < J9, K4, K4 - (K4 - J9) * K5), K4)",
            style: 2,
          },
          {
            text: "=IF(L4 > 0, IF(L4 < K9, L4, L4 - (L4 - K9) * L5), L4)",
            style: 2,
          },
          {
            text: "=M4*(1-M5)",
            style: 2,
          },
        ],
      },
      6: {
        cells: [
          {
            text: "- Reinvestment",
          },
          {
            text: "",
            style: 2,
          },
          {
            text: "=IF(C2 > B2, (C2-B2) / C15, 0)",
            style: 2,
          },
          {
            text: "=(D2-C2)/D15",
            style: 2,
          },
          {
            text: "=(E2-D2)/E15",
            style: 2,
          },
          {
            text: "=(F2-E2)/F15",
            style: 2,
          },
          {
            text: "=(G2-F2)/G15",
            style: 2,
          },
          {
            text: "=(H2-G2)/H15",
            style: 2,
          },
          {
            text: "=(I2-H2)/I15",
            style: 2,
          },
          {
            text: "=(J2-I2)/J15",
            style: 2,
          },
          {
            text: "=(K2-J2)/K15",
            style: 2,
          },
          {
            text: "=(L2-K2)/L15",
            style: 2,
          },
          {
            text: "=IF(riskFreeRate > 0, (riskFreeRate / M17) * M6, 0)",
            style: 2,
          },
        ],
      },
      7: {
        cells: [
          {
            text: "FCFF",
          },
          {
            text: "",
            style: 2,
          },
          {
            text: "=C6 - C7",
            style: 2,
          },
          {
            text: "=D6 - D7",
            style: 2,
          },
          {
            text: "=E6 - E7",
            style: 2,
          },
          {
            text: "=F6 - F7",
            style: 2,
          },
          {
            text: "=G6 - G7",
            style: 2,
          },
          {
            text: "=H6 - H7",
            style: 2,
          },
          {
            text: "=I6 - I7",
            style: 2,
          },
          {
            text: "=J6 - J7",
            style: 2,
          },
          {
            text: "=K6 - K7",
            style: 2,
          },
          {
            text: "=L6 - L7",
            style: 2,
          },
          {
            text: "=M6 - M7",
            style: 2,
          },
        ],
      },
      8: {
        cells: [
          {
            text: "NOL",
          },
          {
            text: "='Optional Inputs'!J2",
            style: 2,
          },
          {
            text: "=IF(C4 < 0, B9 - C4, IF(B9 > C4, B9 - C4, 0))",
            style: 2,
          },
          {
            text: "=IF(D4 < 0, C9 - D4, IF(C9 > D4, C9 - D4, 0))",
            style: 2,
          },
          {
            text: "=IF(E4 < 0, D9 - E4, IF(D9 > E4, D9 - E4, 0))",
            style: 2,
          },
          {
            text: "=IF(F4 < 0, E9 - F4, IF(E9 > F4, E9 - F4, 0))",
            style: 2,
          },
          {
            text: "=IF(G4 < 0, F9 - G4, IF(F9 > G4, F9 - G4, 0))",
            style: 2,
          },
          {
            text: "=IF(H4 < 0, G9 - H4, IF(G9 > H4, G9 - H4, 0))",
            style: 2,
          },
          {
            text: "=IF(I4 < 0, H9 - I4, IF(H9 > I4, H9 - I4, 0))",
            style: 2,
          },
          {
            text: "=IF(J4 < 0, I9 - J4, IF(I9 > J4, I9 - J4, 0))",
            style: 2,
          },
          {
            text: "=IF(K4 < 0, J9 - K4, IF(J9 > K4, J9 - K4, 0))",
            style: 2,
          },
          {
            text: "=IF(L4 < 0, K9 - L4, IF(K9 > L4, K9 - L4, 0))",
            style: 2,
          },
          {
            text: "=IF(M4 < 0, L9 - M4, IF(L9 > M4, L9 - M4, 0))",
            style: 2,
          },
        ],
      },
      9: {
        cells: [
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      10: {
        cells: [
          {
            text: "Cost of Capital",
          },
          {
            text: "",
            style: 0,
          },
          {
            text: "=totalCostOfCapital",
            style: 0,
          },
          {
            text: "=C11",
            style: 0,
          },
          {
            text: "=D11",
            style: 0,
          },
          {
            text: "=E11",
            style: 0,
          },
          {
            text: "=F11",
            style: 0,
          },
          {
            text: "=G11-(G11-M11)/5",
            style: 0,
          },
          {
            text: "=H11-(G11-M11)/5",
            style: 0,
          },
          {
            text: "=I11-(G11-M11)/5",
            style: 0,
          },
          {
            text: "=J11-(G11-M11)/5",
            style: 0,
          },
          {
            text: "=K11-(G11-M11)/5",
            style: 0,
          },
          {
            text: "=matureMarketEquityRiskPremium + riskFreeRate",
            style: 0,
          },
        ],
      },
      11: {
        cells: [
          {
            text: "Cumulated Discount Factor",
          },
          {
            text: "",
            style: 4,
          },
          {
            text: "=1/(1+C11)",
            style: 4,
          },
          {
            text: "=C12*(1/(1+D11))",
            style: 4,
          },
          {
            text: "=D12*(1/(1+E11))",
            style: 4,
          },
          {
            text: "=E12*(1/(1+F11))",
            style: 4,
          },
          {
            text: "=F12*(1/(1+G11))",
            style: 4,
          },
          {
            text: "=G12*(1/(1+H11))",
            style: 4,
          },
          {
            text: "=H12*(1/(1+I11))",
            style: 4,
          },
          {
            text: "=I12*(1/(1+J11))",
            style: 4,
          },
          {
            text: "=J12*(1/(1+K11))",
            style: 4,
          },
          {
            text: "=K12*(1/(1+L11))",
            style: 4,
          },
          {
            text: "",
            style: 4,
          },
        ],
      },
      12: {
        cells: [
          {
            text: "PV (FCFF)",
          },
          {
            text: "",
            style: 2,
          },
          {
            text: "=C8*C12",
            style: 2,
          },
          {
            text: "=D8*D12",
            style: 2,
          },
          {
            text: "=E8*E12",
            style: 2,
          },
          {
            text: "=F8*F12",
            style: 2,
          },
          {
            text: "=G8*G12",
            style: 2,
          },
          {
            text: "=H8*H12",
            style: 2,
          },
          {
            text: "=I8*I12",
            style: 2,
          },
          {
            text: "=J8*J12",
            style: 2,
          },
          {
            text: "=K8*K12",
            style: 2,
          },
          {
            text: "=L8*L12",
            style: 2,
          },
          {
            text: "",
            style: 2,
          },
        ],
      },
      13: {
        cells: [
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      14: {
        cells: [
          {
            text: "Sales to Capital Ratio",
          },
          {
            text: "",
            style: 4,
          },
          {
            text: "='Required Inputs'!$B$4",
            style: 4,
          },
          {
            text: "=C15",
            style: 4,
          },
          {
            text: "=D15",
            style: 4,
          },
          {
            text: "=E15",
            style: 4,
          },
          {
            text: "=F15",
            style: 4,
          },
          {
            text: "=G15",
            style: 4,
          },
          {
            text: "=H15",
            style: 4,
          },
          {
            text: "=I15",
            style: 4,
          },
          {
            text: "=J15",
            style: 4,
          },
          {
            text: "=K15",
            style: 4,
          },
          {
            text: "",
            style: 4,
          },
        ],
      },
      15: {
        cells: [
          {
            text: "Invested Capital",
          },
          {
            text: "=investedCapital",
            style: 2,
          },
          {
            text: "=B16+C7",
            style: 2,
          },
          {
            text: "=C16+D7",
            style: 2,
          },
          {
            text: "=D16+E7",
            style: 2,
          },
          {
            text: "=E16+F7",
            style: 2,
          },
          {
            text: "=F16+G7",
            style: 2,
          },
          {
            text: "=G16+H7",
            style: 2,
          },
          {
            text: "=H16+I7",
            style: 2,
          },
          {
            text: "=I16+J7",
            style: 2,
          },
          {
            text: "=J16+K7",
            style: 2,
          },
          {
            text: "=K16+L7",
            style: 2,
          },
          {
            text: "",
            style: 2,
          },
        ],
      },
      16: {
        cells: [
          {
            text: "ROIC",
          },
          {
            text: "=B6/B16",
            style: 0,
          },
          {
            text: "=C6/C16",
            style: 0,
          },
          {
            text: "=D6/D16",
            style: 0,
          },
          {
            text: "=E6/E16",
            style: 0,
          },
          {
            text: "=F6/F16",
            style: 0,
          },
          {
            text: "=G6/G16",
            style: 0,
          },
          {
            text: "=H6/H16",
            style: 0,
          },
          {
            text: "=I6/I16",
            style: 0,
          },
          {
            text: "=J6/J16",
            style: 0,
          },
          {
            text: "=K6/K16",
            style: 0,
          },
          {
            text: "=L6/L16",
            style: 0,
          },
          {
            text: "=L11",
            style: 0,
          },
        ],
      },
      17: {
        cells: [
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      18: {
        cells: [
          {
            text: "Terminal Cash Flow",
          },
          {
            text: "=M8",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      19: {
        cells: [
          {
            text: "Terminal Cost of Capital",
          },
          {
            text: "=M11",
            style: 0,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      20: {
        cells: [
          {
            text: "Terminal Value",
          },
          {
            text: "=B19/(B20-riskFreeRate)",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      21: {
        cells: [
          {
            text: "PV (Terminal Value)",
          },
          {
            text: "=B21*L12",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      22: {
        cells: [
          {
            text: "PV (CF Over Next 10 Years",
          },
          {
            text: "=SUM(C13, D13, E13, F13, G13, H13, I13, J13, K13, L13)",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      23: {
        cells: [
          {
            text: "Sum of PV",
          },
          {
            text: "=B22+B23",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      24: {
        cells: [
          {
            text: "Probability of Failure",
          },
          {
            text: "='Optional Inputs'!J4",
            style: 0,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      25: {
        cells: [
          {
            text: "Proceeds if the Firm Fails",
          },
          {
            text: "=(bookValueOfEquity+bookValueOfDebt)*'Optional Inputs'!J5",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      26: {
        cells: [
          {
            text: "Operating Assets",
          },
          {
            text: "=B24*(1-B25)+B26*B25",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      27: {
        cells: [
          {
            text: "- Debt",
          },
          {
            text: "=bookValueOfDebt",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      28: {
        cells: [
          {
            text: "- Minority Interests",
          },
          {
            text: "=minorityInterest",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      29: {
        cells: [
          {
            text: "+ Cash",
          },
          {
            text: "=cashAndShortTermInvestments",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      30: {
        cells: [
          {
            text: "+ Non-Operating Assets",
          },
          {
            text: "='Optional Inputs'!J3",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      31: {
        cells: [
          {
            text: "Equity",
          },
          {
            text: "=B27-B28-B29+B30+B31",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      32: {
        cells: [
          {
            text: "- Options",
          },
          {
            text: "='Employee Options'!$B$17",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      33: {
        cells: [
          {
            text: "Common Stock Equity",
          },
          {
            text: "=B32-B33",
            style: 2,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      34: {
        cells: [
          {
            text: "Current Price",
          },
          {
            text: "=price",
            style: 3,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      35: {
        cells: [
          {
            text: "Estimated Value Per Share",
          },
          {
            text: "=IF(B34/sharesOutstanding < 0, 0, B34/sharesOutstanding)",
            style: 3,
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
      },
      36: {
        cells: [
          {
            text: "Margin of Safety",
          },
          {
            text: "=IFERROR((B36-B35)/B36, 0)",
            style: 0,
          },
        ],
      },
      len: 100,
    },
    cols: {
      0: {
        width: 170,
      },
      len: 26,
    },
    validations: [],
    autofilter: {},
  };
};

export default getDCFValuationData;
