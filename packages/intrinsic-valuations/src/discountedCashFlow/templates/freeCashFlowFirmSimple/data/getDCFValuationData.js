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
        cells: {
          0: {
            text: "",
          },
          1: {
            text: "Base Year",
          },
          2: {
            text: 1,
            style: 4,
          },
          3: {
            text: 2,
            style: 4,
          },
          4: {
            text: 3,
            style: 4,
          },
          5: {
            text: 4,
            style: 4,
          },
          6: {
            text: 5,
            style: 4,
          },
          7: {
            text: 6,
            style: 4,
          },
          8: {
            text: 7,
            style: 4,
          },
          9: {
            text: 8,
            style: 4,
          },
          10: {
            text: 9,
            style: 4,
          },
          11: {
            text: 10,
            style: 4,
          },
          12: {
            text: "Terminal Year",
          },
        },
      },
      1: {
        cells: {
          0: {
            text: "Revenues",
          },
          1: {
            text: "=totalRevenue",
            style: 2,
          },
          2: {
            text: "=B2*(1+'Required Inputs'!$B$1)",
            style: 2,
          },
          3: {
            text: "=C2*(1+'Required Inputs'!$B$1)",
            style: 2,
          },
          4: {
            text: "=D2*(1+'Required Inputs'!$B$1)",
            style: 2,
          },
          5: {
            text: "=E2*(1+'Required Inputs'!$B$1)",
            style: 2,
          },
          6: {
            text: "=F2*(1+'Required Inputs'!$B$1)",
            style: 2,
          },
          7: {
            text:
              "=G2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-riskFreeRate) / 5))",
            style: 2,
          },
          8: {
            text:
              "=H2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-riskFreeRate) / 5) * 2)",
            style: 2,
          },
          9: {
            text:
              "=I2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-riskFreeRate) / 5) * 3)",
            style: 2,
          },
          10: {
            text:
              "=J2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-riskFreeRate) / 5) * 4)",
            style: 2,
          },
          11: {
            text:
              "=K2*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-riskFreeRate) / 5) * 5)",
            style: 2,
          },
          12: {
            text: "=L2*(1+riskFreeRate)",
            style: 2,
          },
        },
      },
      2: {
        cells: {
          0: {
            text: "Operating Margin",
          },
          1: {
            text: "=B4/B2",
            style: 0,
          },
          2: {
            text:
              "=IF(C1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - C1))",
            style: 0,
          },
          3: {
            text:
              "=IF(D1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - D1))",
            style: 0,
          },
          4: {
            text:
              "=IF(E1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - E1))",
            style: 0,
          },
          5: {
            text:
              "=IF(F1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - F1))",
            style: 0,
          },
          6: {
            text:
              "=IF(G1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - G1))",
            style: 0,
          },
          7: {
            text:
              "=IF(H1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - H1))",
            style: 0,
          },
          8: {
            text:
              "=IF(I1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - I1))",
            style: 0,
          },
          9: {
            text:
              "=IF(J1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - J1))",
            style: 0,
          },
          10: {
            text:
              "=IF(K1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - K1))",
            style: 0,
          },
          11: {
            text:
              "=IF(L1 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B3) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - L1))",
            style: 0,
          },
          12: {
            text: "=L3",
            style: 0,
          },
        },
      },
      3: {
        cells: {
          0: {
            text: "Operating Income",
          },
          1: {
            text: "=operatingIncome",
            style: 2,
          },
          2: {
            text: "=C3*C2",
            style: 2,
          },
          3: {
            text: "=D3*D2",
            style: 2,
          },
          4: {
            text: "=E3*E2",
            style: 2,
          },
          5: {
            text: "=F3*F2",
            style: 2,
          },
          6: {
            text: "=G3*G2",
            style: 2,
          },
          7: {
            text: "=H3*H2",
            style: 2,
          },
          8: {
            text: "=I3*I2",
            style: 2,
          },
          9: {
            text: "=J3*J2",
            style: 2,
          },
          10: {
            text: "=K3*K2",
            style: 2,
          },
          11: {
            text: "=L3*L2",
            style: 2,
          },
          12: {
            text: "=M3*M2",
            style: 2,
          },
        },
      },
      4: {
        cells: {
          0: {
            text: "Tax Rate",
          },
          1: {
            text: "=pastThreeYearsAverageEffectiveTaxRate",
            style: 0,
          },
          2: {
            text: "=B5",
            style: 0,
          },
          3: {
            text: "=C5",
            style: 0,
          },
          4: {
            text: "=D5",
            style: 0,
          },
          5: {
            text: "=E5",
            style: 0,
          },
          6: {
            text: "=F5",
            style: 0,
          },
          7: {
            text: "=G5+(M5-G5)/5",
            style: 0,
          },
          8: {
            text: "=H5+(M5-G5)/5",
            style: 0,
          },
          9: {
            text: "=I5+(M5-G5)/5",
            style: 0,
          },
          10: {
            text: "=J5+(M5-G5)/5",
            style: 0,
          },
          11: {
            text: "=K5+(M5-G5)/5",
            style: 0,
          },
          12: {
            text: "=marginalTaxRate",
            style: 0,
          },
        },
      },
      5: {
        cells: {
          0: {
            text: "NOPAT",
          },
          1: {
            text: "=IF(B4 > 0, B4 * (1-B5), B4)",
            style: 2,
          },
          2: {
            text: "=IF(C4 > 0, IF(C4 < B9, C4, C4 - (C4 - B9) * C5), C4)",
            style: 2,
          },
          3: {
            text: "=IF(D4 > 0, IF(D4 < C9, D4, D4 - (D4 - C9) * D5), D4)",
            style: 2,
          },
          4: {
            text: "=IF(E4 > 0, IF(E4 < D9, E4, E4 - (E4 - D9) * E5), E4)",
            style: 2,
          },
          5: {
            text: "=IF(F4 > 0, IF(F4 < E9, F4, F4 - (F4 - E9) * F5), F4)",
            style: 2,
          },
          6: {
            text: "=IF(G4 > 0, IF(G4 < F9, G4, G4 - (G4 - F9) * G5), G4)",
            style: 2,
          },
          7: {
            text: "=IF(H4 > 0, IF(H4 < G9, H4, H4 - (H4 - G9) * H5), H4)",
            style: 2,
          },
          8: {
            text: "=IF(I4 > 0, IF(I4 < H9, I4, I4 - (I4 - H9) * I5), I4)",
            style: 2,
          },
          9: {
            text: "=IF(J4 > 0, IF(J4 < I9, J4, J4 - (J4 - I9) * J5), J4)",
            style: 2,
          },
          10: {
            text: "=IF(K4 > 0, IF(K4 < J9, K4, K4 - (K4 - J9) * K5), K4)",
            style: 2,
          },
          11: {
            text: "=IF(L4 > 0, IF(L4 < K9, L4, L4 - (L4 - K9) * L5), L4)",
            style: 2,
          },
          12: {
            text: "=M4*(1-M5)",
            style: 2,
          },
        },
      },
      6: {
        cells: {
          0: {
            text: "- Reinvestment",
          },
          1: {
            text: "",
            style: 2,
          },
          2: {
            text: "=IF(C2 > B2, (C2-B2) / C15, 0)",
            style: 2,
          },
          3: {
            text: "=(D2-C2)/D15",
            style: 2,
          },
          4: {
            text: "=(E2-D2)/E15",
            style: 2,
          },
          5: {
            text: "=(F2-E2)/F15",
            style: 2,
          },
          6: {
            text: "=(G2-F2)/G15",
            style: 2,
          },
          7: {
            text: "=(H2-G2)/H15",
            style: 2,
          },
          8: {
            text: "=(I2-H2)/I15",
            style: 2,
          },
          9: {
            text: "=(J2-I2)/J15",
            style: 2,
          },
          10: {
            text: "=(K2-J2)/K15",
            style: 2,
          },
          11: {
            text: "=(L2-K2)/L15",
            style: 2,
          },
          12: {
            text: "=IF(riskFreeRate > 0, (riskFreeRate / M17) * M6, 0)",
            style: 2,
          },
        },
      },
      7: {
        cells: {
          0: {
            text: "FCFF",
          },
          1: {
            text: "",
            style: 2,
          },
          2: {
            text: "=C6 - C7",
            style: 2,
          },
          3: {
            text: "=D6 - D7",
            style: 2,
          },
          4: {
            text: "=E6 - E7",
            style: 2,
          },
          5: {
            text: "=F6 - F7",
            style: 2,
          },
          6: {
            text: "=G6 - G7",
            style: 2,
          },
          7: {
            text: "=H6 - H7",
            style: 2,
          },
          8: {
            text: "=I6 - I7",
            style: 2,
          },
          9: {
            text: "=J6 - J7",
            style: 2,
          },
          10: {
            text: "=K6 - K7",
            style: 2,
          },
          11: {
            text: "=L6 - L7",
            style: 2,
          },
          12: {
            text: "=M6 - M7",
            style: 2,
          },
        },
      },
      8: {
        cells: {
          0: {
            text: "NOL",
          },
          1: {
            text: "='Optional Inputs'!J2",
            style: 2,
          },
          2: {
            text: "=IF(C4 < 0, B9 - C4, IF(B9 > C4, B9 - C4, 0))",
            style: 2,
          },
          3: {
            text: "=IF(D4 < 0, C9 - D4, IF(C9 > D4, C9 - D4, 0))",
            style: 2,
          },
          4: {
            text: "=IF(E4 < 0, D9 - E4, IF(D9 > E4, D9 - E4, 0))",
            style: 2,
          },
          5: {
            text: "=IF(F4 < 0, E9 - F4, IF(E9 > F4, E9 - F4, 0))",
            style: 2,
          },
          6: {
            text: "=IF(G4 < 0, F9 - G4, IF(F9 > G4, F9 - G4, 0))",
            style: 2,
          },
          7: {
            text: "=IF(H4 < 0, G9 - H4, IF(G9 > H4, G9 - H4, 0))",
            style: 2,
          },
          8: {
            text: "=IF(I4 < 0, H9 - I4, IF(H9 > I4, H9 - I4, 0))",
            style: 2,
          },
          9: {
            text: "=IF(J4 < 0, I9 - J4, IF(I9 > J4, I9 - J4, 0))",
            style: 2,
          },
          10: {
            text: "=IF(K4 < 0, J9 - K4, IF(J9 > K4, J9 - K4, 0))",
            style: 2,
          },
          11: {
            text: "=IF(L4 < 0, K9 - L4, IF(K9 > L4, K9 - L4, 0))",
            style: 2,
          },
          12: {
            text: "=IF(M4 < 0, L9 - M4, IF(L9 > M4, L9 - M4, 0))",
            style: 2,
          },
        },
      },
      9: {
        cells: {
          0: {
            text: "",
          },
          1: {
            text: "",
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      10: {
        cells: {
          0: {
            text: "Cost of Capital",
          },
          1: {
            text: "",
            style: 0,
          },
          2: {
            text: "='Cost of Capital'!$G$18",
            style: 0,
          },
          3: {
            text: "=C11",
            style: 0,
          },
          4: {
            text: "=D11",
            style: 0,
          },
          5: {
            text: "=E11",
            style: 0,
          },
          6: {
            text: "=F11",
            style: 0,
          },
          7: {
            text: "=G11-(G11-M11)/5",
            style: 0,
          },
          8: {
            text: "=H11-(G11-M11)/5",
            style: 0,
          },
          9: {
            text: "=I11-(G11-M11)/5",
            style: 0,
          },
          10: {
            text: "=J11-(G11-M11)/5",
            style: 0,
          },
          11: {
            text: "=K11-(G11-M11)/5",
            style: 0,
          },
          12: {
            text: "=matureMarketEquityRiskPremium + riskFreeRate",
            style: 0,
          },
        },
      },
      11: {
        cells: {
          0: {
            text: "Cumulated Discount Factor",
          },
          1: {
            text: "",
            style: 4,
          },
          2: {
            text: "=1/(1+C11)",
            style: 4,
          },
          3: {
            text: "=C12*(1/(1+D11))",
            style: 4,
          },
          4: {
            text: "=D12*(1/(1+E11))",
            style: 4,
          },
          5: {
            text: "=E12*(1/(1+F11))",
            style: 4,
          },
          6: {
            text: "=F12*(1/(1+G11))",
            style: 4,
          },
          7: {
            text: "=G12*(1/(1+H11))",
            style: 4,
          },
          8: {
            text: "=H12*(1/(1+I11))",
            style: 4,
          },
          9: {
            text: "=I12*(1/(1+J11))",
            style: 4,
          },
          10: {
            text: "=J12*(1/(1+K11))",
            style: 4,
          },
          11: {
            text: "=K12*(1/(1+L11))",
            style: 4,
          },
          12: {
            text: "",
            style: 4,
          },
        },
      },
      12: {
        cells: {
          0: {
            text: "PV (FCFF)",
          },
          1: {
            text: "",
            style: 2,
          },
          2: {
            text: "=C8*C12",
            style: 2,
          },
          3: {
            text: "=D8*D12",
            style: 2,
          },
          4: {
            text: "=E8*E12",
            style: 2,
          },
          5: {
            text: "=F8*F12",
            style: 2,
          },
          6: {
            text: "=G8*G12",
            style: 2,
          },
          7: {
            text: "=H8*H12",
            style: 2,
          },
          8: {
            text: "=I8*I12",
            style: 2,
          },
          9: {
            text: "=J8*J12",
            style: 2,
          },
          10: {
            text: "=K8*K12",
            style: 2,
          },
          11: {
            text: "=L8*L12",
            style: 2,
          },
          12: {
            text: "",
            style: 2,
          },
        },
      },
      13: {
        cells: {
          0: {
            text: "",
          },
          1: {
            text: "",
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      14: {
        cells: {
          0: {
            text: "Sales to Capital Ratio",
          },
          1: {
            text: "",
            style: 4,
          },
          2: {
            text: "='Required Inputs'!$B$4",
            style: 4,
          },
          3: {
            text: "=C15",
            style: 4,
          },
          4: {
            text: "=D15",
            style: 4,
          },
          5: {
            text: "=E15",
            style: 4,
          },
          6: {
            text: "=F15",
            style: 4,
          },
          7: {
            text: "=G15",
            style: 4,
          },
          8: {
            text: "=H15",
            style: 4,
          },
          9: {
            text: "=I15",
            style: 4,
          },
          10: {
            text: "=J15",
            style: 4,
          },
          11: {
            text: "=K15",
            style: 4,
          },
          12: {
            text: "",
            style: 4,
          },
        },
      },
      15: {
        cells: {
          0: {
            text: "Invested Capital",
          },
          1: {
            text: "=investedCapital",
            style: 2,
          },
          2: {
            text: "=B16+C7",
            style: 2,
          },
          3: {
            text: "=C16+D7",
            style: 2,
          },
          4: {
            text: "=D16+E7",
            style: 2,
          },
          5: {
            text: "=E16+F7",
            style: 2,
          },
          6: {
            text: "=F16+G7",
            style: 2,
          },
          7: {
            text: "=G16+H7",
            style: 2,
          },
          8: {
            text: "=H16+I7",
            style: 2,
          },
          9: {
            text: "=I16+J7",
            style: 2,
          },
          10: {
            text: "=J16+K7",
            style: 2,
          },
          11: {
            text: "=K16+L7",
            style: 2,
          },
          12: {
            text: "",
            style: 2,
          },
        },
      },
      16: {
        cells: {
          0: {
            text: "ROIC",
          },
          1: {
            text: "=B6/B16",
            style: 0,
          },
          2: {
            text: "=C6/C16",
            style: 0,
          },
          3: {
            text: "=D6/D16",
            style: 0,
          },
          4: {
            text: "=E6/E16",
            style: 0,
          },
          5: {
            text: "=F6/F16",
            style: 0,
          },
          6: {
            text: "=G6/G16",
            style: 0,
          },
          7: {
            text: "=H6/H16",
            style: 0,
          },
          8: {
            text: "=I6/I16",
            style: 0,
          },
          9: {
            text: "=J6/J16",
            style: 0,
          },
          10: {
            text: "=K6/K16",
            style: 0,
          },
          11: {
            text: "=L6/L16",
            style: 0,
          },
          12: {
            text: "=L11",
            style: 0,
          },
        },
      },
      17: {
        cells: {
          0: {
            text: "",
          },
          1: {
            text: "",
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      18: {
        cells: {
          0: {
            text: "Terminal Cash Flow",
          },
          1: {
            text: "=M8",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      19: {
        cells: {
          0: {
            text: "Terminal Cost of Capital",
          },
          1: {
            text: "=M11",
            style: 0,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      20: {
        cells: {
          0: {
            text: "Terminal Value",
          },
          1: {
            text: "=B19/(B20-riskFreeRate)",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      21: {
        cells: {
          0: {
            text: "PV (Terminal Value)",
          },
          1: {
            text: "=B21*L12",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      22: {
        cells: {
          0: {
            text: "PV (CF Over Next 10 Years",
          },
          1: {
            text: "=SUM(C13, D13, E13, F13, G13, H13, I13, J13, K13, L13)",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      23: {
        cells: {
          0: {
            text: "Sum of PV",
          },
          1: {
            text: "=B22+B23",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      24: {
        cells: {
          0: {
            text: "Probability of Failure",
          },
          1: {
            text: "='Optional Inputs'!J4",
            style: 0,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      25: {
        cells: {
          0: {
            text: "Proceeds if the Firm Fails",
          },
          1: {
            text: "=(bookValueOfEquity+bookValueOfDebt)*'Optional Inputs'!J5",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      26: {
        cells: {
          0: {
            text: "Operating Assets",
          },
          1: {
            text: "=B24*(1-B25)+B26*B25",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      27: {
        cells: {
          0: {
            text: "- Debt",
          },
          1: {
            text: "=bookValueOfDebt",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      28: {
        cells: {
          0: {
            text: "- Minority Interests",
          },
          1: {
            text: "=minorityInterest",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      29: {
        cells: {
          0: {
            text: "+ Cash",
          },
          1: {
            text: "=cashAndShortTermInvestments",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      30: {
        cells: {
          0: {
            text: "+ Non-Operating Assets",
          },
          1: {
            text: "='Optional Inputs'!J3",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      31: {
        cells: {
          0: {
            text: "Equity",
          },
          1: {
            text: "=B27-B28-B29+B30+B31",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      32: {
        cells: {
          0: {
            text: "- Options",
          },
          1: {
            text: "='Employee Options'!$B$17",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      33: {
        cells: {
          0: {
            text: "Common Stock Equity",
          },
          1: {
            text: "=B32-B33",
            style: 2,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      34: {
        cells: {
          0: {
            text: "Current Price",
          },
          1: {
            text: "=price",
            style: 3,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      35: {
        cells: {
          0: {
            text: "Estimated Value Per Share",
          },
          1: {
            text: "=IF(B34/sharesOutstanding < 0, 0, B34/sharesOutstanding)",
            style: 3,
          },
          2: {
            text: "",
          },
          3: {
            text: "",
          },
          4: {
            text: "",
          },
          5: {
            text: "",
          },
          6: {
            text: "",
          },
          7: {
            text: "",
          },
          8: {
            text: "",
          },
          9: {
            text: "",
          },
          10: {
            text: "",
          },
          11: {
            text: "",
          },
          12: {
            text: "",
          },
        },
      },
      36: {
        cells: {
          0: {
            text: "Margin of Safety",
          },
          1: {
            text: "=IFERROR((B36-B35)/B36, 0)",
            style: 0,
          },
        },
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
