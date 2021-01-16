import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import { useCallback } from "react";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import { columns, numberOfRows } from "./cells";
import { getColumnsBetween, startColumn } from "./utils";
import {
  getEBITMarginCalculation,
  getRevenueOneToFiveYrCalculation,
  getRevenueSixToTenYrCalculation,
  getRevenueCalculation,
} from "./expressionCalculations";
import { Cell, Column, Table } from "@blueprintjs/table";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
} from "@material-ui/core";
import "../shared/blueprintTheme.scss";
import selectQueryParams from "../selectors/selectQueryParams";
import selectCostOfCapital from "../selectors/selectCostOfCapital";
import selectRiskFreeRate from "../selectors/selectRiskFreeRate";
import selectValueOfAllOptionsOutstanding from "../selectors/selectValueOfAllOptionsOutstanding";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";
import { Link as RouterLink } from "react-router-dom";
import { updateCells } from "../redux/actions/dcfActions";
import LazyLoad from "react-lazyload";

const DiscountedCashFlowSheet = (props) => {
  const dispatch = useDispatch();
  const queryParams = useSelector(selectQueryParams);
  const fundamentals = useSelector((state) => state.fundamentals);
  const cells = useSelector((state) => state.dcf.cells);
  const costOfCapital = useSelector(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const valueOfAllOptionsOutstanding = useSelector(
    selectValueOfAllOptionsOutstanding
  );
  const theme = useTheme();
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

  useEffect(() => {
    dispatch(
      updateCells([
        ["B2", fundamentals.incomeStatement.totalRevenue],
        ["B4", fundamentals.incomeStatement.operatingIncome],
        ["B16", fundamentals.balanceSheet.investedCapital],
        ["B28", fundamentals.balanceSheet.bookValueOfDebt],
        ["B29", fundamentals.incomeStatement.minorityInterest],
        ["B30", fundamentals.balanceSheet.cashAndShortTermInvestments],
        [
          "B31",
          fundamentals.balanceSheet.noncontrollingInterestInConsolidatedEntity,
        ],
        ["B35", fundamentals.price],
        ["B36", `=B34/${fundamentals.data.SharesStats.SharesOutstanding}`],
        [
          "B5",
          // TODO: Change this to Base Year tax effective tax rate
          fundamentals.incomeStatement.pastThreeYearsAverageEffectiveTaxRate,
        ],
        ["M5", fundamentals.currentEquityRiskPremiumCountry.corporateTaxRate],
      ])
    );
  }, [dispatch, fundamentals]);

  useEffect(() => {
    const revenueOneToFiveCellsToUpdate = getColumnsBetween(
      columns,
      "C",
      "G"
    ).map((column) => `${column}2`);
    const revenueSixToTenCellsToUpdate = getColumnsBetween(
      columns,
      "H",
      "L"
    ).map((column) => `${column}2`);

    dispatch(
      updateCells(
        revenueOneToFiveCellsToUpdate.map((revenueKey) => [
          revenueKey,
          getRevenueOneToFiveYrCalculation(
            queryParams.cagrYearOneToFive,
            revenueKey
          ),
        ])
      )
    );
    dispatch(
      updateCells(
        revenueSixToTenCellsToUpdate.map((revenueKey, index) => [
          revenueKey,
          getRevenueSixToTenYrCalculation(
            queryParams.cagrYearOneToFive,
            riskFreeRate,
            index,
            revenueKey
          ),
        ])
      )
    );
  }, [dispatch, queryParams.cagrYearOneToFive, riskFreeRate]);

  useEffect(() => {
    const cellsToUpdate = getColumnsBetween(columns, "C", "L").map(
      (column) => `${column}3`
    );

    dispatch(
      updateCells(
        cellsToUpdate.map((ebitMarginKey) => [
          ebitMarginKey,
          getEBITMarginCalculation(
            queryParams.yearOfConvergence,
            queryParams.ebitTargetMarginInYearTen,
            ebitMarginKey
          ),
        ])
      )
    );
  }, [
    queryParams.yearOfConvergence,
    queryParams.ebitTargetMarginInYearTen,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(updateCells([["C11", costOfCapital.totalCostOfCapital]]));
  }, [costOfCapital.totalCostOfCapital, dispatch]);

  useEffect(() => {
    dispatch(updateCells([["C15", queryParams.salesToCapitalRatio]]));
  }, [dispatch, queryParams.salesToCapitalRatio]);

  useEffect(() => {
    dispatch(
      updateCells([
        ["M2", getRevenueCalculation(riskFreeRate, "M2")],
        ["M11", matureMarketEquityRiskPremium + riskFreeRate],
        ["M7", `=${riskFreeRate} > 0 ? (${riskFreeRate} / M17) * M6 : 0`],
        ["B21", `=B19/(B20-${riskFreeRate})`],
      ])
    );
  }, [dispatch, riskFreeRate]);

  useEffect(() => {
    dispatch(updateCells([["B33", valueOfAllOptionsOutstanding]]));
  }, [dispatch, valueOfAllOptionsOutstanding]);

  const cellRenderer = useCallback(
    (rowIndex, columnIndex) => {
      const column = String.fromCharCode(
        startColumn.charCodeAt(0) + columnIndex
      );
      const row = (rowIndex += 1);
      const key = column + row;
      const cell = cells[key];

      if (!cell?.value) return <Cell />;

      const { value, type, expr } = cell;

      let node = value;

      const isOutputCell = key === "B36";

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
    [
      cells,
      showFormulas,
      theme.typography.fontFamily,
      theme.typography.fontSize,
    ]
  );

  // TODO: Add an expand button to see it full screen
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography variant="h5">DCF Valuation</Typography>
        <Box>
          <Button
            onClick={() => {
              setShowFormulas((state) => !state);
            }}
            variant="outlined"
          >
            {showFormulas ? "Hide Formulas" : "Show Formulas"}
          </Button>
          <Button variant="outlined">% YOY</Button>
        </Box>
      </Box>
      <Typography gutterBottom>
        Need help? Check out the DCF docs&nbsp;
        <Link
          component={RouterLink}
          to="/documentation"
          rel="noreferrer"
          target="_blank"
        >
          here.
        </Link>
      </Typography>
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
