import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import { useCallback } from "react";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import { columns, numberOfRows } from "./cells";
import {
  getColumnLetterFromCellKey,
  getColumnsBetween,
  getExpressionWithoutEqualsSign,
  getRowNumberFromCellKey,
  isExpressionDependency,
  startColumn,
} from "./utils";
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
import XLSX from "xlsx";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import FormatRawNumber from "../components/FormatRawNumber";
import selectValuationCurrencySymbol from "../selectors/selectValuationCurrencySymbol";
import selectRecentIncomeStatement from "../selectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/selectRecentBalanceSheet";
import selectPrice from "../selectors/selectPrice";

const getChunksOfArray = (array, size) =>
  array.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(array.slice(i, i + size));
    }
    return acc;
  }, []);

const formatCellValueForCSVOutput = (cell, currencySymbol) => {
  if (!cell) return cell;

  const { value, type, expr } = cell;

  const obj = {
    f: isExpressionDependency(expr)
      ? getExpressionWithoutEqualsSign(expr)
      : undefined,
  };

  if (type === "percent") {
    return {
      ...obj,
      v: value,
      z: "0.00%",
      t: "n",
    };
  }

  if (type === "million") {
    return {
      ...obj,
      v: value,
      z: `${currencySymbol}#,###,,.00`,
      t: "n",
    };
  }

  if (type === "currency") {
    return {
      ...obj,
      v: value,
      z: `${currencySymbol}#,###.00`,
      t: "n",
    };
  }

  if (type === "number") {
    return {
      ...obj,
      v: value,
      z: ".00",
      t: "n",
    };
  }

  return {
    ...obj,
    v: value,
  };
};

const formatCellValue = (cell) => {
  if (!cell) return cell;

  const { value, type } = cell;
  let node = value;

  if (type === "percent") {
    node = <FormatRawNumberToPercent value={value} />;
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

  return node;
};

const setColumnWidths = (worksheet) => {
  const newWorksheet = { ...worksheet };
  const objectMaxLength = [];
  const columns = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let index = columns.s.c; index <= columns.e.c; index++) {
    objectMaxLength.push({ width: index === 0 ? 25 : 15 });
  }

  newWorksheet["!cols"] = objectMaxLength;

  return newWorksheet;
};

const padCellKeys = (sortedCellKeys) => {
  const paddedCellKeys = [];

  sortedCellKeys.forEach((cellKey, i) => {
    paddedCellKeys.push(cellKey);

    if (!sortedCellKeys[i + 1]) return;

    const columnCharCode = getColumnLetterFromCellKey(cellKey).charCodeAt(0);
    const nextColumnCharCode = getColumnLetterFromCellKey(
      sortedCellKeys[i + 1]
    ).charCodeAt(0);

    const column = String.fromCharCode(columnCharCode);
    const isNextColumnAlphabetically =
      nextColumnCharCode === columnCharCode + 1;

    if (!isNextColumnAlphabetically && column !== "M") {
      const row = getRowNumberFromCellKey(cellKey);
      const diffInColumnsToEnd =
        parseInt("M".charCodeAt(0), 10) - columnCharCode;

      for (let index = 1; index <= diffInColumnsToEnd; index++) {
        const nextColumn = String.fromCharCode(columnCharCode + index);
        const nextCellKey = `${nextColumn}${row}`;

        paddedCellKeys.push(nextCellKey);
      }
    }
  });
  return paddedCellKeys;
};

const sortAlphaNum = (a, b) => {
  const diff = getRowNumberFromCellKey(a) - getRowNumberFromCellKey(b);

  return diff || a.localeCompare(b);
};

const numberOfColumns = 13;

const DiscountedCashFlowSheet = (props) => {
  const dispatch = useDispatch();
  const queryParams = useSelector(selectQueryParams);
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const balanceSheet = useSelector(selectRecentBalanceSheet);
  const general = useSelector((state) => state.fundamentals.data?.General);
  const corporateTaxRate = useSelector(
    (state) =>
      state.fundamentals.currentEquityRiskPremiumCountry.corporateTaxRate
  );
  const price = useSelector(selectPrice);
  const cells = useSelector((state) => state.dcf.cells);
  const costOfCapital = useSelector(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const valueOfAllOptionsOutstanding = useSelector(
    selectValueOfAllOptionsOutstanding
  );
  const valuationCurrencySymbol = useSelector(selectValuationCurrencySymbol);
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

  const cellKeysSorted = padCellKeys(Object.keys(cells).sort(sortAlphaNum));

  const chunkedData = getChunksOfArray(cellKeysSorted, numberOfColumns).map(
    (arr) => {
      return arr.map((cellKey) => {
        return formatCellValueForCSVOutput(
          cells[cellKey],
          valuationCurrencySymbol
        );
      });
    }
  );
  const worksheet = setColumnWidths(XLSX.utils.aoa_to_sheet(chunkedData));
  const workBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workBook, worksheet, "Valuation");

  useEffect(() => {
    dispatch(
      updateCells([
        ["B2", incomeStatement.totalRevenue],
        ["B4", incomeStatement.operatingIncome],
        ["B16", balanceSheet.investedCapital],
        ["B28", balanceSheet.bookValueOfDebt],
        ["B29", incomeStatement.minorityInterest],
        ["B30", balanceSheet.cashAndShortTermInvestments],
        ["B31", balanceSheet.noncontrollingInterestInConsolidatedEntity],
        ["B35", price],
        [
          "B5",
          // TODO: Change this to Base Year tax effective tax rate
          incomeStatement.pastThreeYearsAverageEffectiveTaxRate,
        ],
        ["M5", corporateTaxRate],
      ])
    );
  }, [balanceSheet, incomeStatement, corporateTaxRate, dispatch, price]);

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
        ["M7", `=IF(${riskFreeRate} > 0, (${riskFreeRate} / M17) * M6, 0)`],
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

      let node = formatCellValue(cell);

      const isOutputCell = key === "B36";

      let intent = "none";

      if (column === startColumn || rowIndex === 1) {
        intent = "primary";
      } else if (showFormulas) {
        node = cell.expr;
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
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={() => {
              setShowFormulas((state) => !state);
            }}
            variant="outlined"
          >
            {showFormulas ? "Hide Formulas" : "Show Formulas"}
          </Button>
          <Box
            sx={{
              ml: 1,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                XLSX.writeFile(
                  workBook,
                  `${general.Code}.${general.Exchange}_DCF.xlsx`
                );
              }}
            >
              Export to CSV
            </Button>
          </Box>
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
