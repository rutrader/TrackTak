import React, { useState } from "react";
import { useSelector } from "react-redux";
import Datasheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import styles from "./ValuationDCFSheet.module.scss";
import * as mathjs from "mathjs";
import { mapValues, each, pickBy } from "lodash";
import { useEffect } from "react";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import { useCallback } from "react";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";

const keyRegex = /([A-Z]+)([0-9]+)/;
const spaceRegex = /\s\s+/g;
const mockEffectiveTaxRate = 0.2;

const getColumnRowKeys = (data) => {
  const keys = Object.keys(data);
  const columns = [];
  const rows = [];
  const tempKeys = {};

  keys.forEach((key) => {
    const match = keyRegex.exec(key);
    const characters = match[1];
    const numbers = parseInt(match[2]);

    if (!tempKeys[characters]) {
      columns.push(characters);
    }

    if (!tempKeys[numbers]) {
      rows.push(numbers);
    }
    tempKeys[characters] = characters;
    tempKeys[numbers] = numbers;
  });

  return {
    columns,
    rows,
  };
};

const getCellsInRow = (data, start, end) => {
  const row = parseInt(end.charAt(1));
  const cellsInRow = pickBy(data, (value) => {
    const currentRow = parseInt(value.key.charAt(1));
    const charCode = value.key.charAt(0).charCodeAt(0);
    if (
      charCode >= start.charCodeAt(0) &&
      charCode <= end.charCodeAt(0) &&
      currentRow === row
    ) {
      return true;
    }
    return false;
  });

  return cellsInRow;
};

const generateGrid = (data) => {
  const { rows, columns } = getColumnRowKeys(data);

  rows.unshift(0);
  columns.unshift("");

  return rows.map((row, i) =>
    columns.map((col, j) => {
      if (i === 0 && j === 0) {
        return { readOnly: true, value: "" };
      }
      if (row === 0) {
        return { readOnly: true, value: col };
      }
      if (j === 0) {
        return { readOnly: true, value: row };
      }
      return data[col + row];
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

const getAllDataWithMatch = (data, regexToMatch, newDataValue) => {
  const newData = mapValues(data, (value) => {
    if (value.key.match(regexToMatch)) {
      return {
        ...value,
        ...newDataValue,
      };
    }
    return value;
  });

  return newData;
};

const getInitialData = () => {
  let data = {
    A1: { key: "A1", value: "" },
    A2: { key: "A2", value: "Revenue Growth Rate" },
    A3: { key: "A3", value: "Revenues" },
    A4: { key: "A4", value: "EBIT Margin" },
    A5: { key: "A5", value: "EBIT Income" },
    A6: { key: "A6", value: "Tax Rate" },
    A7: { key: "A7", value: "EBIT (1-t)" },
    A8: { key: "A8", value: " -Reinvestment" },
    B1: { key: "B1", value: "Base Year" },
    B2: {
      key: "B2",
      value: "",
    },
    B3: { key: "B3", value: "" },
    B4: { key: "B4", value: "", expr: "=B5/B3" },
    B5: { key: "B5", value: "" },
    B6: { key: "B6", value: "" },
    B7: { key: "B7", value: "", expr: "=B5 > 0 ? B5*(1-B6) : B5" },
    B8: { key: "B8", value: "" },
    C2: {
      key: "C2",
      value: "",
      expr: "=B2",
    },
    C3: { key: "C3", value: "", expr: "=B3*(1+C2)" },
    C4: { key: "C4", value: "" },
    C5: { key: "C5", value: "", expr: "=C4*C3" },
    C6: { key: "C6", value: "", expr: "=B6" },
    C7: {
      key: "C7",
      value: "",
      expr: "=C5 > 0 < B10 ? C5 : C5 > 0 <= B10 ? C5-(C5-B10)*C6 : C5",
    },
    C8: { key: "C8", value: "" },
    D2: {
      key: "D2",
      value: "",
      expr: "=C2",
    },
    D3: { key: "D3", value: "", expr: "=C3*(1+D2)" },
    D4: { key: "D4", value: "" },
    D5: { key: "D5", value: "", expr: "=D4*D3" },
    D6: { key: "D6", value: "", expr: "=C6" },
    D7: {
      key: "D7",
      value: "",
      expr: "=D5 > 0 < C10 ? D5 : D5 > 0 <= C10 ? D5-(D5-C10)*D6 : D5",
    },
    D8: { key: "D8", value: "", expr: "=(D3-C3)/D38" },
    E2: {
      key: "E2",
      value: "",
      expr: "=D2",
    },
    E3: { key: "E3", value: "", expr: "=D3*(1+E2)" },
    E4: { key: "E4", value: "" },
    E5: { key: "E5", value: "", expr: "=E4*E3" },
    E6: { key: "E6", value: "", expr: "=D6" },
    E7: {
      key: "E7",
      value: "",
      expr: "=E5 > 0 < D10 ? E5 : E5 > 0 <= D10 ? E5-(E5-D10)*E6 : E5",
    },
    E8: { key: "E8", value: "", expr: "=(E3-D3)/E38" },
    F2: {
      key: "F2",
      value: "",
      expr: "=E2",
    },
    F3: { key: "F3", value: "", expr: "=E3*(1+F2)" },
    F4: { key: "F4", value: "" },
    F5: { key: "F5", value: "", expr: "=F4*F3" },
    F6: { key: "F6", value: "", expr: "=E6" },
    F7: {
      key: "F7",
      value: "",
      expr: "=F5 > 0 < E10 ? F5 : F5 > 0 <= E10 ? F5-(F5-E10)*F6 : F5",
    },
    F8: { key: "F8", value: "", expr: "=(F3-E3)/F38" },
    G2: {
      key: "G2",
      value: "",
      expr: "=F2",
    },
    G3: { key: "G3", value: "", expr: "=F3*(1+G2)" },
    G4: { key: "G4", value: "" },
    G5: { key: "G5", value: "", expr: "=G4*G3" },
    G6: { key: "G6", value: "", expr: "=F6" },
    G7: {
      key: "G7",
      value: "",
      expr: "=G5 > 0 < F10 ? G5 : G5 > 0 <= F10 ? G5-(G5-F10)*G6 : G5",
    },
    G8: { key: "G8", value: "", expr: "=(G3-F3)/G38" },
    H2: {
      key: "H2",
      value: "",
      expr: "=G2-((G2-M2)/5)",
    },
    H3: { key: "H3", value: "", expr: "=G3*(1+H2)" },
    H4: { key: "H4", value: "" },
    H5: { key: "H5", value: "", expr: "=H4*H3" },
    H6: { key: "H6", value: "", expr: "=G6+(M6-G6)/5" },
    H7: {
      key: "H7",
      value: "",
      expr: "=H5 > 0 < G10 ? H5 : H5 > 0 <= G10 ? H5-(H5-G10)*H6 : H5",
    },
    H8: { key: "H8", value: "", expr: "=(H3-G3)/H38" },
    I2: {
      key: "I2",
      value: "",
      expr: "=G2-((G2-M2)/5)*2",
    },
    I3: { key: "I3", value: "", expr: "=H3*(1+I2)" },
    I4: { key: "I4", value: "" },
    I5: { key: "I5", value: "", expr: "=I4*I3" },
    I6: { key: "I6", value: "", expr: "=H6+(M6-G6)/5" },
    I7: {
      key: "I7",
      value: "",
      expr: "=I5 > 0 < H10 ? I5 : I5 > 0 <= H10 ? I5-(I5-H10)*I6 : I5",
    },
    I8: { key: "I8", value: "", expr: "=(I3-H3)/I38" },
    J2: {
      key: "J2",
      value: "",
      expr: "=G2-((G2-M2)/5)*3",
    },
    J3: { key: "J3", value: "", expr: "=I3*(1+J2)" },
    J4: { key: "J4", value: "" },
    J5: { key: "J5", value: "", expr: "=J4*J3" },
    J6: { key: "J6", value: "", expr: "=I6+(M6-G6)/5" },
    J7: {
      key: "J7",
      value: "",
      expr: "=J5 > 0 < I10 ? J5 : J5 > 0 <= I10 ? J5-(J5-I10)*J6 : J5",
    },
    J8: { key: "J8", value: "", expr: "=(J3-I3)/J38" },
    K2: {
      key: "K2",
      value: "",
      expr: "=G2-((G2-M2)/5)*4",
    },
    K3: { key: "K3", value: "", expr: "=I3*(1+K2)" },
    K4: { key: "K4", value: "" },
    K5: { key: "K5", value: "", expr: "=K4*K3" },
    K6: { key: "K6", value: "", expr: "=J6+(M6-G6)/5" },
    K7: {
      key: "K7",
      value: "",
      expr: "=K5 > 0 < J10 ? K5 : K5 > 0 <= J10 ? K5-(K5-J10)*K6 : K5",
    },
    K8: { key: "K8", value: "", expr: "=(K3-J3)/K38" },
    L2: {
      key: "L2",
      value: "",
      expr: "=G2-((G2-M2)/5)*5",
    },
    L3: { key: "L3", value: "", expr: "=K3*(1+L2)" },
    L4: { key: "L4", value: "" },
    L5: { key: "L5", value: "", expr: "=L4*L3" },
    L6: { key: "L6", value: "", expr: "=K6+(M6-G6)/5" },
    L7: {
      key: "L7",
      value: "",
      expr: "=L5 > 0 < K10 ? L5 : L5 > 0 <= K10 ? L5-(L5-K10)*L6 : L5",
    },
    L8: { key: "L8", value: "", expr: "=(L3-K3)/L38" },
    M2: {
      key: "M2",
      value: "",
      expr: "",
    },
    M3: { key: "M3", value: "", expr: "=L3*(1+M2)" },
    M4: { key: "M4", value: "", expr: "=L4" },
    M5: { key: "M5", value: "", expr: "=M4*M3" },
    M6: { key: "M6", value: "" },
    M7: {
      key: "M7",
      value: "",
      expr: "=M5*(1-M6)",
    },
    M8: { key: "M8", value: "", expr: "=M2 > 0 ? (M2 / M40) * M7 : 0" },
  };
  data = getAllDataWithMatch(data, /^A|B1/, {
    readOnly: true,
  });
  data = getAllDataWithMatch(data, /^(?!A).*2$/, {
    type: "percent",
  });
  data = getAllDataWithMatch(data, /^(?!A).*3$/, {
    type: "currency",
  });
  data = getAllDataWithMatch(data, /^(?!A).*4$/, {
    type: "percent",
  });
  data = getAllDataWithMatch(data, /^(?!A).*5$/, {
    type: "currency",
  });
  data = getAllDataWithMatch(data, /^(?!A).*6$/, {
    type: "percent",
  });
  data = getAllDataWithMatch(data, /^(?!A).*7$/, {
    type: "currency",
  });
  data = getAllDataWithMatch(data, /^(?!A).*8$/, {
    type: "currency",
  });
  let headerNumberColumns = {};
  let charCode = "C".charCodeAt(0);
  const { columns } = getColumnRowKeys(data);
  const endCharCode = charCode + columns.length - 2;

  let value = 0;
  for (; charCode < endCharCode; charCode++) {
    value += 1;
    const char = String.fromCharCode(charCode);
    headerNumberColumns[char + 1] = {
      key: char + 1,
      readOnly: true,
      value,
    };
  }
  return { ...data, ...headerNumberColumns };
};
const initialData = getInitialData();

const ValuationDCFSheet = ({ riskFreeRate }) => {
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

  const getOperatingMarginCalculation = (cell) => {
    return `=${cell} > ${input.yearOfConvergence} ? ${input.ebitTargetMarginInYearTen} : ${input.ebitTargetMarginInYearTen} -
    ((${input.ebitTargetMarginInYearTen} - B4) /
      ${input.yearOfConvergence}) *
      (${input.yearOfConvergence} - ${cell})`.replace(spaceRegex, " ");
  };

  useEffect(() => {
    updateCell(initialData.B2, input.cagrYearOneToFive);
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
    each(getCellsInRow(initialData, "C4", "L4"), (value) => {
      const column = value.key.charAt(0);

      updateCell(
        initialData[value.key],
        getOperatingMarginCalculation(`${column}1`)
      );
    });
    updateCell(initialData.M2, riskFreeRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    input,
    fundamentals.ttm.operatingIncome,
    fundamentals.ttm.totalRevenue,
    equityRiskPremium.currentCountry.corporateTaxRate,
    riskFreeRate,
  ]);

  return (
    <Datasheet
      className={styles.datasheet}
      data={generateGrid(data)}
      valueRenderer={(cell) => {
        if (cell.value === "error") return cell.value;
        if (cell.type === "percent")
          return <FormatRawNumberToPercent value={cell.value} />;
        if (cell.type === "currency")
          return (
            <FormatRawNumberToCurrency value={cell.value} decimalScale={0} />
          );
        return cell.value;
      }}
      dataRenderer={(cell) => {
        return cell.expr || cell.value || "";
      }}
      onCellsChanged={onCellsChanged}
    />
  );
};

export default ValuationDCFSheet;
