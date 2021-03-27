import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useCallback } from "react";
import { columns, numberOfRows } from "./cells";
import { getColumnsBetween, startColumn } from "./utils";
import { Cell, Column, Table } from "@blueprintjs/table";
import { Alert, Box, useMediaQuery, useTheme } from "@material-ui/core";
import useInputQueryParams from "../hooks/useInputQueryParams";
import selectCostOfCapital from "../selectors/fundamentalSelectors/selectCostOfCapital";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectValueOfAllOptionsOutstanding from "../selectors/fundamentalSelectors/selectValueOfAllOptionsOutstanding";
import { updateCells } from "../redux/actions/dcfActions";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import selectCells from "../selectors/dcfSelectors/selectCells";
import formatCellValue from "./formatCellValue";
import selectIsYoyGrowthToggled from "../selectors/dcfSelectors/selectIsYoyGrowthToggled";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import selectSharesOutstanding from "../selectors/fundamentalSelectors/selectSharesOutstanding";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import useInjectQueryParams from "../hooks/useInjectQueryParams";
import { AnchorLink, navigate } from "../shared/gatsby";
import {
  valueDrivingInputsHeader,
  valueDrivingInputsId,
} from "../components/ValueDrivingInputs";
import { useLocation } from "@reach/router";
import isNil from "lodash/isNil";

const DiscountedCashFlowTable = ({
  columnWidths,
  showFormulas,
  SubscribePopup,
}) => {
  const theme = useTheme();
  const location = useLocation();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cells = useSelector(selectCells);
  const dispatch = useDispatch();
  const inputQueryParams = useInputQueryParams();
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const balanceSheet = useSelector(selectRecentBalanceSheet);
  const currentEquityRiskPremium = useSelector(selectCurrentEquityRiskPremium);
  const price = useSelector(selectPrice);
  const costOfCapital = useInjectQueryParams(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const sharesOutstanding = useSelector(selectSharesOutstanding);
  const valueOfAllOptionsOutstanding = useInjectQueryParams(
    selectValueOfAllOptionsOutstanding,
  );
  const isYoyGrowthToggled = useSelector(selectIsYoyGrowthToggled);
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();

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
        startColumn.charCodeAt(0) + columnIndex,
      );
      const row = (rowIndex += 1);
      const key = column + row;
      const cell = cells[key];
      const loading =
        !hasAllRequiredInputsFilledIn && row !== 1 && column !== "A";

      if (!cell?.value) return <Cell loading={loading} />;

      let node = formatCellValue(cell);

      const isOutputCell = key === "B36";

      let intent = "none";

      if (column === startColumn || rowIndex === 1) {
        intent = "primary";
      } else if (showFormulas) {
        node = cell.expr;
      } else if (isYoyGrowthToggled && !isNil(cell.yoyGrowthValue)) {
        node = <FormatRawNumberToPercent value={cell.yoyGrowthValue} />;
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
          loading={loading}
        >
          {node}
        </Cell>
      );
    },
    [
      cells,
      hasAllRequiredInputsFilledIn,
      isYoyGrowthToggled,
      showFormulas,
      theme.typography.fontFamily,
      theme.typography.fontSize,
    ],
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
          marginalTaxRate: currentEquityRiskPremium.marginalTaxRate,
          sharesOutstanding,
          price,
        },
      ),
    );
  }, [
    balanceSheet.bookValueOfDebt,
    balanceSheet.cashAndShortTermInvestments,
    balanceSheet.investedCapital,
    balanceSheet.noncontrollingInterestInConsolidatedEntity,
    currentEquityRiskPremium.marginalTaxRate,
    dispatch,
    incomeStatement.minorityInterest,
    incomeStatement.operatingIncome,
    incomeStatement.pastThreeYearsAverageEffectiveTaxRate,
    incomeStatement.totalRevenue,
    price,
    sharesOutstanding,
  ]);

  useEffect(() => {
    const cagrCellsToUpdate = getColumnsBetween(columns, "C", "L").map(
      (column) => `${column}2`,
    );

    dispatch(
      updateCells(cagrCellsToUpdate, {
        cagrYearOneToFive: inputQueryParams.cagrYearOneToFive,
        riskFreeRate,
      }),
    );
  }, [dispatch, inputQueryParams.cagrYearOneToFive, riskFreeRate]);

  useEffect(() => {
    const ebitMarginCellsToUpdate = getColumnsBetween(columns, "C", "L").map(
      (column) => `${column}3`,
    );

    dispatch(
      updateCells(ebitMarginCellsToUpdate, {
        yearOfConvergence: inputQueryParams.yearOfConvergence,
        ebitTargetMarginInYearTen: inputQueryParams.ebitTargetMarginInYearTen,
      }),
    );
  }, [
    inputQueryParams.yearOfConvergence,
    inputQueryParams.ebitTargetMarginInYearTen,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(
      updateCells(["C11"], {
        totalCostOfCapital: costOfCapital.totalCostOfCapital,
      }),
    );
  }, [costOfCapital.totalCostOfCapital, dispatch]);

  useEffect(() => {
    dispatch(
      updateCells(["C15"], {
        salesToCapitalRatio: inputQueryParams.salesToCapitalRatio,
      }),
    );
  }, [dispatch, inputQueryParams.salesToCapitalRatio]);

  useEffect(() => {
    dispatch(
      updateCells(["B9"], {
        netOperatingLoss: inputQueryParams.netOperatingLoss,
      }),
    );
  }, [dispatch, inputQueryParams.netOperatingLoss]);

  useEffect(() => {
    dispatch(
      updateCells(["B25"], {
        probabilityOfFailure: inputQueryParams.probabilityOfFailure,
      }),
    );
  }, [dispatch, inputQueryParams.probabilityOfFailure]);

  useEffect(() => {
    dispatch(
      updateCells(["B26"], {
        proceedsAsAPercentageOfBookValue:
          inputQueryParams.proceedsAsAPercentageOfBookValue,
        bookValueOfDebt: balanceSheet.bookValueOfDebt,
        bookValueOfEquity: balanceSheet.bookValueOfEquity,
      }),
    );
  }, [
    dispatch,
    inputQueryParams.proceedsAsAPercentageOfBookValue,
    balanceSheet.bookValueOfDebt,
    balanceSheet.bookValueOfEquity,
  ]);

  useEffect(() => {
    dispatch(
      updateCells(["M2", "M11", "M7", "B21"], {
        riskFreeRate,
      }),
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

  const to = `${location.pathname}#${valueDrivingInputsId}`;

  return (
    <React.Fragment>
      {SubscribePopup}
      <Box sx={{ position: "relative" }}>
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
        {!hasAllRequiredInputsFilledIn && (
          <Alert
            severity="warning"
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              "& .MuiAlert-icon": {
                alignItems: "center",
              },
              "& .MuiAlert-message": {
                fontSize: 18,
              },
            }}
          >
            The&nbsp;
            <AnchorLink
              to={to}
              onAnchorLinkClick={() => {
                navigate(to);
              }}
            >
              {valueDrivingInputsHeader}
            </AnchorLink>
            &nbsp;section above needs to be filled out first to generate the
            DCF.
          </Alert>
        )}
      </Box>
    </React.Fragment>
  );
};

export default DiscountedCashFlowTable;
