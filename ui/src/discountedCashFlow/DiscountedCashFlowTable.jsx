import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useCallback } from "react";
import { columns, numberOfRows } from "./cells";
import { getColumnsBetween, startColumn } from "./utils";
import { Cell, Column, Table } from "@blueprintjs/table";
import { useMediaQuery, useTheme } from "@material-ui/core";
import "../shared/blueprintTheme.scss";
import selectQueryParams from "../selectors/routerSelectors/selectQueryParams";
import selectCostOfCapital from "../selectors/fundamentalSelectors/selectCostOfCapital";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectValueOfAllOptionsOutstanding from "../selectors/fundamentalSelectors/selectValueOfAllOptionsOutstanding";
import { updateCells } from "../redux/actions/dcfActions";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import selectCells from "../selectors/dcfSelectors/selectCells";
import selectSharesStats from "../selectors/fundamentalSelectors/selectSharesStats";
import formatCellValue from "./formatCellValue";
import selectIsYoyGrowthToggled from "../selectors/dcfSelectors/selectIsYoyGrowthToggled";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";

const DiscountedCashFlowTable = ({ columnWidths, showFormulas }) => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cells = useSelector(selectCells);
  const dispatch = useDispatch();
  const queryParams = useSelector(selectQueryParams);
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const balanceSheet = useSelector(selectRecentBalanceSheet);
  const currentEquityRiskPremium = useSelector(selectCurrentEquityRiskPremium);
  const price = useSelector(selectPrice);
  const costOfCapital = useSelector(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const sharesStats = useSelector(selectSharesStats);
  const valueOfAllOptionsOutstanding = useSelector(
    selectValueOfAllOptionsOutstanding
  );
  const isYoyGrowthToggled = useSelector(selectIsYoyGrowthToggled);

  const cellColumnWidths = useMemo(() => {
    return columns.map((column) => {
      if (column === "A") {
        return 220;
      } else if (showFormulas) {
        return 200;
      }
      return columnWidths?.[column] ?? 120;
    });
  }, [columnWidths, showFormulas]);
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
      } else if (isYoyGrowthToggled && cell.yoyGrowthValue !== undefined) {
        node = <FormatRawNumberToPercent value={cell.yoyGrowthValue} />;
      }
      //TODO highlight yoy cells with diffrent colour
      // fix toggle formula
      // move dcfreducer logic to utils
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
      isYoyGrowthToggled,
      showFormulas,
      theme.typography.fontFamily,
      theme.typography.fontSize,
    ]
  );

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
      updateCells(["B9"], {
        netOperatingLoss: queryParams.netOperatingLoss,
      })
    );
  }, [dispatch, queryParams.netOperatingLoss]);

  useEffect(() => {
    dispatch(
      updateCells(["B25"], {
        probabilityOfFailure: queryParams.probabilityOfFailure,
      })
    );
  }, [dispatch, queryParams.probabilityOfFailure]);

  useEffect(() => {
    dispatch(
      updateCells(["B26"], {
        proceedsAsAPercentageOfBookValue:
          queryParams.proceedsAsAPercentageOfBookValue,
        bookValueOfDebt: balanceSheet.bookValueOfDebt,
        bookValueOfEquity: balanceSheet.bookValueOfEquity,
      })
    );
  }, [
    dispatch,
    queryParams.proceedsAsAPercentageOfBookValue,
    balanceSheet.bookValueOfDebt,
    balanceSheet.bookValueOfEquity,
  ]);

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

  // Key: Hack to force re-render the table when formula state changes
  let key = 0;

  if (showFormulas) {
    key = 1;
  }

  if (isYoyGrowthToggled) {
    key = 2;
  }

  return (
    <Table
      key={key}
      enableGhostCells
      numFrozenColumns={isOnMobile ? 0 : 1}
      numRows={numberOfRows}
      columnWidths={cellColumnWidths}
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
  );
};

export default DiscountedCashFlowTable;
