import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Alert, Box, useMediaQuery, useTheme, Link } from "@material-ui/core";
import useInputQueryParams from "../hooks/useInputQueryParams";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectRecentCashFlowStatement from "../selectors/fundamentalSelectors/selectRecentCashFlowStatement";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import selectSharesOutstanding from "../selectors/fundamentalSelectors/selectSharesOutstanding";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import { AnchorLink, navigate } from "../shared/gatsby";
import { useLocation } from "@reach/router";
import selectThreeAverageYearsEffectiveTaxRate from "../selectors/fundamentalSelectors/selectThreeAverageYearsEffectiveTaxRate";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import selectScope from "../selectors/dcfSelectors/selectScope";
import {
  setCells,
  setScope,
  setSheetsDatas,
  setSheetsSerializedValues,
  setSheetsValues,
} from "../redux/actions/dcfActions";
import { isNil } from "lodash-es";
import { convertFromCellIndexToLabel } from "../../../web-spreadsheet/src/core/helper";
import getSpreadsheet, {
  spreadsheetEvents,
} from "../../../web-spreadsheet/src";
import useSetURLInput from "../hooks/useSetURLInput";
import { camelCase } from "change-case";
import { allInputNameTypeMappings } from "./scopeNameTypeMapping";
import { queryNames } from "./templates/freeCashFlowFirmSimple/inputQueryNames";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import { currencySymbolMap } from "currency-symbol-map";
import { requiredInputsSheetName } from "./templates/freeCashFlowFirmSimple/expressionCalculations";
import getRequiredInputsData from "./templates/freeCashFlowFirmSimple/data/getRequiredInputsData";
import getEmployeeOptionsData from "./templates/freeCashFlowFirmSimple/data/getEmployeeOptionsData";
import getDCFValuationData from "./templates/freeCashFlowFirmSimple/data/getDCFValuationData";
import getCostOfCapitalData from "./templates/freeCashFlowFirmSimple/data/getCostOfCapitalData";
import getOptionalInputsData from "./templates/freeCashFlowFirmSimple/data/getOptionalInputsData";
import selectEstimatedCostOfDebt from "../selectors/fundamentalSelectors/selectEstimatedCostOfDebt";
import {
  FinancialPlugin,
  finTranslations,
  makeFinancialPlugin,
} from "./plugins/FinancialPlugin";
import HyperFormula from "hyperformula";

const requiredInputsId = "required-inputs";
const dcfValuationId = "dcf-valuation";
const columnAWidth = 170;
const defaultColWidth = 110;

const getDataSheets = (isOnMobile) => {
  const dataSheets = [
    getDCFValuationData(isOnMobile),
    getCostOfCapitalData(),
    getEmployeeOptionsData(),
  ];

  return dataSheets;
};

// Temporary until patterns are in the cell
// instead of formats
export const getFormats = (currencySymbol) => {
  const formats = {
    currency: {
      key: "currency",
      title: () => "Currency",
      type: "number",
      format: "currency",
      label: `${currencySymbol}10.00`,
      pattern: `"${currencySymbol}"#,##0.##`,
    },
  };

  return formats;
};

const getDatasheetsColWidths = (colWidth, isOnMobile) => {
  const dataSheets = getDataSheets(isOnMobile);
  const newDataSheets = dataSheets.map((dataSheet, datasheetIndex) => {
    const newCols = {};

    Object.values(dataSheet.rows[0].cells).forEach((_, columnIndex) => {
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

const getYOYDataSheets = (spreadsheet, isOnMobile) => {
  const dcfValuationDataSheet = getDCFValuationData(isOnMobile);
  const dataSheetsValues = spreadsheet?.hyperformula?.getAllSheetsValues();

  const formulaSheet = dataSheetsValues[dcfValuationDataSheet.name];
  const newRows = {};

  Object.keys(dcfValuationDataSheet.rows).forEach((rowKey) => {
    const cells = dcfValuationDataSheet.rows[rowKey].cells;
    const formulaRow = formulaSheet[rowKey];
    if (typeof cells === "object") {
      newRows[rowKey] = {
        ...dcfValuationDataSheet.rows[rowKey],
        cells: Object.values(cells).map((cell, i) => {
          const previousFormulaValue = formulaRow[i - 1]
            ? formulaRow[i - 1]
            : null;
          let currentFormulaValue = formulaRow[i];

          if (
            typeof previousFormulaValue === "number" &&
            typeof currentFormulaValue === "number" &&
            rowKey !== "0"
          ) {
            return {
              ...cell,
              text:
                (currentFormulaValue - previousFormulaValue) /
                currentFormulaValue,
              style: 0,
            };
          }

          return {
            ...cell,
            text: currentFormulaValue,
          };
        }),
      };
    }
  });

  const newDCFValuationDataSheet = {
    ...dcfValuationDataSheet,
    rows: newRows,
  };

  const dataSheets = getDataSheets(isOnMobile);

  dataSheets[0] = newDCFValuationDataSheet;

  return dataSheets;
};
const DiscountedCashFlowTable = ({
  showFormulas,
  showYOYGrowth,
  SubscribeCover,
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
  const ttmIncomeStatement = useSelector(selectRecentIncomeStatement);
  const ttmBalanceSheet = useSelector(selectRecentBalanceSheet);
  const ttmCashFlowStatement = useSelector(selectRecentCashFlowStatement);
  const currentEquityRiskPremium = useSelector(selectCurrentEquityRiskPremium);
  const price = useSelector(selectPrice);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const sharesOutstanding = useSelector(selectSharesOutstanding);
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();
  const pastThreeYearsAverageEffectiveTaxRate = useSelector(
    selectThreeAverageYearsEffectiveTaxRate,
  );
  const setURLInput = useSetURLInput();
  const isFocusedOnValueDrivingInputs = location.hash?.includes(
    requiredInputsId,
  );
  const currentIndustry = useSelector(selectCurrentIndustry);
  const estimatedCostOfDebt = useSelector(selectEstimatedCostOfDebt);

  useEffect(() => {
    if (isNil(inputQueryParams[queryNames.salesToCapitalRatio])) {
      setURLInput(
        queryNames.salesToCapitalRatio,
        currentIndustry["sales/Capital"],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let spreadsheet;

    const dcfValuationElement = document.getElementById(`${dcfValuationId}`);

    const width = () => {
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
    };
    const debugMode = process.env.NODE_ENV === "development";

    const options = {
      debugMode,
      col: {
        width: defaultColWidth,
      },
      formats: getFormats(currencySymbol),
      view: {
        height: () => 1210,
        width,
      },
    };

    const variablesSpreadsheetOptions = {
      debugMode,
      formats: getFormats(currencySymbol),
      view: {
        width,
      },
    };

    HyperFormula.registerFunctionPlugin(
      makeFinancialPlugin({
        incomeStatements: {
          ttm: ttmIncomeStatement,
        },
        balanceSheets: {
          ttm: ttmBalanceSheet,
        },
        cashFlowStatements: {
          ttm: ttmCashFlowStatement,
        },
        riskFreeRate,
        currentEquityRiskPremium,
        currentIndustry,
        estimatedCostOfDebt,
        pastThreeYearsAverageEffectiveTaxRate,
        price,
        sharesOutstanding,
      }),
      finTranslations,
    );

    spreadsheet = getSpreadsheet(
      dcfValuationElement,
      options,
      variablesSpreadsheetOptions,
      {
        currencySymbol: Object.values(currencySymbolMap),
      },
    );

    spreadsheet.variablesSpreadsheet.sheet.el.el.id = requiredInputsId;

    setSpreadsheet(spreadsheet);

    return () => {
      spreadsheet?.destroy();
      HyperFormula.unregisterFunctionPlugin(FinancialPlugin);
    };
  }, [
    currencySymbol,
    currentEquityRiskPremium,
    currentIndustry,
    estimatedCostOfDebt,
    pastThreeYearsAverageEffectiveTaxRate,
    price,
    riskFreeRate,
    sharesOutstanding,
    ttmBalanceSheet,
    ttmCashFlowStatement,
    ttmIncomeStatement,
  ]);

  useEffect(() => {
    const cellEditedCallback = ({ cellAddress, value }) => {
      // We will use this later to allow users to save their
      // sheets. For now it's to make it easier for us to create
      // our templates.
      if (process.env.NODE_ENV === "development") {
        console.log("datas: ", spreadsheet.getDatas());
      }

      let label = spreadsheet.hyperformula.getCellValue({
        ...cellAddress,
        col: cellAddress.col - 1,
      });

      // TODO: Remove later
      if (label) {
        if (label.includes("Operating Target Margin")) {
          label = "EBIT Target Margin in Year 10";
        }

        const urlName = camelCase(label);

        if (allInputNameTypeMappings[urlName]) {
          let newValue = value;

          setURLInput(camelCase(label), newValue);
        }
      }
    };

    if (spreadsheet) {
      spreadsheet.variablesSpreadsheet.eventEmitter.on(
        spreadsheetEvents.sheet.cellEdited,
        cellEditedCallback,
      );
    }

    return () => {
      if (spreadsheet) {
        spreadsheet.variablesSpreadsheet.eventEmitter.off(
          spreadsheetEvents.sheet.cellEdited,
          cellEditedCallback,
        );
      }
    };
  }, [setURLInput, spreadsheet]);

  useEffect(() => {
    if (spreadsheet) {
      // Disable main sheet editing on mobile for now
      // until we make mobile have better UX
      spreadsheet.setOptions({
        mode: isOnMobile ? "read" : "edit",
      });
    }
  }, [isOnMobile, spreadsheet]);

  useEffect(() => {
    if (!hasAllRequiredInputsFilledIn && spreadsheet) {
      spreadsheet.setDatasheets([]);
    }
  }, [hasAllRequiredInputsFilledIn, spreadsheet, isOnMobile]);
  useEffect(() => {
    if (spreadsheet) {
      spreadsheet.variablesSpreadsheet.setVariableDatasheets([
        getRequiredInputsData(inputQueryParams),
        getOptionalInputsData(inputQueryParams),
      ]);
    }
  }, [inputQueryParams, spreadsheet]);
  useEffect(() => {
    if (spreadsheet && hasAllRequiredInputsFilledIn && scope) {
      const dataSheets = getDataSheets(isOnMobile);

      spreadsheet.setDatasheets(dataSheets);

      const sheetName = "DCF Valuation";
      const dataSheetFormulas = spreadsheet.hyperformula.getAllSheetsFormulas();
      const dataSheetValues = spreadsheet.hyperformula.getAllSheetsValues();
      const cells = {};

      dataSheetValues[sheetName].forEach((columns, rowIndex) => {
        columns.forEach((_, columnIndex) => {
          const label = convertFromCellIndexToLabel(columnIndex, rowIndex + 1);
          const expr = dataSheetFormulas[sheetName][rowIndex][columnIndex];
          let value = dataSheetValues[sheetName][rowIndex][columnIndex];

          cells[label] = {
            ...cells[label],
            value,
            expr,
          };
        });
      });

      // TODO: Remove setCells and consolidate the others in a better place
      dispatch(setCells(cells));
      dispatch(
        setSheetsSerializedValues(
          spreadsheet.hyperformula.getAllSheetsSerialized(),
        ),
      );
      dispatch(setSheetsValues(spreadsheet.hyperformula.getAllSheetsValues()));
      dispatch(setSheetsDatas(spreadsheet.getDatas()));
    }
  }, [hasAllRequiredInputsFilledIn, isOnMobile, spreadsheet, dispatch, scope]);

  useEffect(() => {
    if (spreadsheet && hasAllRequiredInputsFilledIn && scope) {
      if (showYOYGrowth) {
        spreadsheet.setDatasheets(getYOYDataSheets(spreadsheet, isOnMobile));
      } else if (showFormulas) {
        spreadsheet.setOptions({
          showAllFormulas: true,
        });
        spreadsheet.setDatasheets(getDatasheetsColWidths(200, isOnMobile));
      } else {
        spreadsheet.setOptions({
          showAllFormulas: false,
        });
        spreadsheet.setDatasheets(getDataSheets(isOnMobile));
      }
      // TODO: refactor this cause it's terrible
      spreadsheet.sheet.switchData(spreadsheet.sheet.getDatas()[0]);
    }
  }, [
    showYOYGrowth,
    spreadsheet,
    isOnMobile,
    hasAllRequiredInputsFilledIn,
    showFormulas,
    scope,
  ]);

  useEffect(() => {
    // Dispatch only when we have all the data from the API
    if (hasAllRequiredInputsFilledIn && !isNil(price)) {
      dispatch(
        setScope({
          incomeStatements: {
            ttm: ttmIncomeStatement,
          },
          balanceSheets: {
            ttm: ttmBalanceSheet,
          },
          cashFlowStatements: {
            ttm: ttmCashFlowStatement,
          },
          riskFreeRate,
          currentEquityRiskPremium,
          currentIndustry,
          estimatedCostOfDebt,
          pastThreeYearsAverageEffectiveTaxRate,
          price,
          sharesOutstanding,
          cagrInYears_1_5: inputQueryParams[queryNames.cagrInYears_1_5],
          yearOfConvergence: inputQueryParams[queryNames.yearOfConvergence],
          ebitTargetMarginInYear_10:
            inputQueryParams[queryNames.ebitTargetMarginInYear_10],
          salesToCapitalRatio: inputQueryParams[queryNames.salesToCapitalRatio],
          nonOperatingAssets: inputQueryParams[queryNames.nonOperatingAssets],
          netOperatingLoss: inputQueryParams[queryNames.netOperatingLoss],
          probabilityOfFailure:
            inputQueryParams[queryNames.probabilityOfFailure],
          proceedsAsAPercentageOfBookValue:
            inputQueryParams[queryNames.proceedsAsAPercentageOfBookValue],
        }),
      );
    }
  }, [
    currentEquityRiskPremium,
    currentIndustry,
    dispatch,
    estimatedCostOfDebt,
    hasAllRequiredInputsFilledIn,
    inputQueryParams,
    pastThreeYearsAverageEffectiveTaxRate,
    price,
    riskFreeRate,
    sharesOutstanding,
    ttmBalanceSheet,
    ttmCashFlowStatement,
    ttmIncomeStatement,
  ]);

  const to = `${location.pathname}#${requiredInputsId}`;
  const zIndex = 100;

  return (
    <Box
      sx={{
        position: "relative",
        "& .x-spreadsheet-comment": {
          fontFamily: theme.typography.fontFamily,
        },
        "& .x-spreadsheet-variables-sheet": isFocusedOnValueDrivingInputs
          ? {
              boxShadow: `0 0 5px ${theme.palette.primary.main}`,
              border: `1px solid ${theme.palette.primary.main}`,
            }
          : {},
      }}
      ref={containerRef}
    >
      <Box id={dcfValuationId} />
      {SubscribeCover ? (
        <SubscribeCover
          sx={{
            zIndex,
          }}
        />
      ) : null}
      {!hasAllRequiredInputsFilledIn && (
        <Alert
          severity="warning"
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            zIndex,
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
            {requiredInputsSheetName.slice(0, -1)}
          </Link>
          &nbsp;cells above need to be filled out first to generate your DCF.
        </Alert>
      )}
    </Box>
  );
};

export default DiscountedCashFlowTable;
