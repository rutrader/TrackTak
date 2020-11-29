import {
  getCellsForColumns,
  getCellsForRows,
  getColumnsBetween,
} from "./utils";
import {
  getCumulatedDiscountFactorCalculation,
  getEBITAfterTax,
  getEBITCalculation,
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
import { mapValues } from "lodash";

const getExpressionProperties = (cell, expr) => {
  return { key: cell, className: "equation", expr };
};

const initialData = {
  A1: { key: "A1", value: "" },
  A2: { key: "A2", value: "Revenue Growth Rate" },
  A3: { key: "A3", value: "Revenues" },
  A4: { key: "A4", value: "EBIT Margin" },
  A5: { key: "A5", value: "EBIT Income" },
  A6: { key: "A6", value: "Tax Rate" },
  A7: { key: "A7", value: "EBIT (1-t)" },
  A8: { key: "A8", value: "- Reinvestment" },
  A9: { key: "A9", value: "FCFF" },
  A10: { key: "A10", value: "NOL" },
  A11: { key: "A11", value: "" },
  A12: { key: "A12", value: "Cost of Capital" },
  A13: { key: "A13", value: "Cumulated Discount Factor" },
  A14: { key: "A14", value: "PV (FCFF)" },
  A15: { key: "A15", value: "" },
  A16: { key: "A16", value: "Sales to Capital Ratio" },
  A17: { key: "A17", value: "Invested Capital" },
  A18: { key: "A18", value: "ROIC" },
  A19: { key: "A19", value: "" },
  A20: { key: "A20", value: "Terminal Cash Flow" },
  A21: { key: "A21", value: "Terminal Cost of Capital" },
  A22: { key: "A22", value: "Terminal Value" },
  A23: { key: "A23", value: "PV (Terminal Value)" },
  A24: { key: "A24", value: "PV (CF Over Next 10 Years" },
  A25: { key: "A25", value: "Sum of PV" },
  A26: { key: "A26", value: "Probability of Failure" },
  A27: { key: "A27", value: "Proceeds if the Firm Fails" },
  A28: { key: "A28", value: "Value of Operating Assets" },
  A29: { key: "A29", value: "- Debt" },
  A30: { key: "A30", value: "- Minority Interests" },
  A31: { key: "A31", value: "+ Cash" },
  A32: { key: "A32", value: "+ Non-Operating Assets" },
  A33: { key: "A33", value: "Value of Equity" },
  A34: { key: "A34", value: "- Value of Options" },
  A35: { key: "A35", value: "- Value of Equity in Common Stock" },
  A36: { key: "A36", value: "Current Price" },
  A37: {
    key: "A37",
    value: "Estimated Value Per Share",
    className: "estimated-value-per-share-label",
  },
  A38: { key: "A38", value: "Margin of Safety" },
  B1: { key: "B1", value: "Base Year" },
  M1: { key: "M1", value: "Terminal Year" },
  B4: getExpressionProperties("B4", "=B5/B3"),
  B7: getExpressionProperties("B7", "=B5 > 0 ? B5*(1-B6) : B5"),
  B20: getExpressionProperties("B20", "=M9"),
  B21: getExpressionProperties("B21", "=M12"),
  B22: getExpressionProperties("=B20/(B21-M2)"),
  B23: getExpressionProperties("B23", "=B22*L13"),
  B24: getExpressionProperties(
    "B24",
    "=sum(C14, D14, E14, F14, G14, H14, I14, J14, K14, L14)"
  ),
  B25: getExpressionProperties("B25", "=B23+B24"),
  // TODO: Implement fully at a later date from inputs
  B26: getExpressionProperties("B26", "0"),
  B27: getExpressionProperties("B27", "0"),
  B28: getExpressionProperties("B28", "=B25*(1-B26)+B27*B26"),
  B33: getExpressionProperties("B33", "=B28-B29-B30+B31+B32"),
  B35: getExpressionProperties("B35", "=B33-B34"),
  B38: getExpressionProperties("B38", "=(B37-B36)/B37"),
  C13: getExpressionProperties("C13", "=1/(1+C12)"),
  M18: getExpressionProperties("M18", "=L12"),
  M4: getExpressionProperties("M4", "=L4"),
  M7: getExpressionProperties("M7", "=M5*(1-M6)"),
  M8: getExpressionProperties("M8", "=M2 > 0 ? (M2 / M18) * M7 : 0"),
};

const getNumberOfRows = () => {
  let highestNumberRow = 0;

  Object.values(initialData).forEach((cell) => {
    const currentNumber = parseInt(cell.key.replace(/[A-Za-z]/, ""));

    if (currentNumber > highestNumberRow) {
      highestNumberRow = currentNumber;
    }
  });

  return highestNumberRow;
};

const getHighestColumn = () => {
  let highestColumnCharCode = 0;

  Object.values(initialData).forEach((cell) => {
    const currentColumn = cell.key.replace(/[0-9]/, "");
    const charCode = currentColumn.charCodeAt(0);

    if (charCode > highestColumnCharCode) {
      highestColumnCharCode = charCode;
    }
  });

  return String.fromCharCode(highestColumnCharCode);
};

const generateCells = () => {
  const startColumn = "A";
  const endColumn = getHighestColumn();
  const startRow = 1;
  const endRow = getNumberOfRows();
  const columns = [];
  const rows = [];

  const endCharCode = endColumn.charCodeAt(0);

  for (
    let currentCharCode = startColumn.charCodeAt(0);
    currentCharCode <= endCharCode;
    currentCharCode++
  ) {
    const column = String.fromCharCode(currentCharCode);

    columns.push(column);
  }

  for (let currentRow = startRow; currentRow <= endRow; currentRow++) {
    rows.push(currentRow);
  }

  return {
    columns,
    rows,
  };
};

export const generatedCells = generateCells();

const { rows, columns } = generatedCells;

rows.forEach((row) =>
  columns.forEach((col) => {
    const key = col + row;
    const datum = initialData[key];

    if (!datum) {
      initialData[key] = {
        key,
        value: "",
      };
    }
  })
);

getColumnsBetween("C", "L").forEach((column, index) => {
  const key = column + 1;

  initialData[key] = {
    key,
    readOnly: true,
    value: index + 1,
  };
});

getCellsForRows([13, 16]).forEach((key) => {
  if (key.charAt(0) !== "A") {
    initialData[key] = {
      ...initialData[key],
      type: "number",
    };
  }
});

getCellsForRows([2, 4, 6, 12, 18])
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

getCellsForRows([3, 5, 7, 8, 9, 10, 14, 17])
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

getCellsForColumns(["D", "G"]).forEach((key) => {
  if (initialData[key].value !== "") {
    initialData[key] = {
      ...initialData[key],
      readOnly: true,
    };
  }
});

getCellsForColumns(["A"])
  .concat(getCellsForRows([1]))
  .forEach((key) => {
    if (initialData[key].value) {
      initialData[key] = {
        ...initialData[key],
        readOnly: true,
      };
    }
  });

getColumnsBetween("C", "G").forEach((column) => {
  const taxKey = `${column}6`;

  initialData[taxKey].expr = getOneToFiveYrTaxCalculation(taxKey);
});

getColumnsBetween("D", "G").forEach((column) => {
  const growthKey = `${column}2`;
  const cocKey = `${column}12`;

  initialData[growthKey].expr = getOneToFiveYrRevenueGrowthCalculation(
    growthKey
  );
  initialData[cocKey].expr = getOneToFiveYrCostOfCapitalCalculation(cocKey);
});

getColumnsBetween("H", "L").forEach((column, index) => {
  const growthKey = `${column}2`;
  const taxKey = `${column}6`;
  const cocKey = `${column}12`;

  initialData[growthKey].expr = getSixToTenYrRevenueGrowthCalculation(
    growthKey
  );
  initialData[taxKey].expr = getSixToTenYrTaxCalculation(taxKey);
  initialData[cocKey].expr = getSixToTenYrCostOfCapitalCalculation(cocKey);
});

getColumnsBetween("C", "L").forEach((column) => {
  const ebitAfterTaxKey = `${column}7`;
  const pvFCFFKey = `${column}14`;
  const investedCapKey = `${column}17`;

  initialData[ebitAfterTaxKey].expr = getEBITAfterTax(ebitAfterTaxKey);
  initialData[pvFCFFKey].expr = getPVToFCFFCalculation(pvFCFFKey);
  initialData[investedCapKey].expr = getInvestedCapitalCalculation(
    investedCapKey
  );
});

getColumnsBetween("C", "M").forEach((column) => {
  const ebitKey = `${column}5`;
  const nolKey = `${column}10`;
  const fcffKey = `${column}9`;
  const revenueKey = `${column}3`;

  initialData[ebitKey].expr = getEBITCalculation(ebitKey);
  initialData[nolKey].expr = getNOLCalculation(nolKey);
  initialData[fcffKey].expr = getFCFFCalculation(fcffKey);
  initialData[revenueKey].expr = getRevenueCalculation(revenueKey);
});

getColumnsBetween("D", "L").forEach((column) => {
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

getColumnsBetween("B", "L").forEach((column) => {
  const roicKey = `${column}18`;

  initialData[roicKey].expr = getROICCalculation(roicKey);
});

// parent: [children]
export const dataDependentsTree = {};

Object.values(initialData).forEach(({ expr, key }) => {
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
