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
import { isNil, spread } from "lodash";
import parseNum from "parse-num";
import Spreadsheet from "@tracktak/web-spreadsheet";

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
const rowCells = cellKeysSorted.map((key) => {
  const cell = cells[key];

  return {
    text: cell?.expr ?? cell?.value ?? "",
  };
});

const rows = {};

getChunksOfArray(rowCells, columns.length).forEach((data, i) => {
  //if (i <= 7) {
  rows[i] = {
    cells: data,
  };
  // }
});

// https://github.com/jspreadsheet/pro/issues/35
const formatIfCellIsPercent = (spreadsheet, key) => {
  const type = cells[key]?.type;

  if (type === "percent") {
    const cell = spreadsheet.getCell(key);
    const existingValue = getRawValue(spreadsheet, key);
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

// https://github.com/jspreadsheet/pro/issues/38
const getRawValue = (spreadsheet, key) => {
  const processedValue = spreadsheet.getValue(key, true);

  return parseNum(processedValue);
};

const dcfValuationId = "dcf-valuation";

const DiscountedCashFlowTable = ({
  showFormulas,
  showYOYGrowth,
  SubscribeCover,
  loadingCells,
}) => {
  const [spreadsheet, setSpreadsheet] = useState();
  const sheet = spreadsheet?.sheet;
  const table = sheet?.table;
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
    const dcfValuationElement = document.querySelector(
      `#${dcfValuationId} .x-spreadsheet`,
    );

    if (!dcfValuationElement) {
      const spreadsheet = new Spreadsheet(`#${dcfValuationId}`).loadData([
        {
          //          freeze: ["A1:A37"],
          name: "DCF Valuation",
          // cols: {
          //   0: 220,
          // },
          rows,
        },
      ]);

      setSpreadsheet(spreadsheet);

      console.log(spreadsheet);
    }
  }, []);

  useEffect(() => {
    if (table) {
      table.setParser({
        variables: scope,
      });
    }
  }, [scope, table]);

  // useEffect(() => {
  //   // For the spreadsheet custom TT function to parse our fields
  //   window.TT = TTFormula(scope);

  //   refreshSpreadsheet(spreadsheet, hasAllRequiredInputsFilledIn);

  //   return () => {
  //     delete window.TT;
  //   };
  // }, [hasAllRequiredInputsFilledIn, scope, spreadsheet]);

  // useEffect(() => {
  //   let spreadsheet;
  //   let jspreadsheetModule;

  //   const fetchJSpreadsheet = async () => {
  //     const { default: jspreadsheet } = await import("jspreadsheet-pro");

  //     const helpers = jspreadsheet.helpers;

  //     jspreadsheetModule = jspreadsheet;

  //     if (initSpreadsheetRef.current && !initSpreadsheetRef.current.jexcel) {
  //       const cellsFormatted = {};

  //       Object.keys(cells).forEach((key) => {
  //         const cell = cells[key];

  //         cellsFormatted[key] = formatTypeToMask(currencySymbol, cell?.type);
  //       });

  //       let changedCells = {};

  //       spreadsheet = jspreadsheet(initSpreadsheetRef.current, {
  //         // https://github.com/jspreadsheet/pro/issues/38
  //         cache: false,
  //         onload: (_, spreadsheet) => {
  //           const cellsData = {};
  //           const allCells = spreadsheet.getCells();
  //           Object.keys(allCells).forEach((key) => {
  //             formatIfCellIsPercent(spreadsheet, key);
  //             let value = getRawValue(spreadsheet, key);

  //             if (cells[key]?.type === "percent") {
  //               value /= 100;
  //             }

  //             cellsData[key] = {
  //               ...cells[key],
  //               value: isFinite(value) ? value : cells[key]?.value,
  //             };
  //           });
  //           dispatch(setCells(cellsData));
  //         },
  //         onchange: (_, __, x, y, newValue) => {
  //           const key = helpers.getColumnNameFromCoords(x, y);

  //           // To make the calculations faster for sensitivity analysis we
  //           // use the values from the spreadsheet to not have to calculate them again.
  //           const cell = cells[key];
  //           if (cell) {
  //             const { type } = cell;

  //             const value = getRawValue(spreadsheet, key);

  //             const changedCell = {
  //               type,
  //               value: isFinite(value) ? value : cell.value,
  //             };
  //             if (isExpressionDependency(newValue)) {
  //               changedCell.expr = newValue;
  //             }
  //             changedCells[key] = changedCell;
  //             formatIfCellIsPercent(spreadsheet, key);
  //           }
  //         },
  //         onafterchanges: () => {
  //           dispatch(setCells(changedCells));
  //           changedCells = {};
  //         },
  //         data: chunkedData,
  //         cells: cellsFormatted,
  //         columns: columns.map((column) => {
  //           return {
  //             ...column,
  //           };
  //         }),
  //         defaultColWidth,
  //         tableWidth: "100%",
  //         tableHeight: "100%",
  //         tableOverflow: true,
  //         allowExport: false, // We manually export it to include inputs & other data
  //         secureFormulas: false, // Sanitize on the server instead
  //         license:
  //           "ZmZkMmE0ZDNlYTBlOWExZWU5ZDAwMGIyMmI0ZWE2MmUzYzg2YzIwM2QwMjQyNzU2MmJiYzJhYzgzNTUwOTc5NTZiZGExYjMxOWVkNWMyNWJhM2E5NjhmNjVhYzlhZGUxMDZjZjJjNTRhYjc5NTIyNDNlMDliZTE4OGJlODhjNGYsZXlKdVlXMWxJam9pVFdGeWRHbHVJRVJoZDNOdmJpSXNJbVJoZEdVaU9qRTJNakl4TlRZME1EQXNJbVJ2YldGcGJpSTZXeUpzYjJOaGJHaHZjM1FpTENKc2IyTmhiR2h2YzNRaVhTd2ljR3hoYmlJNk1IMD0",
  //       });

  //       setSpreadsheet(spreadsheet);
  //     }
  //   };

  //   fetchJSpreadsheet();

  //   return () => {
  //     if (spreadsheet) {
  //       jspreadsheetModule?.destroy(spreadsheet);
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (spreadsheet) {
  //     spreadsheet.options.freezeColumns = isOnMobile ? 0 : 1;
  //   }
  // }, [isOnMobile, spreadsheet]);

  // useEffect(() => {
  //   if (spreadsheet) {
  //     spreadsheet.options.editable = hasAllRequiredInputsFilledIn;

  //     if (hasAllRequiredInputsFilledIn) {
  //       spreadsheet.setData(chunkedData);
  //     } else {
  //       const labelsData = chunkedData.map((arr, i) => {
  //         if (i === 0) return arr;

  //         return [arr[0]];
  //       });

  //       spreadsheet.setData(labelsData);
  //     }
  //   }
  // }, [hasAllRequiredInputsFilledIn, spreadsheet]);

  // useEffect(() => {
  //   if (spreadsheet) {
  //     columns.forEach(({ width }, i) => {
  //       spreadsheet.setWidth(i, width);
  //     });
  //     const cells = spreadsheet.getCells();

  //     if (showFormulas) {
  //       Object.keys(cells).forEach((key) => {
  //         const cell = spreadsheet.getCell(key);
  //         const cellValue = spreadsheet.getValue(key);
  //         if (isExpressionDependency(cellValue)) {
  //           cell.innerHTML = cellValue;
  //         }
  //       });
  //       columns.forEach((_, i) => {
  //         spreadsheet.setWidth(i, 220);
  //       });
  //     } else if (showYOYGrowth) {
  //       const cellHTMLValues = {};

  //       Object.keys(cells).forEach((key) => {
  //         const currentCellValue = getRawValue(spreadsheet, key);
  //         const previousCellKey = getPreviousRowCellKey(key);
  //         const previousCellValue = getRawValue(spreadsheet, previousCellKey);
  //         if (isFinite(previousCellValue) && isFinite(currentCellValue)) {
  //           const content = renderToString(
  //             <FormatRawNumberToPercent
  //               value={
  //                 (currentCellValue - previousCellValue) / currentCellValue
  //               }
  //             />,
  //           );
  //           cellHTMLValues[key] = content;
  //         }
  //       });

  //       Object.keys(cellHTMLValues).forEach((key) => {
  //         const value = cellHTMLValues[key];
  //         const cell = spreadsheet.getCell(key);

  //         if (cell) {
  //           cell.innerHTML = value;
  //         }
  //       });
  //     } else {
  //       refreshSpreadsheet(spreadsheet, hasAllRequiredInputsFilledIn);
  //     }
  //   }
  // }, [hasAllRequiredInputsFilledIn, showFormulas, showYOYGrowth, spreadsheet]);

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
    <Box sx={{ position: "relative", width: "2000px" }}>
      <Box id={dcfValuationId} />
      {/* <Box
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
      )} */}
    </Box>
  );
};

export default DiscountedCashFlowTable;
