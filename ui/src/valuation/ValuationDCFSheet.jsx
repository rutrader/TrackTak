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
import { useMemo } from "react";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";

const keyRegex = /([A-Z]+)([0-9]+)/;

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

const ValuationDCFSheet = () => {
  const input = useSelector((state) => state.input);
  const fundamentals = useSelector((state) => state.fundamentals);

  let initialData = useMemo(
    () => ({
      A1: { key: "A1", value: "" },
      A2: { key: "A2", value: "Revenue Growth Rate", readOnly: true },
      A3: { key: "A3", value: "Revenues", readOnly: true },
      A4: { key: "A4", value: "" },
      B1: { key: "B1", value: "Base Year", readOnly: true },
      B2: {
        key: "B2",
        value: "",
      },
      B3: { key: "B3", value: fundamentals.ttm.totalRevenue },
      B4: { key: "B4", value: "" },
      C2: {
        key: "C2",
        value: "",
        expr: "=B2",
      },
      C3: { key: "C3", value: "", expr: "=B3*(1+C2)" },
      C4: { key: "C4", value: "" },
      D2: {
        key: "D2",
        value: "",
        expr: "=C2",
      },
      D3: { key: "D3", value: "" },
      D4: { key: "D4", value: "" },
      E2: {
        key: "E2",
        value: "",
        expr: "=D2",
      },
      E3: { key: "E3", value: "" },
      E4: { key: "E4", value: "" },
    }),
    [fundamentals.ttm.totalRevenue]
  );

  let headerNumberColumns = {};
  let charCode = "C".charCodeAt(0);
  const { columns } = getColumnRowKeys(initialData);
  const endCharCode = charCode + columns.length - 2;

  let value = 0;
  for (; charCode < endCharCode; charCode++) {
    value += 1;
    const char = String.fromCharCode(charCode);
    headerNumberColumns[char + 1] = {
      readOnly: true,
      value,
    };
  }

  const [data, setData] = useState(() => {
    let matchedData = initialData;

    matchedData = getAllDataWithMatch(matchedData, /^(?!A).*2$/, {
      type: "percent",
    });
    matchedData = getAllDataWithMatch(matchedData, /^(?!A).*3$/, {
      type: "currency",
    });

    return { ...matchedData, ...headerNumberColumns };
  });

  const onCellsChanged = (changes) => {
    changes.forEach(({ cell, value }) => {
      updateCell(cell, value);
    });
  };

  const updateCell = useCallback(
    (cell, value) => {
      const newData = { ...data };
      cellUpdate(newData, cell, value?.toString());
      setData(newData);
    },
    [data]
  );

  useEffect(() => {
    updateCell(initialData.B2, input.cagrYearOneToFive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, input.cagrYearOneToFive]);

  return (
    <Datasheet
      className={styles.datasheet}
      data={generateGrid(data)}
      valueRenderer={(cell) => {
        if (cell.type === "percent")
          return <FormatRawNumberToPercent value={cell.value} />;
        if (cell.type === "currency")
          return <FormatRawNumberToCurrency value={cell.value} />;
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
