import React, { useMemo, useRef } from "react";
import { renderToString } from "react-dom/server";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useCallback } from "react";
import { columns, numberOfRows, yoyGrowthCells } from "./cells";
import {
  getCellsBetween,
  getPreviousRowCellKey,
  padCellKeys,
  startColumn,
} from "./utils";
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
import sortAlphaNumeric from "./sortAlphaNumeric";
import getChunksOfArray from "../shared/getChunksOfArray";
import formatTypeToMask from "./formatTypeToMask";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import selectScope from "../selectors/dcfSelectors/selectScope";
import "jspreadsheet-pro/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";
import "./jspreadsheet.scss";
import FormatInputToPercent from "../components/FormatInputToPercent";
import scopeNameTypeMapping from "./scopeNameTypeMapping";

const license =
  "ZmZkMmE0ZDNlYTBlOWExZWU5ZDAwMGIyMmI0ZWE2MmUzYzg2YzIwM2QwMjQyNzU2MmJiYzJhYzgzNTUwOTc5NTZiZGExYjMxOWVkNWMyNWJhM2E5NjhmNjVhYzlhZGUxMDZjZjJjNTRhYjc5NTIyNDNlMDliZTE4OGJlODhjNGYsZXlKdVlXMWxJam9pVFdGeWRHbHVJRVJoZDNOdmJpSXNJbVJoZEdVaU9qRTJNakl4TlRZME1EQXNJbVJ2YldGcGJpSTZXeUpzYjJOaGJHaHZjM1FpTENKc2IyTmhiR2h2YzNRaVhTd2ljR3hoYmlJNk1IMD0";

const columnsLength = 13;
const options = {
  columns: [
    {
      width: 220,
    },
  ],
  minDimensions: [13, 37],
  license,
  defaultColWidth: 120,
  tableWidth: "100%",
  tableHeight: "100%",
  tableOverflow: true,
  tableOverflowResizable: true,
  secureFormulas: false, // Sanitize on the server instead
};

const DiscountedCashFlowTable = ({
  showFormulas,
  SubscribeCover,
  loadingCells,
}) => {
  const spreadsheet = useRef(null);
  const spreadsheetRef = useRef(null);
  const theme = useTheme();
  const location = useLocation();
  const currencySymbol = useSelector(selectValuationCurrencySymbol);
  const scope = useSelector(selectScope);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cells = useSelector(selectCells);
  const cellKeysSorted = padCellKeys(Object.keys(cells).sort(sortAlphaNumeric));
  const data = cellKeysSorted.map((cellKey) => {
    const cell = cells[cellKey];

    return cell?.expr ?? cell?.value;
  });

  let cellsFormatted = {};

  cellKeysSorted.forEach((cellKey) => {
    const cell = cells[cellKey];

    cellsFormatted[cellKey] = formatTypeToMask(currencySymbol, cell?.type);
  });

  const chunkedData = getChunksOfArray(data, columnsLength);

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
      return 120;
    });
  }, [showFormulas]);
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
    // For the spreadsheet custom TT function to parse our fields
    window.TT = (property) => {
      let value = scope[property] ?? 0;

      if (
        scopeNameTypeMapping[property] === "million" ||
        scopeNameTypeMapping[property] === "million-currency"
      ) {
        return value ? value / 1000000 : 0;
      }

      return value;
    };

    return () => {
      delete window.TT;
    };
  }, [scope]);

  useEffect(() => {
    let jspreadsheetModule;

    const fetchJSpreadsheet = async () => {
      const { default: jspreadsheet } = await import("jspreadsheet-pro");

      jspreadsheetModule = jspreadsheet;

      if (!spreadsheetRef.current.jspreadsheet) {
        const instance = jspreadsheet(spreadsheetRef.current, {
          data: chunkedData,
          cells: cellsFormatted,
          onload: (el, instance) => {
            console.log(instance);
          },
          onchange: (el, cell) => {
            console.log(cell);
          },
          ...options,
        });

        spreadsheet.current = instance;
      }
    };

    fetchJSpreadsheet();

    return () => {
      jspreadsheetModule.destroy(spreadsheet);
    };
  }, []);

  useEffect(() => {
    if (spreadsheet.current) {
      for (let index = 0; index < columnsLength; index++) {
        spreadsheet.current.setWidth(index, options.defaultColWidth);
      }

      spreadsheet.current.refresh();

      if (showFormulas) {
        const cells = spreadsheet.current.getCells();

        Object.keys(cells).forEach((cellKey) => {
          const cell = spreadsheet.current.getCell(cellKey);
          const cellValue = spreadsheet.current.getValue(cellKey);

          if (typeof cellValue === "string" && cellValue.charAt(0) === "=") {
            cell.innerHTML = cellValue;
          }
        });

        for (let index = 0; index < columnsLength; index++) {
          spreadsheet.current.setWidth(index, 220);
        }
      }

      if (isYoyGrowthToggled) {
        const cells = spreadsheet.current.getCells();

        Object.keys(cells).forEach((key) => {
          const currentCellValue = spreadsheet.current[key];
          const previousCellKey = getPreviousRowCellKey(key);
          const previousCellValue = spreadsheet.current[previousCellKey];
          const cell = spreadsheet.current.getCell(key);

          if (
            typeof previousCellValue === "number" &&
            cell &&
            currentCellValue
          ) {
            const content = renderToString(
              <FormatInputToPercent
                value={
                  (currentCellValue - previousCellValue) / currentCellValue
                }
              />,
            );

            // cell.classList.add("readonly");
            cell.innerHTML = content;
          }
        });
      }
    }
  }, [showFormulas, isYoyGrowthToggled]);

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
      <Box>
        <div ref={spreadsheetRef} />
      </Box>
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
