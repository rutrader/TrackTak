import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useCallback } from "react";
import { columns, numberOfRows } from "./cells";
import { startColumn } from "./utils";
import { Cell, Column, Table } from "@blueprintjs/table";
import { Alert, Box, useMediaQuery, useTheme } from "@material-ui/core";
import useInputQueryParams from "../hooks/useInputQueryParams";
import selectCostOfCapital from "../selectors/fundamentalSelectors/selectCostOfCapital";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectValueOfAllOptionsOutstanding from "../selectors/fundamentalSelectors/selectValueOfAllOptionsOutstanding";
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
import selectThreeAverageYearsEffectiveTaxRate from "../selectors/fundamentalSelectors/selectThreeAverageYearsEffectiveTaxRate";
import { Fragment } from "react";
import { calculateDCFModelThunk } from "../redux/thunks/dcfThunks";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";

const DiscountedCashFlowTable = ({
  columnWidths,
  showFormulas,
  SubscribeCover,
  loadingCells,
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
  const pastThreeYearsAverageEffectiveTaxRate = useSelector(
    selectThreeAverageYearsEffectiveTaxRate,
  );

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
        (!hasAllRequiredInputsFilledIn || loadingCells) &&
        row !== 1 &&
        column !== "A";

      if (isNil(cell?.value)) return <Cell loading={loading} />;

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

      return (
        <Cell
          style={{
            fontSize: theme.typography.fontSize,
            fontFamily: theme.typography.fontFamily,
            color: isOutputCell ? theme.palette.primary.main : "initial",
          }}
          intent={intent}
          loading={loading}
        >
          {/* Fragment here fixes this issue: https://github.com/palantir/blueprint/issues/2446 */}
          <Fragment>{node}</Fragment>
        </Cell>
      );
    },
    [
      cells,
      hasAllRequiredInputsFilledIn,
      isYoyGrowthToggled,
      loadingCells,
      showFormulas,
      theme.palette.primary.main,
      theme.typography.fontFamily,
      theme.typography.fontSize,
    ],
  );

  useEffect(() => {
    if (hasAllRequiredInputsFilledIn) {
      dispatch(
        calculateDCFModelThunk({
          matureMarketEquityRiskPremium,
          pastThreeYearsAverageEffectiveTaxRate,
          totalRevenue: incomeStatement.totalRevenue,
          operatingIncome: incomeStatement.operatingIncome,
          investedCapital: balanceSheet.investedCapital,
          bookValueOfDebt: balanceSheet.bookValueOfDebt,
          cashAndShortTermInvestments: balanceSheet.cashAndShortTermInvestments,
          minorityInterest: balanceSheet.minorityInterest,
          marginalTaxRate: currentEquityRiskPremium.marginalTaxRate,
          sharesOutstanding,
          price,
          cagrYearOneToFive: inputQueryParams.cagrYearOneToFive,
          riskFreeRate,
          yearOfConvergence: inputQueryParams.yearOfConvergence,
          ebitTargetMarginInYearTen: inputQueryParams.ebitTargetMarginInYearTen,
          totalCostOfCapital: costOfCapital.totalCostOfCapital,
          salesToCapitalRatio: inputQueryParams.salesToCapitalRatio,
          nonOperatingAssets: inputQueryParams.nonOperatingAssets,
          netOperatingLoss: inputQueryParams.netOperatingLoss,
          probabilityOfFailure: inputQueryParams.probabilityOfFailure,
          proceedsAsAPercentageOfBookValue:
            inputQueryParams.proceedsAsAPercentageOfBookValue,
          bookValueOfEquity: balanceSheet.bookValueOfEquity,
          valueOfAllOptionsOutstanding,
        }),
      );
    }
  }, [
    balanceSheet.bookValueOfDebt,
    balanceSheet.bookValueOfEquity,
    balanceSheet.cashAndShortTermInvestments,
    balanceSheet.investedCapital,
    balanceSheet.minorityInterest,
    costOfCapital.totalCostOfCapital,
    currentEquityRiskPremium.marginalTaxRate,
    dispatch,
    incomeStatement.operatingIncome,
    incomeStatement.totalRevenue,
    inputQueryParams.cagrYearOneToFive,
    inputQueryParams.ebitTargetMarginInYearTen,
    inputQueryParams.netOperatingLoss,
    inputQueryParams.probabilityOfFailure,
    inputQueryParams.proceedsAsAPercentageOfBookValue,
    inputQueryParams.salesToCapitalRatio,
    inputQueryParams.yearOfConvergence,
    pastThreeYearsAverageEffectiveTaxRate,
    price,
    riskFreeRate,
    sharesOutstanding,
    valueOfAllOptionsOutstanding,
    hasAllRequiredInputsFilledIn,
    inputQueryParams.nonOperatingAssets,
  ]);

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
      {SubscribeCover ? <SubscribeCover /> : null}
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
          &nbsp;section above needs to be filled out first to generate the DCF.
        </Alert>
      )}
    </Box>
  );
};

export default DiscountedCashFlowTable;
