import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as mathjs from "mathjs";
import { useEffect } from "react";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import { useCallback } from "react";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import initialData, {
  dataDependentsTree,
  columns,
  numberOfRows,
} from "./initialData";
import { getAllDependents, getColumnsBetween, validateExp } from "./utils";
import { getEBITMarginCalculation } from "./expressionCalculations";
import { Cell, Column, Table } from "@blueprintjs/table";
import { useTheme } from "@material-ui/core";
import "../shared/blueprintTheme.scss";
import { useLocation } from "react-router";
import parseInputQueryParams from "../shared/parseInputQueryParams";

const computeExpr = (key, expr, scope) => {
  let value = null;

  if (expr?.charAt(0) !== "=") {
    return { value: expr, expr: expr };
  } else {
    try {
      value = mathjs.evaluate(expr.substring(1), scope);
    } catch (e) {
      value = null;
    }

    if (value !== null && validateExp([key], expr)) {
      return { className: "equation", value, expr };
    } else {
      return { className: "error", value: "error", expr };
    }
  }
};

const cellUpdate = (data, key, expr) => {
  const scope = {};
  const cellToUpdate = data[key];

  Object.keys(data).forEach((key) => {
    const { value } = data[key];

    scope[key] = value === "" || isNaN(value) ? 0 : parseFloat(value);
  });

  data[key] = {
    ...cellToUpdate,
    ...computeExpr(key, expr, scope),
  };
};

const DiscountedCashFlowSheet = ({
  riskFreeRate,
  costOfCapital,
  valueOfAllOptionsOutstanding,
  columnWidths,
}) => {
  const location = useLocation();
  const inputQueryParams = parseInputQueryParams(location);
  const fundamentals = useSelector((state) => state.fundamentals);
  const equityRiskPremium = useSelector((state) => state.equityRiskPremium);
  const [data, setData] = useState(initialData);
  const theme = useTheme();

  const updateCell = useCallback(
    (key, value) => {
      const allDependents = getAllDependents(dataDependentsTree, key);

      cellUpdate(data, key, value?.toString());

      const currentDependents = allDependents[key] || [];

      currentDependents.forEach((key) => {
        const cell = data[key];

        cellUpdate(data, key, cell.expr);
      });

      setData({ ...data });
    },
    [data]
  );

  const cellRenderer = useCallback(
    (column) => (rowIndex) => {
      const row = (rowIndex += 1);
      const key = column + row;
      const cell = data[key];

      if (!cell) return <Cell />;

      const { value, type } = cell;

      let node = cell.value;

      if (type === "percent") {
        node = <FormatRawNumberToPercent value={value} decimalScale={2} />;
      }
      if (type === "million") {
        node = <FormatRawNumberToMillion value={value} useCurrencySymbol />;
      }
      if (type === "currency") {
        node = <FormatRawNumberToCurrency value={value} />;
      }
      if (type === "number") {
        node = <FormatRawNumber value={value} decimalScale={2} />;
      }

      return (
        <Cell
          style={{
            fontSize: theme.typography.fontSize,
            fontFamily: theme.typography.fontFamily,
            color: key === "B37" ? theme.palette.primary.main : "initial",
          }}
        >
          {node}
        </Cell>
      );
    },
    [data, theme]
  );

  // TODO: Put all the calculations in redux so we can
  // use the estimated values elsewhere
  useEffect(() => {
    updateCell("B34", valueOfAllOptionsOutstanding);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueOfAllOptionsOutstanding]);

  useEffect(() => {
    updateCell("C12", costOfCapital);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costOfCapital]);

  useEffect(() => {
    updateCell("M2", riskFreeRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskFreeRate]);

  useEffect(() => {
    updateCell("M6", equityRiskPremium.currentCountry.corporateTaxRate);
    updateCell(
      "M12",
      equityRiskPremium.matureMarketEquityRiskPremium + riskFreeRate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    equityRiskPremium.currentCountry.corporateTaxRate,
    equityRiskPremium.matureMarketEquityRiskPremium,
    riskFreeRate,
  ]);

  useEffect(() => {
    updateCell("B3", fundamentals.incomeStatement.totalRevenue);
    updateCell("B5", fundamentals.incomeStatement.operatingIncome);
    updateCell("B17", fundamentals.balanceSheet.investedCapital);
    updateCell("B29", fundamentals.balanceSheet.bookValueOfDebt);
    updateCell("B30", fundamentals.incomeStatement.minorityInterest);
    updateCell("B31", fundamentals.balanceSheet.cashAndShortTermInvestments);
    updateCell(
      "B32",
      fundamentals.balanceSheet.noncontrollingInterestInConsolidatedEntity
    );
    updateCell("B36", fundamentals.price);
    updateCell(
      "B37",
      `=B35/${fundamentals.data.SharesStats.SharesOutstanding}`
    );
    updateCell(
      "B6",
      fundamentals.incomeStatement.pastThreeYearsAverageEffectiveTaxRate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fundamentals.incomeStatement.totalRevenue,
    fundamentals.incomeStatement.operatingIncome,
    fundamentals.balanceSheet.investedCapital,
    fundamentals.incomeStatement.minorityInterest,
    fundamentals.balanceSheet.bookValueOfDebt,
    fundamentals.balanceSheet.cashAndShortTermInvestments,
    fundamentals.balanceSheet.noncontrollingInterestInConsolidatedEntity,
    fundamentals.price,
    fundamentals.data.SharesStats.SharesOutstanding,
    fundamentals.incomeStatement.pastThreeYearsAverageEffectiveTaxRate,
  ]);

  useEffect(() => {
    updateCell("C16", inputQueryParams.salesToCapitalRatio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputQueryParams.salesToCapitalRatio]);

  useEffect(() => {
    updateCell("C2", inputQueryParams.cagrYearOneToFive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputQueryParams.cagrYearOneToFive]);

  useEffect(() => {
    getColumnsBetween(columns, "C", "L").forEach((column) => {
      const ebitMarginKey = `${column}4`;

      updateCell(
        ebitMarginKey,
        getEBITMarginCalculation(
          inputQueryParams.yearOfConvergence,
          inputQueryParams.ebitTargetMarginInYearTen,
          ebitMarginKey
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inputQueryParams.yearOfConvergence,
    inputQueryParams.ebitTargetMarginInYearTen,
  ]);

  return (
    <Table
      enableGhostCells
      numRows={numberOfRows}
      columnWidths={columns.map((column) => {
        if (column === "A") {
          return 220;
        }
        return columnWidths?.[column] ?? 120;
      })}
    >
      {columns.map((column) => {
        return (
          <Column
            key={column}
            name={column}
            cellRenderer={cellRenderer(column)}
          />
        );
      })}
    </Table>
  );
};

export default DiscountedCashFlowSheet;