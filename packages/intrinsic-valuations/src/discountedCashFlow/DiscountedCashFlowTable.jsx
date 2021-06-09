import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Alert, Box, useMediaQuery, useTheme, Link } from "@material-ui/core";
import useInputQueryParams from "../hooks/useInputQueryParams";
import selectCostOfCapital from "../selectors/fundamentalSelectors/selectCostOfCapital";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import selectSharesOutstanding from "../selectors/fundamentalSelectors/selectSharesOutstanding";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import useInjectQueryParams from "../hooks/useInjectQueryParams";
import { AnchorLink, navigate } from "../shared/gatsby";
import { useLocation } from "@reach/router";
import selectThreeAverageYearsEffectiveTaxRate from "../selectors/fundamentalSelectors/selectThreeAverageYearsEffectiveTaxRate";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import selectScope from "../selectors/dcfSelectors/selectScope";
import {
  setCells,
  setScope,
  setSheetsSerializedValues,
  setSheetsValues,
} from "../redux/actions/dcfActions";
import { isNil } from "lodash-es";
import {
  convertFromCellIndexToLabel,
  formatNumberRender,
} from "../../../web-spreadsheet/src/core/helper";
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
import getVariablesData from "./templates/freeCashFlowFirmSimple/data/getVariablesData";
import getEmployeeOptionsData from "./templates/freeCashFlowFirmSimple/data/getEmployeeOptionsData";
import getDCFValuationData from "./templates/freeCashFlowFirmSimple/data/getDCFValuationData";

const requiredInputsId = "required-inputs";
const dcfValuationId = "dcf-valuation";
const columnAWidth = 170;
const defaultColWidth = 110;
const million = 1000000;

const getDataSheets = (isOnMobile) => {
  const dataSheets = [
    getDCFValuationData(isOnMobile),
    getEmployeeOptionsData(),
  ];

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
  const dataSheetsValues = spreadsheet?.hyperformula?.getAllSheetsValues();

  const newDataSheets = dataSheets.map((dataSheet, dataSheetIndex) => {
    const formulaSheet = dataSheetsValues[dataSheet.name];
    const newRows = {};

    Object.keys(dataSheet.rows).forEach((rowKey) => {
      const cells = dataSheet.rows[rowKey].cells;
      const formulaRow = formulaSheet[rowKey];
      if (Array.isArray(cells)) {
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
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();
  const pastThreeYearsAverageEffectiveTaxRate = useSelector(
    selectThreeAverageYearsEffectiveTaxRate,
  );
  const setURLInput = useSetURLInput();
  const isFocusedOnValueDrivingInputs = location.hash?.includes(
    requiredInputsId,
  );
  const currentIndustry = useSelector(selectCurrentIndustry);

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

    const formats = {
      currency: {
        key: "currency",
        title: () => "Currency",
        type: "number",
        format: "currency",
        label: `${currencySymbol}10.00`,
        editRender: (v) => {
          if (v.toString().charAt(0) === currencySymbol) {
            return v;
          }

          let text = parseFloat(v, 10);

          if (isNaN(text)) return v;

          text = v.toString();

          return !text.includes(currencySymbol) ? currencySymbol + text : v;
        },
        render: (v) => {
          if (isNil(v) || v === "") return "";

          return currencySymbol + formatNumberRender(v);
        },
      },
      million: {
        key: "million",
        title: () => "Million",
        format: "million",
        type: "number",
        label: "(000)",
        editRender: (v, state) => {
          let number = parseFloat(v, 10);

          if (isNaN(number)) return v;

          if (state === "start") {
            return (number / million).toString();
          }

          if (state === "startInput" || state === "finished") {
            return number * million.toString();
          }

          return v.toString();
        },
        render: (v) => {
          if (isNil(v) || v === "") return "";

          return formatNumberRender(v / million);
        },
      },
      "million-currency": {
        key: "million-currency",
        title: () => "Million Currency",
        format: "million-currency",
        type: "number",
        label: `${currencySymbol}(000)`,
        editRender: (v, state) => {
          const currencyText = formats.currency.editRender(v);
          const text = formats.million.editRender(
            currencyText.substring(1),
            state,
          );

          return currencyText.charAt(0) + text;
        },
        render: (v) => {
          if (isNil(v) || v === "") return "";

          const value = v / million;

          return formats.currency.render(value);
        },
      },
    };

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
      formats,
      view: {
        height: () => 1250,
        width,
      },
    };

    const variablesSpreadsheetOptions = {
      debugMode,
      formats,
      view: {
        width,
      },
    };

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
    };
  }, [currencySymbol]);

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
    if (spreadsheet && hasAllRequiredInputsFilledIn && scope) {
      spreadsheet.setOptions({
        variables: scope,
      });
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

      dispatch(setCells(cells));
      dispatch(
        setSheetsSerializedValues(
          spreadsheet.hyperformula.getAllSheetsSerialized(),
        ),
      );
      dispatch(setSheetsValues(spreadsheet.hyperformula.getAllSheetsValues()));
    }
  }, [hasAllRequiredInputsFilledIn, isOnMobile, spreadsheet, dispatch, scope]);

  useEffect(() => {
    if (spreadsheet) {
      spreadsheet.variablesSpreadsheet.setVariableDatasheets(
        getVariablesData(inputQueryParams),
      );
    }
  }, [inputQueryParams, spreadsheet]);

  useEffect(() => {
    if (spreadsheet && hasAllRequiredInputsFilledIn && scope) {
      spreadsheet.setOptions({
        variables: scope,
      });

      if (showYOYGrowth) {
        spreadsheet.setDatasheets(
          getDatasheetsYOYGrowth(spreadsheet, isOnMobile),
        );
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
    if (
      hasAllRequiredInputsFilledIn &&
      !isNil(price) &&
      !isNil(costOfCapital.totalCostOfCapital)
    ) {
      dispatch(
        setScope({
          standardDeviationInStockPrices:
            currentIndustry.standardDeviationInStockPrices,
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
          bookValueOfEquity: balanceSheet.bookValueOfEquity,
          riskFreeRate,
          totalCostOfCapital: costOfCapital.totalCostOfCapital,
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
    pastThreeYearsAverageEffectiveTaxRate,
    price,
    riskFreeRate,
    sharesOutstanding,
    hasAllRequiredInputsFilledIn,
    inputQueryParams,
    currentIndustry.standardDeviationInStockPrices,
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
