import React, { useState } from "react";
import { useSelector } from "react-redux";
import Datasheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import styles from "./ValuationDCFSheet.module.scss";
import * as mathjs from "mathjs";
import { useEffect } from "react";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import { useCallback } from "react";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import initialData, { dataDependentsTree, generatedCells } from "./initialData";
import { getColumnsBetween, setAllDependents, validateExp } from "./utils";
import { getEBITMarginCalculation } from "./expressionCalculations";

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

const computeExpr = (data, key, expr, scope) => {
  let value = null;

  if (expr?.charAt(0) !== "=") {
    return { value: expr, expr: expr };
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
  const scope = {};

  Object.values(data).forEach(({ key, value }) => {
    scope[key] = value === "" || isNaN(value) ? 0 : parseFloat(value);
  });

  data[changeCell.key] = {
    ...changeCell,
    ...computeExpr(data, changeCell.key, expr, scope),
  };
};

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
      const allDependents = {};

      setAllDependents(cell.key, dataDependentsTree, allDependents);

      cellUpdate(data, cell, value?.toString());

      Object.values(allDependents).forEach((key) => {
        const cell = data[key];

        cellUpdate(data, cell, cell.expr);
      });

      setData({ ...data });
    },
    [data]
  );

  useEffect(() => {
    updateCell(initialData.B34, valueOfAllOptionsOutstanding);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueOfAllOptionsOutstanding]);

  useEffect(() => {
    updateCell(initialData.C12, costOfCapital);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costOfCapital]);

  useEffect(() => {
    updateCell(initialData.M2, riskFreeRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskFreeRate]);

  useEffect(() => {
    updateCell(
      initialData.M6,
      equityRiskPremium.currentCountry.corporateTaxRate
    );
    updateCell(
      initialData.M12,
      equityRiskPremium.matureMarketEquityRiskPremium + riskFreeRate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    equityRiskPremium.currentCountry.corporateTaxRate,
    equityRiskPremium.matureMarketEquityRiskPremium,
    input.salesToCapitalRatio,
    riskFreeRate,
  ]);

  useEffect(() => {
    updateCell(initialData.B3, fundamentals.ttm.totalRevenue);
    updateCell(initialData.B5, fundamentals.ttm.operatingIncome);
    updateCell(initialData.B17, fundamentals.investedCapital);
    updateCell(initialData.B29, fundamentals.currentBookValueOfDebt);
    updateCell(initialData.B30, fundamentals.ttm.minorityInterest);
    updateCell(initialData.B31, fundamentals.cashAndShortTermInvestments);
    updateCell(
      initialData.B32,
      `=${fundamentals.noncontrollingInterestInConsolidatedEntity}`
    );
    updateCell(initialData.B36, fundamentals.currentPrice);
    updateCell(
      initialData.B37,
      `=B35/${fundamentals.data.SharesStats.SharesOutstanding}`
    );
    updateCell(
      initialData.B6,
      fundamentals.pastThreeYearsAverageEffectiveTaxRate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fundamentals.ttm.totalRevenue,
    fundamentals.ttm.operatingIncome,
    fundamentals.investedCapital,
    fundamentals.ttm.minorityInterest,
    fundamentals.currentBookValueOfDebt,
    fundamentals.cashAndShortTermInvestments,
    fundamentals.noncontrollingInterestInConsolidatedEntity,
    fundamentals.currentPrice,
    fundamentals.data.SharesStats.SharesOutstanding,
    fundamentals.pastThreeYearsAverageEffectiveTaxRate,
  ]);

  useEffect(() => {
    updateCell(initialData.C16, input.salesToCapitalRatio);
    updateCell(
      initialData.C8,
      `=C3 > B3 ? (C3-B3) / ${input.salesToCapitalRatio} : 0`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.salesToCapitalRatio]);

  useEffect(() => {
    updateCell(data.C2, input.cagrYearOneToFive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.cagrYearOneToFive]);

  useEffect(() => {
    getColumnsBetween("C", "L").forEach((column) => {
      const ebitMarginKey = `${column}4`;
      updateCell(
        initialData[ebitMarginKey],
        getEBITMarginCalculation(
          input.yearOfConvergence,
          input.ebitTargetMarginInYearTen,
          ebitMarginKey
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.yearOfConvergence, input.ebitTargetMarginInYearTen]);

  return (
    <Datasheet
      className={styles.datasheet}
      data={generateGrid(data)}
      valueRenderer={({ value, type }) => {
        if (value === "error") return value;
        if (type === "percent")
          return <FormatRawNumberToPercent value={value} decimalScale={2} />;
        if (type === "million")
          return <FormatRawNumberToMillion value={value} useCurrencySymbol />;
        if (type === "currency")
          return <FormatRawNumberToCurrency value={value} />;
        if (type === "number")
          return <FormatRawNumber value={value} decimalScale={2} />;

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
