import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { padCellKeys } from "./utils";
import { Alert, Box, useMediaQuery, useTheme, Link } from "@material-ui/core";
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
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import selectScope from "../selectors/dcfSelectors/selectScope";
import cells from "./cells";
import { setCells, setScope } from "../redux/actions/dcfActions";
import { isNil } from "lodash-es";
import Spreadsheet from "../../../web-spreadsheet/src";
import {
  convertFromCellIndexToLabel,
  formatNumberRender,
} from "../../../web-spreadsheet/src/core/helper";

const defaultColWidth = 110;
const columnAWidth = 170;

const columns = [];

for (let index = 0; index < 13; index++) {
  columns.push({ width: index === 0 ? 220 : defaultColWidth });
}

const styleMap = {
  percent: 0,
  million: 1,
  "million-currency": 2,
  currency: 3,
  number: 4,
  year: 4,
};

const cellKeysSorted = padCellKeys(Object.keys(cells).sort(sortAlphaNumeric));
const rowCells = cellKeysSorted.map((key) => {
  const cell = cells[key];

  return {
    text: cell?.expr ?? cell?.value ?? "",
    style: styleMap[cell?.type],
  };
});

const dcfValuationId = "dcf-valuation";
const getDataSheets = (isOnMobile) => {
  const rows = {};

  getChunksOfArray(rowCells, columns.length).forEach((data, i) => {
    rows[i] = {
      cells: data,
    };
  });

  const dataSheets = [
    {
      name: "DCF Valuation",
      cols: {
        0: {
          width: columnAWidth,
        },
      },
      rows,
      styles: [
        {
          format: "percent",
        },
        {
          format: "million",
        },
        {
          format: "million-currency",
        },
        {
          format: "currency",
        },
        {
          format: "number",
        },
      ],
    },
  ];

  // Do not put this as a ternary with undefined on the data
  // the moronic chinese coder is checking for existence of keys
  // so it will crash... :(
  if (!isOnMobile) {
    dataSheets[0].freeze = "B38";
  }

  return dataSheets;
};

const getDatasheetsColWidths = (colWidth, isOnMobile) => {
  const dataSheets = getDataSheets(isOnMobile);
  const newDataSheets = dataSheets.map((dataSheet, datasheetIndex) => {
    const newCols = {};

    dataSheet.rows[0].cells.forEach((_, columnIndex) => {
      newCols[columnIndex] = {
        width:
          datasheetIndex === 0 && columnIndex === 0 ? columnAWidth : colWidth,
      };
    });

    return {
      ...dataSheet,
      cols: newCols,
    };
  });

  return newDataSheets;
};

const getDatasheetsYOYGrowth = (spreadsheet, isOnMobile) => {
  const dataSheets = getDataSheets(isOnMobile);
  const dataSheetsValues = spreadsheet?.hyperFormula?.getAllSheetsValues();

  const newDataSheets = dataSheets.map((dataSheet, dataSheetIndex) => {
    const formulaSheet = dataSheetsValues[dataSheet.name];
    const newRows = {};

    Object.keys(dataSheet.rows).forEach((rowKey) => {
      const cells = dataSheet.rows[rowKey].cells;
      const formulaRow = formulaSheet[rowKey];

      newRows[rowKey] = {
        ...dataSheet.rows[rowKey],
        cells: cells.map((cell, i) => {
          const previousFormulaValue = formulaRow[i - 1]
            ? formulaRow[i - 1]
            : null;
          let currentFormulaValue = formulaRow[i];

          if (
            typeof previousFormulaValue === "number" &&
            typeof currentFormulaValue === "number" &&
            (rowKey !== "0" || dataSheetIndex !== 0)
          ) {
            return {
              ...cell,
              text:
                (currentFormulaValue - previousFormulaValue) /
                currentFormulaValue,
              style: styleMap.percent,
            };
          }

          return {
            ...cell,
            text: currentFormulaValue,
          };
        }),
      };
    });
    return {
      ...dataSheet,
      rows: newRows,
    };
  });

  return newDataSheets;
};

const DiscountedCashFlowTable = ({
  showFormulas,
  showYOYGrowth,
  SubscribeCover,
  loadingCells,
}) => {
  const containerRef = useRef();
  const [spreadsheet, setSpreadsheet] = useState();
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
    let spreadsheet;

    const dcfValuationElement = document.getElementById(`${dcfValuationId}`);

    const formats = {
      currency: {
        title: () => "Currency",
        type: "number",
        format: "currency",
        label: `${currencySymbol}10.00`,
        render: (v) => currencySymbol + formatNumberRender(v),
      },
      million: {
        title: () => "Million",
        format: "million",
        type: "number",
        label: "(000)",
        render: (v) => formatNumberRender(v) / 1000000,
      },
      "million-currency": {
        title: () => "Million Currency",
        format: "million-currency",
        type: "number",
        label: `${currencySymbol}(000)`,
        render: (v) => {
          const value = v / 1000000;

          return formats.currency.render(value);
        },
      },
    };

    spreadsheet = new Spreadsheet(dcfValuationElement, {
      col: {
        width: defaultColWidth,
      },
      formats,
      view: {
        height: () => 1050,
        width: () => {
          if (containerRef?.current) {
            const containerStyle = getComputedStyle(containerRef.current);
            const paddingX =
              parseFloat(containerStyle.paddingLeft) +
              parseFloat(containerStyle.paddingRight);
            const borderX =
              parseFloat(containerStyle.borderLeftWidth) +
              parseFloat(containerStyle.borderRightWidth);
            const elementWidth =
              containerRef.current.offsetWidth - paddingX - borderX;

            return elementWidth;
          }
        },
      },
    });

    setSpreadsheet(spreadsheet);

    return () => {
      spreadsheet?.destroy();
    };
  }, [currencySymbol]);

  useEffect(() => {
    if (!hasAllRequiredInputsFilledIn && spreadsheet) {
      spreadsheet.loadData([[]]);
    }
  }, [hasAllRequiredInputsFilledIn, spreadsheet, isOnMobile]);

  useEffect(() => {
    if (spreadsheet && hasAllRequiredInputsFilledIn && scope) {
      spreadsheet.setVariables(scope);

      const dataSheets = getDataSheets(isOnMobile);

      spreadsheet.loadData(dataSheets);

      const sheetName = "DCF Valuation";
      const dataSheetFormulas = spreadsheet.hyperFormula.getAllSheetsFormulas();
      const dataSheetValues = spreadsheet.hyperFormula.getAllSheetsValues();
      const cells = {};

      dataSheetValues[sheetName].forEach((columns, rowIndex) => {
        columns.forEach((_, columnIndex) => {
          const label = convertFromCellIndexToLabel(columnIndex, rowIndex + 1);
          const expr = dataSheetFormulas[sheetName][rowIndex][columnIndex];
          const value = dataSheetValues[sheetName][rowIndex][columnIndex];

          cells[label] = {
            ...cells[label],
            value,
            expr,
          };
        });
      });

      dispatch(setCells(cells));
    }
  }, [hasAllRequiredInputsFilledIn, isOnMobile, scope, spreadsheet, dispatch]);

  useEffect(() => {
    if (spreadsheet && hasAllRequiredInputsFilledIn) {
      if (showFormulas) {
        spreadsheet.showFormulas();
        spreadsheet.loadData(getDatasheetsColWidths(200, isOnMobile));
      } else {
        spreadsheet.hideFormulas();
        spreadsheet.loadData(getDataSheets(isOnMobile));
      }
    }
  }, [showFormulas, spreadsheet, isOnMobile, hasAllRequiredInputsFilledIn]);

  useEffect(() => {
    if (spreadsheet && hasAllRequiredInputsFilledIn) {
      if (showYOYGrowth) {
        spreadsheet.loadData(getDatasheetsYOYGrowth(spreadsheet, isOnMobile));
      } else {
        spreadsheet.loadData(getDataSheets(isOnMobile));
      }
    }
  }, [showYOYGrowth, spreadsheet, isOnMobile, hasAllRequiredInputsFilledIn]);

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
    <Box sx={{ position: "relative" }} ref={containerRef}>
      <Box
        id={dcfValuationId}
        sx={{
          pointerEvents:
            !hasAllRequiredInputsFilledIn || loadingCells ? "none" : undefined,
        }}
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
          <Link
            component={AnchorLink}
            to={to}
            onAnchorLinkClick={() => {
              navigate(to);
            }}
          >
            {valueDrivingInputsHeader}
          </Link>
          &nbsp;section above needs to be filled out first to generate the DCF.
        </Alert>
      )}
    </Box>
  );
};

export default DiscountedCashFlowTable;
