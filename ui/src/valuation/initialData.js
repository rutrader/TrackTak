import {
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
  getOneToFiveYrRevenueGrowthCalculation,
  getOneToFiveYrTaxCalculation,
  getPVToFCFFCalculation,
  getReinvestmentCalculation,
  getRevenueCalculation,
  getROICCalculation,
  getSalesToCapitalRatioCalculation,
  getSixToTenYrCostOfCapitalCalculation,
  getSixToTenYrRevenueGrowthCalculation,
  getSixToTenYrTaxCalculation,
} from "./expressionCalculations";

const getExpressionProperties = (expr) => {
  return { className: "equation", expr };
};

const initialData = {
  A1: { value: "" },
  A2: { value: "Revenue Growth Rate" },
  A3: { value: "Revenues" },
  A4: { value: "EBIT Margin" },
  A5: { value: "EBIT Income" },
  A6: { value: "Tax Rate" },
  A7: { value: "EBIT (1-t)" },
  A8: { value: "- Reinvestment" },
  A9: { value: "FCFF" },
  A10: { value: "NOL" },
  A11: { value: "" },
  A12: { value: "Cost of Capital" },
  A13: { value: "Cumulated Discount Factor" },
  A14: { value: "PV (FCFF)" },
  A15: { value: "" },
  A16: { value: "Sales to Capital Ratio" },
  A17: { value: "Invested Capital" },
  A18: { value: "ROIC" },
  A19: { value: "" },
  A20: { value: "Terminal Cash Flow" },
  A21: { value: "Terminal Cost of Capital" },
  A22: { value: "Terminal Value" },
  A23: { value: "PV (Terminal Value)" },
  A24: { value: "PV (CF Over Next 10 Years" },
  A25: { value: "Sum of PV" },
  A26: { value: "Probability of Failure" },
  A27: { value: "Proceeds if the Firm Fails" },
  A28: { value: "Operating Assets" },
  A29: { value: "- Debt" },
  A30: { value: "- Minority Interests" },
  A31: { value: "+ Cash" },
  A32: { value: "+ Non-Operating Assets" },
  A33: { value: "Equity" },
  A34: { value: "- Options" },
  A35: { value: "Common Stock Equity" },
  A36: { value: "Current Price" },
  A37: {
    value: "Estimated Value Per Share",
    className: "estimated-value-per-share-label",
  },
  A38: { value: "Margin of Safety" },
  B1: { value: "Base Year" },
  M1: { value: "Terminal Year" },
  B4: getExpressionProperties("=B5/B3"),
  B7: getExpressionProperties("=B5 > 0 ? B5*(1-B6) : B5"),
  B20: getExpressionProperties("=M9"),
  B21: getExpressionProperties("=M12"),
  B22: getExpressionProperties("=B20/(B21-M2)"),
  B23: getExpressionProperties("=B22*L13"),
  B24: getExpressionProperties(
    "=sum(C14, D14, E14, F14, G14, H14, I14, J14, K14, L14)"
  ),
  B25: getExpressionProperties("=B23+B24"),
  // TODO: Implement fully at a later date from inputs
  B26: getExpressionProperties("0"),
  B27: getExpressionProperties("0"),
  B28: getExpressionProperties("=B25*(1-B26)+B27*B26"),
  B33: getExpressionProperties("=B28-B29-B30+B31+B32"),
  B35: getExpressionProperties("=B33-B34"),
  B37: getExpressionProperties("=B35/{sharesOutstanding}"),
  B38: getExpressionProperties("=(B37-B36)/B37"),
  C8: getExpressionProperties("=C3 > B3 ? (C3-B3) / {salesToCapitalRatio} : 0"),
  C13: getExpressionProperties("=1/(1+C12)"),
  M18: getExpressionProperties("=L12"),
  M4: getExpressionProperties("=L4"),
  M7: getExpressionProperties("=M5*(1-M6)"),
  M8: getExpressionProperties("=M2 > 0 ? (M2 / M18) * M7 : 0"),
};

export const columns = getColumnsTo(getHighestColumn(initialData));
export const numberOfRows = getNumberOfRows(initialData);

getColumnsBetween(columns, "C", "L").forEach((column, index) => {
  const key = column + 1;

  initialData[key] = {
    readOnly: true,
    value: index + 1,
  };
});

getCellsForRows(columns, [13, 16]).forEach((key) => {
  if (key.charAt(0) !== "A") {
    initialData[key] = {
      ...initialData[key],
      type: "number",
    };
  }
});

getCellsForRows(columns, [2, 4, 6, 12, 18])
  .concat(["B21", "B26", "B38"])
  .forEach((key) => {
    if (key.charAt(0) !== "A") {
      initialData[key] = {
        ...initialData[key],
        type: "percent",
      };
    }
  });

["B36", "B37"].forEach((key) => {
  if (key.charAt(0) !== "A") {
    initialData[key] = {
      ...initialData[key],
      type: "currency",
    };
  }
});

getCellsForRows(columns, [3, 5, 7, 8, 9, 10, 14, 17])
  .concat([
    "B20",
    "B22",
    "B23",
    "B24",
    "B25",
    "B27",
    "B28",
    "B29",
    "B30",
    "B31",
    "B32",
    "B33",
    "B34",
    "B35",
  ])
  .forEach((key) => {
    if (key.charAt(0) !== "A") {
      initialData[key] = {
        ...initialData[key],
        type: "million",
      };
    }
  });

getColumnsBetween(columns, "C", "G").forEach((column) => {
  const taxKey = `${column}6`;

  initialData[taxKey].expr = getOneToFiveYrTaxCalculation(taxKey);
});

getColumnsBetween(columns, "D", "G").forEach((column) => {
  const growthKey = `${column}2`;
  const cocKey = `${column}12`;

  initialData[growthKey].expr = getOneToFiveYrRevenueGrowthCalculation(
    growthKey
  );
  initialData[cocKey].expr = getOneToFiveYrCostOfCapitalCalculation(cocKey);
});

getColumnsBetween(columns, "H", "L").forEach((column, index) => {
  const growthKey = `${column}2`;
  const taxKey = `${column}6`;
  const cocKey = `${column}12`;

  initialData[growthKey].expr = getSixToTenYrRevenueGrowthCalculation(index);
  initialData[taxKey].expr = getSixToTenYrTaxCalculation(taxKey);
  initialData[cocKey].expr = getSixToTenYrCostOfCapitalCalculation(cocKey);
});

getColumnsBetween(columns, "C", "L").forEach((column) => {
  const ebitAfterTaxKey = `${column}7`;
  const pvFCFFKey = `${column}14`;
  const investedCapKey = `${column}17`;
  const ebitMarginKey = `${column}4`;

  initialData[ebitMarginKey].expr = getEBITMarginCalculation(
    "{yearOfConvergence}",
    "{ebitTargetMarginInYearTen}",
    ebitMarginKey
  );
  initialData[ebitAfterTaxKey].expr = getEBITAfterTax(ebitAfterTaxKey);
  initialData[pvFCFFKey].expr = getPVToFCFFCalculation(pvFCFFKey);
  initialData[investedCapKey].expr = getInvestedCapitalCalculation(
    investedCapKey
  );
});

getColumnsBetween(columns, "C", "M").forEach((column) => {
  const ebitKey = `${column}5`;
  const nolKey = `${column}10`;
  const fcffKey = `${column}9`;
  const revenueKey = `${column}3`;

  initialData[ebitKey].expr = getEBITCalculation(ebitKey);
  initialData[nolKey].expr = getNOLCalculation(nolKey);
  initialData[fcffKey].expr = getFCFFCalculation(fcffKey);
  initialData[revenueKey].expr = getRevenueCalculation(revenueKey);
});

getColumnsBetween(columns, "D", "L").forEach((column) => {
  const reinvestmentKey = `${column}8`;
  const discountFactorKey = `${column}13`;
  const salesCapRatioKey = `${column}16`;

  initialData[reinvestmentKey].expr = getReinvestmentCalculation(
    reinvestmentKey
  );
  initialData[discountFactorKey].expr = getCumulatedDiscountFactorCalculation(
    discountFactorKey
  );
  initialData[salesCapRatioKey].expr = getSalesToCapitalRatioCalculation(
    salesCapRatioKey
  );
});

getColumnsBetween(columns, "B", "L").forEach((column) => {
  const roicKey = `${column}18`;

  initialData[roicKey].expr = getROICCalculation(roicKey);
});

// parent: [children]
export const dataDependentsTree = {};

Object.keys(initialData).forEach((key) => {
  const { expr } = initialData[key];

  if (expr) {
    const matches = expr.match(/([A-Z])\w+/g);
    const uniqueMatches = [...new Set(matches)];

    uniqueMatches.forEach((uniqueMatchKey) => {
      dataDependentsTree[uniqueMatchKey] = dataDependentsTree[uniqueMatchKey]
        ? [...dataDependentsTree[uniqueMatchKey], key]
        : [key];
    });
  }
});

export default initialData;
