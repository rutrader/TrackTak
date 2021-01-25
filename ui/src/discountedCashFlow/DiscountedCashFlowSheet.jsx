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
  doesReferenceAnotherCell,
} from "./utils";
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
import selectQueryParams, {
  inputQueries,
} from "../selectors/routerSelectors/selectQueryParams";
import selectCostOfCapital from "../selectors/fundamentalSelectors/selectCostOfCapital";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectValueOfAllOptionsOutstanding from "../selectors/fundamentalSelectors/selectValueOfAllOptionsOutstanding";
import { Link as RouterLink } from "react-router-dom";
import { updateCells } from "../redux/actions/dcfActions";
import LazyLoad from "react-lazyload";
import XLSX from "xlsx";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import FormatRawNumber from "../components/FormatRawNumber";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import selectCells from "../selectors/dcfSelectors/selectCells";
import selectSharesStats from "../selectors/fundamentalSelectors/selectSharesStats";
import selectScope from "../selectors/dcfSelectors/selectScope";
import { sentenceCase } from "change-case";

const inputsWorksheetName = "Inputs";
const valuationWorksheetName = "Valuation";

const getChunksOfArray = (array, size) =>
  array.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(array.slice(i, i + size));
    }
    return acc;
  }, []);

const formatValueForExcelOutput = (value = 0, currencySymbol, type) => {
  let newValue = value;

  // TODO: Fix properly in dcfReducer to now allow error values
  if (newValue === "error") {
    newValue = 0;
  }

  if (type === "percent") {
    return {
      v: newValue,
      z: "0.00%",
      t: "n",
    };
  }

  if (type === "million") {
    return {
      v: newValue,
      z: `${currencySymbol}#,##0,,.00`,
      t: "n",
    };
  }

  if (type === "currency") {
    return {
      v: newValue,
      z: `${currencySymbol}#,##0.00`,
      t: "n",
    };
  }

  if (type === "number") {
    return {
      v: newValue,
      z: "0.00",
      t: "n",
    };
  }

  return {
    v: newValue,
  };
};

const formatCellValueForExcelOutput = (cell, currencySymbol, scope) => {
  if (!cell) return cell;

  const { value, type, expr } = cell;

  let f;

  if (isExpressionDependency(expr)) {
    let formula = getExpressionWithoutEqualsSign(expr);

    inputQueries.forEach(({ name }, i) => {
      const row = i + 1;

      formula = formula.replaceAll(name, `${inputsWorksheetName}!B${row}`);
    });

    Object.keys(scope).forEach((key) => {
      let value = scope[key];

      if (value === undefined || value === null) {
        value = 0;
      }

      formula = formula.replaceAll(key, value);
    });

    if (doesReferenceAnotherCell(expr)) {
      f = formula;
    }
  }

  return {
    ...formatValueForExcelOutput(value, currencySymbol, type),
    f,
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
  const general = useSelector(selectGeneral);
  const currentEquityRiskPremium = useSelector(selectCurrentEquityRiskPremium);
  const price = useSelector(selectPrice);
  const cells = useSelector(selectCells);
  const costOfCapital = useSelector(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const scope = useSelector(selectScope);
  const sharesStats = useSelector(selectSharesStats);
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

  useEffect(() => {
    dispatch(
      updateCells(
        [
          "B2",
          "B4",
          "B5",
          "B16",
          "B28",
          "B29",
          "B30",
          "B31",
          "B35",
          "B36",
          "M5",
        ],
        {
          totalRevenue: incomeStatement.totalRevenue,
          operatingIncome: incomeStatement.operatingIncome,
          minorityInterest: incomeStatement.minorityInterest,
          pastThreeYearsAverageEffectiveTaxRate:
            incomeStatement.pastThreeYearsAverageEffectiveTaxRate,
          investedCapital: balanceSheet.investedCapital,
          bookValueOfDebt: balanceSheet.bookValueOfDebt,
          cashAndShortTermInvestments: balanceSheet.cashAndShortTermInvestments,
          noncontrollingInterestInConsolidatedEntity:
            balanceSheet.noncontrollingInterestInConsolidatedEntity,
          corporateTaxRate: currentEquityRiskPremium.corporateTaxRate,
          sharesOutstanding: sharesStats.SharesOutstanding,
          price,
        }
      )
    );
  }, [
    balanceSheet.bookValueOfDebt,
    balanceSheet.cashAndShortTermInvestments,
    balanceSheet.investedCapital,
    balanceSheet.noncontrollingInterestInConsolidatedEntity,
    currentEquityRiskPremium.corporateTaxRate,
    dispatch,
    incomeStatement.minorityInterest,
    incomeStatement.operatingIncome,
    incomeStatement.pastThreeYearsAverageEffectiveTaxRate,
    incomeStatement.totalRevenue,
    price,
    sharesStats.SharesOutstanding,
  ]);

  useEffect(() => {
    const cagrCellsToUpdate = getColumnsBetween(columns, "C", "L").map(
      (column) => `${column}2`
    );

    dispatch(
      updateCells(cagrCellsToUpdate, {
        cagrYearOneToFive: queryParams.cagrYearOneToFive,
        riskFreeRate,
      })
    );
  }, [dispatch, queryParams.cagrYearOneToFive, riskFreeRate]);

  useEffect(() => {
    const ebitMarginCellsToUpdate = getColumnsBetween(columns, "C", "L").map(
      (column) => `${column}3`
    );

    dispatch(
      updateCells(ebitMarginCellsToUpdate, {
        yearOfConvergence: queryParams.yearOfConvergence,
        ebitTargetMarginInYearTen: queryParams.ebitTargetMarginInYearTen,
      })
    );
  }, [
    queryParams.yearOfConvergence,
    queryParams.ebitTargetMarginInYearTen,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(
      updateCells(["C11"], {
        totalCostOfCapital: costOfCapital.totalCostOfCapital,
      })
    );
  }, [costOfCapital.totalCostOfCapital, dispatch]);

  useEffect(() => {
    dispatch(
      updateCells(["C15"], {
        salesToCapitalRatio: queryParams.salesToCapitalRatio,
      })
    );
  }, [dispatch, queryParams.salesToCapitalRatio]);

  useEffect(() => {
    dispatch(
      updateCells(["M2", "M11", "M7", "B21"], {
        riskFreeRate,
      })
    );
  }, [dispatch, riskFreeRate]);

  useEffect(() => {
    dispatch(updateCells(["B33"], { valueOfAllOptionsOutstanding }));
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

  const exportToCSVOnClick = useCallback(() => {
    const cellKeysSorted = padCellKeys(Object.keys(cells).sort(sortAlphaNum));
    const inputsData = [];

    inputQueries.forEach(({ name, type }) => {
      const value = queryParams[name];
      let newName = sentenceCase(name);

      if (type === "million") {
        newName += " (mln)";
      }

      inputsData.push(newName);
      inputsData.push(
        formatValueForExcelOutput(value, valuationCurrencySymbol, type)
      );
    });

    const valuationChunkedData = getChunksOfArray(
      cellKeysSorted,
      numberOfColumns
    ).map((arr) => {
      return arr.map((cellKey) => {
        return formatCellValueForExcelOutput(
          cells[cellKey],
          valuationCurrencySymbol,
          scope
        );
      });
    });

    const inputsWorksheet = setColumnWidths(
      XLSX.utils.aoa_to_sheet(getChunksOfArray(inputsData, 2))
    );
    const valuationOutputWorksheet = setColumnWidths(
      XLSX.utils.aoa_to_sheet(valuationChunkedData)
    );

    console.log(inputsData);
    console.log(valuationChunkedData);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workBook,
      inputsWorksheet,
      inputsWorksheetName
    );
    XLSX.utils.book_append_sheet(
      workBook,
      valuationOutputWorksheet,
      valuationWorksheetName
    );

    XLSX.writeFile(workBook, `${general.Code}.${general.Exchange}_DCF.xlsx`);
  }, [
    cells,
    general.Code,
    general.Exchange,
    queryParams,
    scope,
    valuationCurrencySymbol,
  ]);

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
            <Button variant="outlined" onClick={exportToCSVOnClick}>
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
