import React, { useMemo, useState } from "react";
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
import {
  getAllDependents,
  getColumnsBetween,
  validateExp,
  startColumn,
} from "./utils";
import { getEBITMarginCalculation } from "./expressionCalculations";
import { Cell, Column, Table } from "@blueprintjs/table";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import "../shared/blueprintTheme.scss";
import selectQueryParams from "../selectors/selectQueryParams";
import selectCostOfCapital from "../selectors/selectCostOfCapital";
import selectRiskFreeRate from "../selectors/selectRiskFreeRate";
import selectValueOfAllOptionsOutstanding from "../selectors/selectValueOfAllOptionsOutstanding";
import LazyLoad from "react-lazyload";

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

const DiscountedCashFlowSheet = (props) => {
  const queryParams = useSelector(selectQueryParams);
  const fundamentals = useSelector((state) => state.fundamentals);
  const costOfCapital = useSelector(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const valueOfAllOptionsOutstanding = useSelector(
    selectValueOfAllOptionsOutstanding
  );
  const theme = useTheme();
  const [data, setData] = useState(initialData);
  const [showFormulas, setShowFormulas] = useState(false);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const columnWidths = useMemo(() => {
    return columns.map((column) => {
      if (column === "A") {
        return 220;
      } else if (showFormulas) {
        return 200;
      }
      return props.columnWidths?.[column] ?? 120;
    });
  }, [props.columnWidths, showFormulas]);

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

  // TODO: Put all the calculations in redux so we can
  // use the estimated values elsewhere
  useEffect(() => {
    updateCell("B34", valueOfAllOptionsOutstanding);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueOfAllOptionsOutstanding]);

  useEffect(() => {
    updateCell("C12", costOfCapital.totalCostOfCapital);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costOfCapital.totalCostOfCapital]);

  useEffect(() => {
    updateCell("M2", riskFreeRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskFreeRate]);

  useEffect(() => {
    updateCell(
      "M12",
      fundamentals.matureMarketEquityRiskPremium + riskFreeRate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fundamentals.matureMarketEquityRiskPremium, riskFreeRate]);

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
    updateCell(
      "M6",
      fundamentals.currentEquityRiskPremiumCountry.corporateTaxRate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fundamentals]);

  useEffect(() => {
    updateCell("C16", queryParams.salesToCapitalRatio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.salesToCapitalRatio]);

  useEffect(() => {
    updateCell("C2", queryParams.cagrYearOneToFive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.cagrYearOneToFive]);

  useEffect(() => {
    getColumnsBetween(columns, "C", "L").forEach((column) => {
      const ebitMarginKey = `${column}4`;

      updateCell(
        ebitMarginKey,
        getEBITMarginCalculation(
          queryParams.yearOfConvergence,
          queryParams.ebitTargetMarginInYearTen,
          ebitMarginKey
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.yearOfConvergence, queryParams.ebitTargetMarginInYearTen]);

  const cellRenderer = useCallback(
    (rowIndex, columnIndex) => {
      const column = String.fromCharCode(
        startColumn.charCodeAt(0) + columnIndex
      );
      const row = (rowIndex += 1);
      const key = column + row;
      const cell = data[key];

      if (!cell?.value) return <Cell />;

      const { value, type, expr } = cell;

      let node = value;

      const isOutputCell = key === "B37";

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

      let intent = "none";

      if (column === startColumn || rowIndex === 1) {
        intent = "primary";
      } else if (showFormulas) {
        node = expr;
      }

      if (isOutputCell) {
        intent = "success";
      }

      return (
        <Cell
          style={{
            fontSize: theme.typography.fontSize,
            fontFamily: theme.typography.fontFamily,
            fontWeight: isOutputCell ? "bold" : "initial",
            color: "initial",
          }}
          intent={intent}
        >
          {node}
        </Cell>
      );
    },
    [data, showFormulas, theme.typography.fontFamily, theme.typography.fontSize]
  );

  // TODO: Add an expand button to see it full screen
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="h5">DCF Valuation</Typography>
        <Button
          onClick={() => {
            setShowFormulas((state) => !state);
          }}
          variant="outlined"
        >
          {showFormulas ? "Hide Formulas" : "Show Formulas"}
        </Button>
      </Box>
      <LazyLoad offset={300} height={810}>
        {/* Key: Hack to force re-render the table when formula state changes */}
        <Table
          key={showFormulas}
          enableGhostCells
          numFrozenColumns={isOnMobile ? 0 : 1}
          numRows={numberOfRows}
          columnWidths={columnWidths}
        >
          {columns.map((column) => {
            return (
              <Column
                key={column}
                id={column}
                name={column}
                cellRenderer={cellRenderer}
              />
            );
          })}
        </Table>
      </LazyLoad>
    </Box>
  );
};

export default DiscountedCashFlowSheet;
