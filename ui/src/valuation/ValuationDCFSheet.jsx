import React, { useState } from "react";
import { useSelector } from "react-redux";
import Datasheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import styles from "./ValuationDCFSheet.module.scss";
import * as mathjs from "mathjs";
import { mapValues, each } from "lodash";
import { useEffect } from "react";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import { useCallback } from "react";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import FormatRawNumber from "../components/FormatRawNumber";

const spaceRegex = /\s\s+/g;
const mockEffectiveTaxRate = 0.2;
const columnLabels = {
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
  D20: { key: "D20", value: "Value of Operating Assets" },
  D21: { key: "D21", value: "- Debt" },
  D22: { key: "D22", value: "- Minority Interests" },
  D23: { key: "D23", value: "+ Cash" },
  D24: { key: "D24", value: "+ Non-Operating Assets" },
  D25: { key: "D25", value: "Value of Equity" },
  D26: { key: "D26", value: "- Value of Options" },
  D27: { key: "D27", value: "- Value of Equity in Common Stock" },
  G20: { key: "G20", value: "Current Price" },
  G21: { key: "G21", value: "Estimated Value Per Share" },
  G22: { key: "G22", value: "Margin of Safety" },
};

const getNumberOfRows = () => {
  let highestNumberRow = 0;

  Object.values(columnLabels).forEach((cell) => {
    const currentNumber = parseInt(cell.key.replace(/[^0-9-]/, ""));

    if (currentNumber > highestNumberRow) {
      highestNumberRow = currentNumber;
    }
  });

  return highestNumberRow;
};

const generateCells = () => {
  const startColumn = "A";
  const endColumn = "M";
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

const generatedCells = generateCells();

const getColumnsBetween = (startColumn, endColumn) => {
  const columns = generatedCells.columns;
  const start = columns.indexOf(startColumn);
  const end = columns.indexOf(endColumn);

  // + 1 to make it inclusive
  return columns.slice(start, end + 1);
};

const getCellsForColumns = (columns) => {
  return columns.flatMap((column) =>
    generatedCells.rows.map((row) => column + row)
  );
};

const getCellsForRows = (rows) => {
  return rows.flatMap((row) =>
    generatedCells.columns.map((column) => column + row)
  );
};

const generateGrid = (data) => {
  const rows = [...generatedCells.rows];
  const columns = [...generatedCells.columns];

  rows.unshift(0);
  columns.unshift("");

  return rows.map((row, i) =>
    columns.map((col, j) => {
      const key = col + row;
      const datum = data[key];

      if (i === 0 && j === 0) {
        return { readOnly: true, value: "", className: "blank-cell" };
      }
      if (row === 0) {
        return { readOnly: true, value: col, className: col };
      }
      if (j === 0) {
        return { readOnly: true, value: row };
      }
      return datum;
    })
  );
};

const validateExp = (data, trailKeys, expr) => {
  let valid = true;
  const matches = expr?.match(/[A-Z][1-9]+/g) || [];
  matches.forEach((match) => {
    if (trailKeys.indexOf(match) > -1) {
      valid = false;
    } else {
      valid = validateExp(data, [...trailKeys, match], data[match].expr);
    }
  });
  return valid;
};

const computeExpr = (data, key, expr, scope) => {
  let value = null;
  if (expr?.charAt(0) !== "=") {
    return { className: "", value: expr, expr: expr };
  } else {
    try {
      value = mathjs.evaluate(expr.substring(1), scope);
    } catch (e) {
      value = null;
    }

    if (value !== null && validateExp(data, [key], expr)) {
      return { className: "equation", value, expr };
    } else {
      return { className: "error", value: "error", expr: "" };
    }
  }
};

const cellUpdate = (data, changeCell, expr) => {
  const scope = mapValues(data, (val) => {
    return val.value === "" || isNaN(val.value) ? 0 : parseFloat(val.value);
  });
  const updatedCell = {
    ...changeCell,
    ...computeExpr(data, changeCell.key, expr, scope),
  };

  data[changeCell.key] = updatedCell;

  each(data, (cell, key) => {
    if (
      cell.expr?.charAt(0) === "=" &&
      cell.expr?.indexOf(changeCell.key) > -1 &&
      key !== changeCell.key
    ) {
      data = cellUpdate(data, cell, cell.expr);
    }
  });

  return data;
};

const getInitialData = () => {
  let data = {
    ...columnLabels,
    B1: { key: "B1", value: "Base Year" },
    M1: { key: "M1", value: "Terminal Year" },
    B4: { key: "B4", value: "", expr: "=B5/B3" },
    B7: {
      key: "B7",
      value: "",
      expr: "=B5 > 0 ? B5*(1-B6) : B5",
    },
    M4: { key: "M4", value: "", expr: "=L4" },
    M7: {
      key: "M7",
      value: "",
      expr: "=M5*(1-M6)",
    },
    M8: {
      key: "M8",
      value: "",
      expr: "=M2 > 0 ? (M2 / M40) * M7 : 0",
    },
  };
  const { rows, columns } = generatedCells;

  rows.forEach((row) =>
    columns.forEach((col) => {
      const key = col + row;
      const datum = data[key];

      if (!datum) {
        data[key] = {
          key,
          value: "",
        };
      }
    })
  );

  let headerNumberColumns = {};

  getColumnsBetween("C", "L").forEach((column, index) => {
    const key = column + 1;

    headerNumberColumns[key] = {
      key,
      readOnly: true,
      value: index + 1,
    };
  });

  data = { ...data, ...headerNumberColumns };

  getCellsForRows([13, 16]).forEach((key) => {
    if (key.charAt(0) !== "A") {
      data[key] = {
        ...data[key],
        type: "number",
      };
    }
  });

  getCellsForRows([2, 4, 6, 12, 18])
    .concat(["B21", "B26", "H22"])
    .forEach((key) => {
      if (key.charAt(0) !== "A") {
        data[key] = {
          ...data[key],
          type: "percent",
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
      "E20",
      "E21",
      "E22",
      "E23",
      "E24",
      "E25",
      "E26",
      "E27",
      "H20",
      "H21",
    ])
    .forEach((key) => {
      if (key.charAt(0) !== "A") {
        data[key] = {
          ...data[key],
          type: "currency",
        };
      }
    });

  getCellsForColumns(["D", "G"]).forEach((key) => {
    if (data[key].value !== "") {
      data[key] = {
        ...data[key],
        readOnly: true,
      };
    }
  });

  getCellsForColumns(["A"])
    .concat(getCellsForRows([1]))
    .forEach((key) => {
      if (data[key].value) {
        data[key] = {
          ...data[key],
          readOnly: true,
        };
      }
    });

  return data;
};
const initialData = getInitialData();

const ValuationDCFSheet = ({
  riskFreeRate,
  costOfCapital,
  valueOfAllOptionsOutstanding,
}) => {
  const input = useSelector((state) => state.input);
  const fundamentals = useSelector((state) => state.fundamentals);
  const equityRiskPremium = useSelector((state) => state.equityRiskPremium);
  const [data, setData] = useState(initialData);

  const onCellsChanged = (changes) => {
    changes.forEach(({ cell, value }) => {
      updateCell(cell, value);
    });
  };

  const updateCell = useCallback(
    (cell, value) => {
      const newData = cellUpdate(data, cell, value?.toString());
      setData({ ...newData });
    },
    [data]
  );

  const getPreviousColumn = (cellKey) => {
    const column = cellKey.charAt(0);
    const previousColumn = String.fromCharCode(column.charCodeAt(0) - 1);

    return previousColumn;
  };

  const getEBITMarginCalculation = (cellKey) => {
    const column = cellKey.charAt(0);

    return `=${column}4 > ${input.yearOfConvergence} ? ${input.ebitTargetMarginInYearTen} : ${input.ebitTargetMarginInYearTen} -
    ((${input.ebitTargetMarginInYearTen} - C4) /
      ${input.yearOfConvergence}) *
      (${input.yearOfConvergence} - ${column}1)`.replace(spaceRegex, " ");
  };

  const getReinvestmentCalculation = (cellKey) => {
    const column = cellKey.charAt(0);
    const previousColumn = getPreviousColumn(cellKey);

    return `=(${column}3-${previousColumn}3)/${column}16`;
  };

  const getRevenueCalculation = (cellKey) => {
    const column = cellKey.charAt(0);
    const previousColumn = getPreviousColumn(cellKey);

    return `=${previousColumn}3*(1+${column}2)`;
  };

  const getEBITCalculation = (cellKey) => {
    const column = cellKey.charAt(0);

    return `=${column}4*${column}3`;
  };

  const getEBITAfterTax = (cellKey) => {
    const column = cellKey.charAt(0);
    const previousColumn = getPreviousColumn(cellKey);

    return `=${column}5 > 0 < ${previousColumn}10 ? ${column}5 : ${column}5 > 0 <= ${previousColumn}10 ? ${column}5-(${column}5-${previousColumn}10)*${column}6 : ${column}5`;
  };

  const getFCFFCalculation = (cellKey) => {
    const column = cellKey.charAt(0);

    return `=${column}7 - ${column}8`;
  };

  const getOneToFiveYrTaxCalculation = (cellKey) => {
    const previousColumn = getPreviousColumn(cellKey);

    return `=${previousColumn}6`;
  };

  const getSixToTenYrTaxCalculation = (cellKey) => {
    const previousColumn = getPreviousColumn(cellKey);

    return `=${previousColumn}6+(M6-G6)/5`;
  };

  const getOneToFiveYrRevenueGrowthCalculation = (cellKey) => {
    const previousColumn = getPreviousColumn(cellKey);

    return `=${previousColumn}2`;
  };

  const getSixToTenYrRevenueGrowthCalculation = (index) => {
    const formula = "=G2 - ((G2-M2) / 5)";
    const number = index + 1;

    return index === 0 ? formula : `${formula} * ${number}`;
  };

  const getNOLCalculation = (cellKey) => {
    const column = cellKey.charAt(0);
    const previousColumn = getPreviousColumn(cellKey);

    return `${column}5 < 0 ? ${previousColumn}10 - ${column}5 : ${previousColumn}10 > ${column}5 ? ${previousColumn}10 - ${column}5 : 0`;
  };

  const getOneToFiveYrCostOfCapitalCalculation = (cellKey) => {
    const previousColumn = getPreviousColumn(cellKey);

    return `=${previousColumn}12`;
  };

  const getSixToTenYrCostOfCapitalCalculation = (cellKey) => {
    const previousColumn = getPreviousColumn(cellKey);

    return `=${previousColumn}12-(G12-M12)/5`;
  };

  const getCumulatedDiscountFactorCalculation = (cellKey) => {
    const column = cellKey.charAt(0);
    const previousColumn = getPreviousColumn(cellKey);

    return `=${previousColumn}13*(1/(1+${column}12))`;
  };

  const getPVToFCFFCalculation = (cellKey) => {
    const column = cellKey.charAt(0);

    return `=${column}9*${column}13`;
  };

  const getSalesToCapitalRatioCalculation = (cellKey) => {
    const previousColumn = getPreviousColumn(cellKey);

    return `=${previousColumn}16`;
  };

  const getInvestedCapitalCalculation = (cellKey) => {
    const column = cellKey.charAt(0);
    const previousColumn = getPreviousColumn(cellKey);

    return `=${previousColumn}17+${column}8`;
  };

  const getROICCalculation = (cellKey) => {
    const column = cellKey.charAt(0);

    return `=${column}7/${column}17`;
  };

  useEffect(() => {
    getColumnsBetween("C", "G").forEach((column) => {
      const growthKey = `${column}2`;
      const revenueKey = `${column}6`;
      const cocKey = `${column}12`;

      updateCell(
        data[growthKey],
        getOneToFiveYrRevenueGrowthCalculation(growthKey)
      );
      updateCell(data[revenueKey], getOneToFiveYrTaxCalculation(revenueKey));
      updateCell(data[cocKey], getOneToFiveYrCostOfCapitalCalculation(cocKey));
    });

    getColumnsBetween("H", "L").forEach((column, index) => {
      const growthKey = `${column}2`;
      const taxKey = `${column}6`;
      const cocKey = `${column}12`;

      updateCell(data[growthKey], getSixToTenYrRevenueGrowthCalculation(index));
      updateCell(data[taxKey], getSixToTenYrTaxCalculation(taxKey));
      updateCell(data[cocKey], getSixToTenYrCostOfCapitalCalculation(cocKey));
    });

    getColumnsBetween("C", "L").forEach((column) => {
      const ebitKey = `${column}7`;
      const pvFCFFKey = `${column}14`;
      const investedCapKey = `${column}17`;

      updateCell(data[ebitKey], getEBITAfterTax(ebitKey));
      updateCell(data[pvFCFFKey], getPVToFCFFCalculation(pvFCFFKey));
      updateCell(
        data[investedCapKey],
        getInvestedCapitalCalculation(investedCapKey)
      );
    });

    getColumnsBetween("C", "M").forEach((column) => {
      const ebitKey = `${column}5`;
      const nolKey = `${column}10`;
      const fcffKey = `${column}9`;
      const revenueKey = `${column}3`;

      updateCell(data[ebitKey], getEBITCalculation(ebitKey));
      updateCell(data[nolKey], getNOLCalculation(nolKey));
      updateCell(data[fcffKey], getFCFFCalculation(fcffKey));
      updateCell(data[revenueKey], getRevenueCalculation(revenueKey));
    });

    getColumnsBetween("D", "L").forEach((column) => {
      const reinvestmentKey = `${column}8`;
      const discountFactorKey = `${column}13`;
      const salesCapRatioKey = `${column}16`;

      updateCell(
        data[reinvestmentKey],
        getReinvestmentCalculation(reinvestmentKey)
      );
      updateCell(
        data[discountFactorKey],
        getCumulatedDiscountFactorCalculation(discountFactorKey)
      );
      updateCell(
        data[salesCapRatioKey],
        getSalesToCapitalRatioCalculation(salesCapRatioKey)
      );
    });
    getColumnsBetween("B", "L").forEach((column) => {
      const roicKey = `${column}18`;

      updateCell(data[roicKey], getROICCalculation(roicKey));
    });
    updateCell(data.C13, "=1/(1+C12)");
    updateCell(data.M4, "=L4");
    updateCell(data.B20, "=M9");
    updateCell(data.B21, "=M12");
    updateCell(data.B22, "=B20/(B21-M2)");
    updateCell(data.B23, "=B22*L13");
    updateCell(
      data.B24,
      "=sum(C14, D14, E14, F14, G14, H14, I14, J14, K14, L14)"
    );
    updateCell(data.B25, "=B23+B24");
    // TODO: Implement fully at a later date from inputs
    updateCell(data.B25, 0);
    updateCell(data.B26, 0);
    updateCell(data.E20, "=B25*(1-B26)+B27*B26");
    updateCell(data.E25, "=E21*(1-E22)+E23*E24");
    updateCell(data.H22, "=H20/H21");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getColumnsBetween("C", "L").forEach((column) => {
      const ebitMarginKey = `${column}4`;

      updateCell(data[ebitMarginKey], getEBITMarginCalculation(ebitMarginKey));
    });
    updateCell(initialData.C2, input.cagrYearOneToFive);
    updateCell(initialData.B3, fundamentals.ttm.totalRevenue);
    updateCell(initialData.B5, fundamentals.ttm.operatingIncome);
    updateCell(initialData.B6, mockEffectiveTaxRate);
    updateCell(
      initialData.C8,
      `=C3 > B3 ? (C3-B3) / ${input.salesToCapitalRatio} : 0`
    );
    updateCell(
      initialData.M6,
      equityRiskPremium.currentCountry.corporateTaxRate
    );
    updateCell(initialData.M2, riskFreeRate);
    updateCell(initialData.C12, costOfCapital);
    updateCell(
      initialData.M12,
      equityRiskPremium.matureMarketEquityRiskPremium + riskFreeRate
    );
    updateCell(initialData.C16, input.salesToCapitalRatio);
    updateCell(initialData.B17, fundamentals.investedCapital);
    updateCell(data.E21, `=${fundamentals.currentBookValueOfDebt}`);
    updateCell(data.E22, `=${fundamentals.ttm.minorityInterest}`);
    updateCell(data.E23, `=${fundamentals.cashAndShortTermInvestments}`);
    updateCell(
      data.E23,
      `=${fundamentals.noncontrollingInterestInConsolidatedEntity}`
    );
    updateCell(data.E26, valueOfAllOptionsOutstanding);
    updateCell(data.H20, `=${fundamentals.currentPrice}`);
    updateCell(
      data.H21,
      `=E27/${fundamentals.data.SharesStats.SharesOutstanding}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    input,
    fundamentals,
    equityRiskPremium,
    riskFreeRate,
    costOfCapital,
    valueOfAllOptionsOutstanding,
  ]);

  return (
    <Datasheet
      className={styles.datasheet}
      data={generateGrid(data)}
      valueRenderer={({ value, type }) => {
        if (value === "error") return value;
        if (type === "percent")
          return <FormatRawNumberToPercent value={value} />;
        if (type === "currency")
          return <FormatRawNumberToCurrency value={value} decimalScale={0} />;
        if (type === "number")
          return <FormatRawNumber value={value} decimalScale={3} />;

        return value;
      }}
      dataRenderer={(cell) => {
        return cell.expr || cell.value || "";
      }}
      onCellsChanged={onCellsChanged}
    />
  );
};

export default ValuationDCFSheet;
