import React, { useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getPreviousRowCellKey,
  isExpressionDependency,
  padCellKeys,
} from "./utils";
import { Alert, Box, useMediaQuery, useTheme } from "@material-ui/core";
import useInputQueryParams from "../hooks/useInputQueryParams";
import selectCostOfCapital from "../selectors/fundamentalSelectors/selectCostOfCapital";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectValueOfAllOptionsOutstanding from "../selectors/fundamentalSelectors/selectValueOfAllOptionsOutstanding";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import selectSharesOutstanding from "../selectors/fundamentalSelectors/selectSharesOutstanding";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import useInjectQueryParams from "../hooks/useInjectQueryParams";
import { AnchorLink, navigate } from "../shared/gatsby";
import {
  valueDrivingInputsHeader,
  valueDrivingInputsId,
} from "../components/ValueDrivingInputs";
import { useLocation } from "@reach/router";
import selectThreeAverageYearsEffectiveTaxRate from "../selectors/fundamentalSelectors/selectThreeAverageYearsEffectiveTaxRate";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";
import sortAlphaNumeric from "./sortAlphaNumeric";
import getChunksOfArray from "../shared/getChunksOfArray";
import formatTypeToMask from "./formatTypeToMask";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import selectScope from "../selectors/dcfSelectors/selectScope";
import "jspreadsheet-pro/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import TTFormula from "./ttFormula";
import cells from "./cells";
import { setCells, setScope } from "../redux/actions/dcfActions";
import { isNil } from "lodash";

const defaultColWidth = 120;

const columns = [];

for (let index = 0; index < 13; index++) {
  columns.push({ width: index === 0 ? 220 : defaultColWidth });
}
const cellKeysSorted = padCellKeys(Object.keys(cells).sort(sortAlphaNumeric));
const data = cellKeysSorted.map((key) => {
  const cell = cells[key];

  return cell?.expr ?? cell?.value;
});
const chunkedData = getChunksOfArray(data, columns.length);

// https://github.com/jspreadsheet/pro/issues/35
const formatIfCellIsPercent = (spreadsheet, key) => {
  const type = cells[key]?.type;

  if (type === "percent") {
    const cell = spreadsheet.getCell(key);
    const existingValue = spreadsheet[key];
    const content = renderToString(
      <FormatRawNumberToPercent value={existingValue} />,
    );

    if (cell) {
      cell.innerHTML = content;
    }
  }
};

const refreshSpreadsheet = (spreadsheet, hasAllRequiredInputsFilledIn) => {
  if (spreadsheet && hasAllRequiredInputsFilledIn) {
    spreadsheet.refresh();

    const allCells = spreadsheet.getCells();

    Object.keys(allCells).forEach((key) => {
      formatIfCellIsPercent(spreadsheet, key);
    });
  }
};

const DiscountedCashFlowTable = ({
  showFormulas,
  showYOYGrowth,
  SubscribeCover,
  loadingCells,
}) => {
  const [spreadsheet, setSpreadsheet] = useState();
  const initSpreadsheetRef = useRef(null);
  const theme = useTheme();
  const location = useLocation();
  const currencySymbol = useSelector(selectValuationCurrencySymbol);
  const scope = useSelector(selectScope);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();
  const pastThreeYearsAverageEffectiveTaxRate = useSelector(
    selectThreeAverageYearsEffectiveTaxRate,
  );

  useEffect(() => {
    // For the spreadsheet custom TT function to parse our fields
    window.TT = TTFormula(scope);

    // refreshSpreadsheet(spreadsheet, hasAllRequiredInputsFilledIn);

    return () => {
      delete window.TT;
    };
  }, [hasAllRequiredInputsFilledIn, scope, spreadsheet]);

  useEffect(() => {
    let instance;
    let jspreadsheetModule;

    const fetchJSpreadsheet = async () => {
      const { default: jspreadsheet } = await import("jspreadsheet-pro");

      const helpers = jspreadsheet.helpers;

      jspreadsheetModule = jspreadsheet;

      if (initSpreadsheetRef.current && !initSpreadsheetRef.current.jexcel) {
        const cellsFormatted = {};

        Object.keys(cells).forEach((key) => {
          const cell = cells[key];

          cellsFormatted[key] = formatTypeToMask(currencySymbol, cell?.type);
        });

        let changedCells = {};

        instance = jspreadsheet(initSpreadsheetRef.current, {
          onload: (_, spreadsheet) => {
            const cellsData = {};
            const allCells = spreadsheet.getCells();
            Object.keys(allCells).forEach((key) => {
              formatIfCellIsPercent(spreadsheet, key);
              cellsData[key] = {
                ...cells[key],
                value: spreadsheet[key],
              };
            });
            dispatch(setCells(cellsData));
          },
          onchange: (_, __, x, y, newValue) => {
            const key = helpers.getColumnNameFromCoords(x, y);

            // To make the calculations faster for sensitivity analysis we
            // use the values from the spreadsheet to not have to calculate them again.
            const { type } = cells[key];
            const changedCell = {
              type,
              value: parseFloat(instance[key]),
            };
            if (isExpressionDependency(newValue)) {
              changedCell.expr = newValue;
            }
            changedCells[key] = changedCell;
            formatIfCellIsPercent(instance, key);
          },
          onafterchanges: () => {
            dispatch(setCells(changedCells));
            changedCells = {};
          },
          data: chunkedData,
          cells: cellsFormatted,
          columns: columns.map((column) => {
            return {
              ...column,
            };
          }),
          defaultColWidth,
          tableWidth: "100%",
          tableHeight: "100%",
          tableOverflow: true,
          allowExport: false, // We manually export it to include inputs & other data
          secureFormulas: false, // Sanitize on the server instead
          license:
            "ZmZkMmE0ZDNlYTBlOWExZWU5ZDAwMGIyMmI0ZWE2MmUzYzg2YzIwM2QwMjQyNzU2MmJiYzJhYzgzNTUwOTc5NTZiZGExYjMxOWVkNWMyNWJhM2E5NjhmNjVhYzlhZGUxMDZjZjJjNTRhYjc5NTIyNDNlMDliZTE4OGJlODhjNGYsZXlKdVlXMWxJam9pVFdGeWRHbHVJRVJoZDNOdmJpSXNJbVJoZEdVaU9qRTJNakl4TlRZME1EQXNJbVJ2YldGcGJpSTZXeUpzYjJOaGJHaHZjM1FpTENKc2IyTmhiR2h2YzNRaVhTd2ljR3hoYmlJNk1IMD0",
        });

        setSpreadsheet(instance);
      }
    };

    fetchJSpreadsheet();

    return () => {
      if (instance) {
        jspreadsheetModule?.destroy(instance);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (spreadsheet) {
      spreadsheet.options.freezeColumns = isOnMobile ? 0 : 1;
    }
  }, [isOnMobile, spreadsheet]);

  useEffect(() => {
    if (spreadsheet) {
      spreadsheet.options.editable = hasAllRequiredInputsFilledIn;

      if (hasAllRequiredInputsFilledIn) {
        spreadsheet.setData(chunkedData);
      } else {
        const labelsData = chunkedData.map((arr, i) => {
          if (i === 0) return arr;

          return [arr[0]];
        });

        spreadsheet.setData(labelsData);
      }
    }
  }, [hasAllRequiredInputsFilledIn, spreadsheet]);

  useEffect(() => {
    if (spreadsheet) {
      columns.forEach(({ width }, i) => {
        spreadsheet.setWidth(i, width);
      });
      const cells = spreadsheet.getCells();

      if (showFormulas) {
        Object.keys(cells).forEach((key) => {
          const cell = spreadsheet.getCell(key);
          const cellValue = spreadsheet.getValue(key);
          if (typeof cellValue === "string" && cellValue.charAt(0) === "=") {
            cell.innerHTML = cellValue;
          }
        });
        columns.forEach((_, i) => {
          spreadsheet.setWidth(i, 220);
        });
      } else if (showYOYGrowth) {
        Object.keys(cells).forEach((key) => {
          const currentCellValue = spreadsheet[key];
          const previousCellKey = getPreviousRowCellKey(key);
          const previousCellValue = spreadsheet[previousCellKey];
          const cell = spreadsheet.getCell(key);
          if (
            typeof previousCellValue === "number" &&
            cell &&
            currentCellValue
          ) {
            const content = renderToString(
              <FormatRawNumberToPercent
                value={
                  (currentCellValue - previousCellValue) / currentCellValue
                }
              />,
            );
            cell.innerHTML = content;
          }
        });
      } else {
        refreshSpreadsheet(spreadsheet, hasAllRequiredInputsFilledIn);
      }
    }
  }, [hasAllRequiredInputsFilledIn, showFormulas, showYOYGrowth, spreadsheet]);

  useEffect(() => {
    // Dispatch only when we have all the data from the API
    if (
      hasAllRequiredInputsFilledIn &&
      !isNil(price) &&
      !isNil(costOfCapital.totalCostOfCapital)
    ) {
      dispatch(
        setScope({
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

  const to = `${location.pathname}#${valueDrivingInputsId}`;

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          "& tbody": {
            "tr[data-y='0'] td:not(.jexcel_row)": {
              backgroundColor: (theme) => theme.palette.spreadsheetBackground,
            },
            "td[data-x='0']": {
              backgroundColor: (theme) => theme.palette.spreadsheetBackground,
            },
          },
        }}
        style={{ maxWidth: "100%" }}
        ref={initSpreadsheetRef}
      />
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
