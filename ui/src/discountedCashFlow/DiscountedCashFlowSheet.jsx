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
import { getEBITMarginCalculation } from "./expressionCalculations";
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
import { CSVLink } from "react-csv";

const getChunksOfArray = (array, size) =>
  array.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(array.slice(i, i + size));
    }
    return acc;
  }, []);

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

  // const headerCellKeys = getCellsForRowsBetween(columns, "A", "M", [1]);
  // const headerColumns = headerCellKeys.map((cellKey) => {
  //   return cells[cellKey].value;
  // });
  // // console.log(headerCellKeys);
  // // console.log(headerColumns);

  // const dataColumns = Object.keys(cells)
  //   .filter((key) => headerCellKeys.indexOf(key) === -1)
  //   .map((key) => cells[key].value);
  // console.log(dataColumns);
  const cellKeysSorted = Object.keys(cells).sort((a, b) => {
    const aNumber = parseInt(a.replace(/[A-Za-z]/, ""));
    const bNumber = parseInt(b.replace(/[A-Za-z]/, ""));
    const aColumn = a.replace(/[0-9]/, "").charCodeAt(0);
    const bColumn = b.replace(/[0-9]/, "").charCodeAt(0);

    return 0;
  });
  console.log(cellKeysSorted);

  const chunkedData = getChunksOfArray(cellKeysSorted, 13).map((arr) => {
    return arr.map((cellKey) => cells[cellKey].value);
  });

  const csvReport = {
    data: chunkedData,
    filename: `DCF_${fundamentals.data.General.Code}.${fundamentals.data.General.Exchange}.csv`,
  };

  useEffect(() => {
    dispatch(updateCells([["B34", valueOfAllOptionsOutstanding]]));
  }, [dispatch, valueOfAllOptionsOutstanding]);

  useEffect(() => {
    dispatch(updateCells([["C12", costOfCapital.totalCostOfCapital]]));
  }, [costOfCapital.totalCostOfCapital, dispatch]);

  useEffect(() => {
    dispatch(
      updateCells([
        ["M2", riskFreeRate],
        ["M12", matureMarketEquityRiskPremium + riskFreeRate],
      ])
    );
  }, [dispatch, riskFreeRate]);

  useEffect(() => {
    dispatch(
      updateCells([
        ["B3", fundamentals.incomeStatement.totalRevenue],
        ["B5", fundamentals.incomeStatement.operatingIncome],
        ["B17", fundamentals.balanceSheet.investedCapital],
        ["B29", fundamentals.balanceSheet.bookValueOfDebt],
        ["B30", fundamentals.incomeStatement.minorityInterest],
        ["B31", fundamentals.balanceSheet.cashAndShortTermInvestments],
        [
          "B32",
          fundamentals.balanceSheet.noncontrollingInterestInConsolidatedEntity,
        ],
        ["B36", fundamentals.price],
        ["B37", `=B35/${fundamentals.data.SharesStats.SharesOutstanding}`],
        [
          "B6",
          // TODO: Change this to Base Year tax effective tax rate
          fundamentals.incomeStatement.pastThreeYearsAverageEffectiveTaxRate,
        ],
        ["M6", fundamentals.currentEquityRiskPremiumCountry.corporateTaxRate],
      ])
    );
  }, [dispatch, fundamentals]);

  useEffect(() => {
    dispatch(updateCells([["C16", queryParams.salesToCapitalRatio]]));
  }, [dispatch, queryParams.salesToCapitalRatio]);

  useEffect(() => {
    dispatch(updateCells([["C2", queryParams.cagrYearOneToFive]]));
  }, [dispatch, queryParams.cagrYearOneToFive]);

  useEffect(() => {
    const cellsToUpdate = getColumnsBetween(columns, "C", "L").map(
      (column) => `${column}4`
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
          <CSVLink {...csvReport}>
            <Button variant="outlined">Export to CSV</Button>
          </CSVLink>
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
