import {
  getCellsBetween,
  getCellsForRows,
  getColumnsBetween,
  getColumnsTo,
  getHighestColumn,
  getNumberOfRows,
} from "./utils";
import {
  getCumulatedDiscountFactorCalculation,
  getEBITAfterTax,
  getEBITCalculation,
  getEBITMarginCalculation,
  getFCFFCalculation,
  getInvestedCapitalCalculation,
  getNOLCalculation,
  getOneToFiveYrCostOfCapitalCalculation,
  getOneToFiveYrTaxCalculation,
  getPVToFCFFCalculation,
  getReinvestmentCalculation,
  getRevenueCalculation,
  getRevenueOneToFiveYrCalculation,
  getRevenueSixToTenYrCalculation,
  getROICCalculation,
  getSalesToCapitalRatioCalculation,
  getSixToTenYrCostOfCapitalCalculation,
  getSixToTenYrTaxCalculation,
  optionalInputsSheetName,
  requiredInputsSheetName,
} from "./templates/freeCashFlowFirmSimple/expressionCalculations";

const getExpressionProperties = (expr) => {
  return { className: "equation", expr };
};

const cells = {
  A1: { value: "" },
  A2: { value: "Revenues" },
  A3: { value: "Operating Margin" },
  A4: { value: "Operating Income" },
  A5: { value: "Tax Rate" },
  A6: { value: "NOPAT" },
  A7: { value: "- Reinvestment" },
  A8: { value: "FCFF" },
  A9: { value: "NOL" },
  A10: { value: "" },
  A11: { value: "Cost of Capital" },
  A12: { value: "Cumulated Discount Factor" },
  A13: { value: "PV (FCFF)" },
  A14: { value: "" },
  A15: { value: "Sales to Capital Ratio" },
  A16: { value: "Invested Capital" },
  A17: { value: "ROIC" },
  A18: { value: "" },
  A19: { value: "Terminal Cash Flow" },
  A20: { value: "Terminal Cost of Capital" },
  A21: { value: "Terminal Value" },
  A22: { value: "PV (Terminal Value)" },
  A23: { value: "PV (CF Over Next 10 Years" },
  A24: { value: "Sum of PV" },
  A25: { value: "Probability of Failure" },
  A26: { value: "Proceeds if the Firm Fails" },
  A27: { value: "Operating Assets" },
  A28: { value: "- Debt" },
  A29: { value: "- Minority Interests" },
  A30: { value: "+ Cash" },
  A31: { value: "+ Non-Operating Assets" },
  A32: { value: "Equity" },
  A33: { value: "- Options" },
  A34: { value: "Common Stock Equity" },
  A35: { value: "Current Price" },
  A36: {
    value: "Estimated Value Per Share",
    className: "estimated-value-per-share-label",
  },
  A37: { value: "Margin of Safety" },
  B1: { value: "Base Year" },
  B2: getExpressionProperties("=totalRevenue"),
  B3: getExpressionProperties("=B4/B2"),
  B4: getExpressionProperties("=operatingIncome"),
  B5: getExpressionProperties("=pastThreeYearsAverageEffectiveTaxRate"),
  B6: getExpressionProperties("=IF(B4 > 0, B4 * (1-B5), B4)"),
  B9: getExpressionProperties(`='${optionalInputsSheetName}'!J2`),
  B16: getExpressionProperties("=investedCapital"),
  B19: getExpressionProperties("=M8"),
  B20: getExpressionProperties("=M11"),
  B21: getExpressionProperties(`=B19/(B20-riskFreeRate)`),
  B22: getExpressionProperties("=B21*L12"),
  B23: getExpressionProperties(
    "=SUM(C13, D13, E13, F13, G13, H13, I13, J13, K13, L13)",
  ),
  B24: getExpressionProperties("=B22+B23"),
  B25: getExpressionProperties(`='${optionalInputsSheetName}'!J4`),
  B26: getExpressionProperties(
    `=(bookValueOfEquity+bookValueOfDebt)*'${optionalInputsSheetName}'!J5`,
  ),
  B27: getExpressionProperties("=B24*(1-B25)+B26*B25"),
  B28: getExpressionProperties("=bookValueOfDebt"),
  B29: getExpressionProperties("=minorityInterest"),
  B30: getExpressionProperties("=cashAndShortTermInvestments"),
  B31: getExpressionProperties(`='${optionalInputsSheetName}'!J3`),
  B32: getExpressionProperties("=B27-B28-B29+B30+B31"),
  B33: getExpressionProperties("='Employee Options'!$B$17"),
  B34: getExpressionProperties("=B32-B33"),
  B35: getExpressionProperties("=price"),
  B36: getExpressionProperties(
    "=IF(B34/sharesOutstanding < 0, 0, B34/sharesOutstanding)",
  ),
  B37: getExpressionProperties("=IFERROR((B36-B35)/B36, 0)"),
  C7: getExpressionProperties("=IF(C2 > B2, (C2-B2) / C15, 0)"),
  C11: getExpressionProperties("=totalCostOfCapital"),
  C12: getExpressionProperties("=1/(1+C11)"),
  C15: getExpressionProperties(`='${requiredInputsSheetName}'!$B$4`),
  M1: { value: "Terminal Year" },
  M2: getExpressionProperties(getRevenueCalculation("M2", "riskFreeRate")),
  M3: getExpressionProperties("=L3"),
  M5: getExpressionProperties("=marginalTaxRate"),
  M6: getExpressionProperties("=M4*(1-M5)"),
  M7: getExpressionProperties(
    "=IF(riskFreeRate > 0, (riskFreeRate / M17) * M6, 0)",
  ),
  M11: getExpressionProperties("=matureMarketEquityRiskPremium + riskFreeRate"),
  M17: getExpressionProperties("=L11"),
};

export const columns = getColumnsTo(getHighestColumn(cells));
export const numberOfRows = getNumberOfRows(cells);

getColumnsBetween(columns, "C", "L").forEach((column, index) => {
  const key = column + 1;

  cells[key] = {
    readOnly: true,
    value: index + 1,
    type: "number",
  };
});

getCellsForRows(columns, [12, 15]).forEach((key) => {
  if (key.charAt(0) !== "A") {
    cells[key] = {
      ...cells[key],
      type: "number",
    };
  }
});

getCellsForRows(columns, [3, 5, 11, 17])
  .concat(["B20", "B25", "B37"])
  .forEach((key) => {
    if (key.charAt(0) !== "A") {
      cells[key] = {
        ...cells[key],
        type: "percent",
      };
    }
  });

["B35", "B36"].forEach((key) => {
  if (key.charAt(0) !== "A") {
    cells[key] = {
      ...cells[key],
      type: "currency",
    };
  }
});

getCellsForRows(columns, [2, 4, 6, 7, 8, 9, 13, 16])
  .concat([
    "B19",
    "B21",
    "B22",
    "B23",
    "B24",
    "B26",
    "B27",
    "B28",
    "B29",
    "B30",
    "B31",
    "B32",
    "B33",
    "B34",
  ])
  .forEach((key) => {
    if (key.charAt(0) !== "A") {
      cells[key] = {
        ...cells[key],
        type: "million-currency",
      };
    }
  });

getColumnsBetween(columns, "C", "G").forEach((column) => {
  const revenueOneToFiveYrKey = `${column}2`;
  const taxKey = `${column}5`;

  cells[revenueOneToFiveYrKey].expr = getRevenueOneToFiveYrCalculation(
    revenueOneToFiveYrKey,
  );
  cells[taxKey].expr = getOneToFiveYrTaxCalculation(taxKey);
});

getColumnsBetween(columns, "D", "G").forEach((column) => {
  const cocKey = `${column}11`;

  cells[cocKey].expr = getOneToFiveYrCostOfCapitalCalculation(cocKey);
});

getColumnsBetween(columns, "H", "L").forEach((column, index) => {
  const revenueSixToTenYrKey = `${column}2`;
  const taxKey = `${column}5`;
  const cocKey = `${column}11`;

  cells[revenueSixToTenYrKey].expr = getRevenueSixToTenYrCalculation(
    index,
    revenueSixToTenYrKey,
  );
  cells[taxKey].expr = getSixToTenYrTaxCalculation(taxKey);
  cells[cocKey].expr = getSixToTenYrCostOfCapitalCalculation(cocKey);
});

getColumnsBetween(columns, "C", "L").forEach((column) => {
  const ebitMarginKey = `${column}3`;
  const ebitAfterTaxKey = `${column}6`;
  const pvFCFFKey = `${column}13`;
  const investedCapKey = `${column}16`;

  cells[ebitMarginKey].expr = getEBITMarginCalculation(ebitMarginKey);
  cells[ebitAfterTaxKey].expr = getEBITAfterTax(ebitAfterTaxKey);
  cells[pvFCFFKey].expr = getPVToFCFFCalculation(pvFCFFKey);
  cells[investedCapKey].expr = getInvestedCapitalCalculation(investedCapKey);
});

getColumnsBetween(columns, "C", "M").forEach((column) => {
  const ebitKey = `${column}4`;
  const nolKey = `${column}9`;
  const fcffKey = `${column}8`;

  cells[ebitKey].expr = getEBITCalculation(ebitKey);
  cells[nolKey].expr = getNOLCalculation(nolKey);
  cells[fcffKey].expr = getFCFFCalculation(fcffKey);
});

getColumnsBetween(columns, "D", "L").forEach((column) => {
  const reinvestmentKey = `${column}7`;
  const discountFactorKey = `${column}12`;
  const salesCapRatioKey = `${column}15`;

  cells[reinvestmentKey].expr = getReinvestmentCalculation(reinvestmentKey);
  cells[discountFactorKey].expr = getCumulatedDiscountFactorCalculation(
    discountFactorKey,
  );
  cells[salesCapRatioKey].expr = getSalesToCapitalRatioCalculation(
    salesCapRatioKey,
  );
});

getColumnsBetween(columns, "B", "L").forEach((column) => {
  const roicKey = `${column}17`;

  cells[roicKey].expr = getROICCalculation(roicKey);
});

export const yoyGrowthCells = getCellsBetween("C", "M", 2, 17, cells);

export default cells;
