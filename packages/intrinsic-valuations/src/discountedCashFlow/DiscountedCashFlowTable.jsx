import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import useInputQueryParams from "../hooks/useInputQueryParams";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectRecentCashFlowStatement from "../selectors/fundamentalSelectors/selectRecentCashFlowStatement";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import selectSharesOutstanding from "../selectors/fundamentalSelectors/selectSharesOutstanding";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import { useLocation } from "@reach/router";
import selectThreeAverageYearsEffectiveTaxRate from "../selectors/fundamentalSelectors/selectThreeAverageYearsEffectiveTaxRate";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import selectScope from "../selectors/dcfSelectors/selectScope";
import {
  setScope,
  setSheetsDatas,
  setSheetsSerializedValues,
  setSheetsValues,
} from "../redux/actions/dcfActions";
import { isNil } from "lodash-es";
import getSpreadsheet, {
  spreadsheetEvents,
} from "../../../web-spreadsheet/src";
import useSetURLInput from "../hooks/useSetURLInput";
import { camelCase } from "change-case";
import { allInputNameTypeMappings } from "./scopeNameTypeMapping";
import { queryNames } from "./templates/freeCashFlowFirmSimple/inputQueryNames";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import { currencySymbolMap } from "currency-symbol-map";
import getRequiredInputsData from "./templates/freeCashFlowFirmSimple/data/getRequiredInputsData";
import getEmployeeOptionsData from "./templates/freeCashFlowFirmSimple/data/getEmployeeOptionsData";
import getDCFValuationData from "./templates/freeCashFlowFirmSimple/data/getDCFValuationData";
import getCostOfCapitalData from "./templates/freeCashFlowFirmSimple/data/getCostOfCapitalData";
import getOptionalInputsData from "./templates/freeCashFlowFirmSimple/data/getOptionalInputsData";
import selectEstimatedCostOfDebt from "../selectors/fundamentalSelectors/selectEstimatedCostOfDebt";
import {
  finTranslations,
  makeFinancialPlugin,
} from "./plugins/FinancialPlugin";
import HyperFormula from "hyperformula";
import selectYearlyIncomeStatements from "../selectors/fundamentalSelectors/selectYearlyIncomeStatements";
import selectYearlyBalanceSheets from "../selectors/fundamentalSelectors/selectYearlyBalanceSheets";
import selectYearlyCashFlowStatements from "../selectors/fundamentalSelectors/selectYearlyCashFlowStatements";
import getSyntheticCreditRatingData from "./templates/freeCashFlowFirmSimple/data/getSyntheticCreditRatingData";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectHighlights from "../selectors/fundamentalSelectors/selectHighlights";
import selectExchangeRates from "../selectors/fundamentalSelectors/selectExchangeRates";
import getIndustryAveragesUSData from "./templates/freeCashFlowFirmSimple/data/getIndustryAveragesUSData";
import getIndustryAveragesGlobalData from "./templates/freeCashFlowFirmSimple/data/getIndustryAveragesGlobalData";
import getFinancialStatementsData from "./templates/freeCashFlowFirmSimple/data/getFinancialStatementsData";

const requiredInputsId = "required-inputs";
const dcfValuationId = "dcf-valuation";
const defaultColWidth = 110;

// Temporary until patterns are in the cell
// instead of formats
export const getFormats = (currencySymbol) => {
  const formats = {
    "million-currency": {
      key: "million-currency",
      title: () => "Million Currency",
      type: "number",
      format: "million-currency",
      label: `${currencySymbol}1,000,000`,
      pattern: `"${currencySymbol}"#,###.##,,`,
    },
    million: {
      key: "million",
      title: () => "Million",
      type: "number",
      format: "million",
      label: `1,000,000`,
      pattern: `#,###.##,,`,
    },
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

const DiscountedCashFlowTable = ({ showFormulas, showYOYGrowth }) => {
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
  const yearlyIncomeStatements = useSelector(selectYearlyIncomeStatements);
  const yearlyBalanceSheets = useSelector(selectYearlyBalanceSheets);
  const yearlyCashFlowStatements = useSelector(selectYearlyCashFlowStatements);
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
  const general = useSelector(selectGeneral);
  const highlights = useSelector(selectHighlights);
  const exchangeRates = useSelector(selectExchangeRates);

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
    let FinancialPlugin;

    // Temporary
    if (!isNil(riskFreeRate) && !isNil(price) && !isNil(ttmIncomeStatement)) {
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
          height: () => 1200,
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

      FinancialPlugin = makeFinancialPlugin({
        incomeStatements: {
          ttm: ttmIncomeStatement,
          yearly: yearlyIncomeStatements,
        },
        balanceSheets: {
          ttm: ttmBalanceSheet,
          yearly: yearlyBalanceSheets,
        },
        cashFlowStatements: {
          ttm: ttmCashFlowStatement,
          yearly: yearlyCashFlowStatements,
        },
        exchangeRates,
        general,
        highlights,
        riskFreeRate,
        currentEquityRiskPremium,
        currentIndustry,
        estimatedCostOfDebt,
        pastThreeYearsAverageEffectiveTaxRate,
        price,
        sharesOutstanding,
      });

      HyperFormula.registerFunctionPlugin(FinancialPlugin, finTranslations);

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
    }

    return () => {
      spreadsheet?.destroy();
      HyperFormula.unregisterFunctionPlugin(FinancialPlugin);
    };
  }, [
    currencySymbol,
    currentEquityRiskPremium,
    currentIndustry,
    estimatedCostOfDebt,
    exchangeRates,
    general,
    highlights,
    pastThreeYearsAverageEffectiveTaxRate,
    price,
    riskFreeRate,
    sharesOutstanding,
    ttmBalanceSheet,
    ttmCashFlowStatement,
    ttmIncomeStatement,
    yearlyBalanceSheets,
    yearlyCashFlowStatements,
    yearlyIncomeStatements,
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
        label = label.toString();

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
    if (spreadsheet) {
      const { datas } = spreadsheet.getDatas();

      if (!datas.length) {
        spreadsheet.variablesSpreadsheet.setVariableDatasheets([
          getRequiredInputsData(inputQueryParams),
          getOptionalInputsData(inputQueryParams),
        ]);
      }

      if (!datas.length || datas.length === 1) {
        // Temp
        const financialStatements = {
          incomeStatements: {
            ttm: ttmIncomeStatement,
            yearly: yearlyIncomeStatements,
          },
          balanceSheets: {
            ttm: ttmBalanceSheet,
            yearly: yearlyBalanceSheets,
          },
          cashFlowStatements: {
            ttm: ttmCashFlowStatement,
            yearly: yearlyCashFlowStatements,
          },
        };
        spreadsheet.setDatasheets([
          getDCFValuationData(financialStatements),
          getFinancialStatementsData(financialStatements),
          getCostOfCapitalData(),
          getEmployeeOptionsData(),
          getSyntheticCreditRatingData(),
          getIndustryAveragesUSData(),
          getIndustryAveragesGlobalData(),
        ]);

        spreadsheet.sheet.switchData(spreadsheet.sheet.getDatas()[0]);
      }
    }
  }, [
    spreadsheet,
    inputQueryParams,
    ttmIncomeStatement,
    yearlyIncomeStatements,
    ttmBalanceSheet,
    yearlyBalanceSheets,
    ttmCashFlowStatement,
    yearlyCashFlowStatements,
  ]);

  useEffect(() => {
    if (spreadsheet && scope) {
      if (showYOYGrowth) {
        spreadsheet.setOptions({
          showAllFormulas: false,
          showYOYGrowth: true,
        });
        return;
      }

      if (showFormulas) {
        spreadsheet.setOptions({
          showAllFormulas: true,
          showYOYGrowth: false,
        });
        return;
      }

      spreadsheet.setOptions({
        showAllFormulas: false,
        showYOYGrowth: false,
      });
    }
  }, [showYOYGrowth, spreadsheet, isOnMobile, showFormulas, scope]);

  useEffect(() => {
    // Dispatch only when we have all the data from the API
    if (hasAllRequiredInputsFilledIn && !isNil(price) && spreadsheet) {
      dispatch(
        setSheetsSerializedValues(
          spreadsheet.hyperformula.getAllSheetsSerialized(),
        ),
      );
      dispatch(setSheetsValues(spreadsheet.hyperformula.getAllSheetsValues()));
      dispatch(setSheetsDatas(spreadsheet.getDatas()));
      dispatch(
        setScope({
          incomeStatements: {
            ttm: ttmIncomeStatement,
          },
          balanceSheets: {
            ttm: ttmBalanceSheet,
          },
          highlights,
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
    exchangeRates,
    general,
    hasAllRequiredInputsFilledIn,
    highlights,
    inputQueryParams,
    pastThreeYearsAverageEffectiveTaxRate,
    price,
    riskFreeRate,
    sharesOutstanding,
    spreadsheet,
    ttmBalanceSheet,
    ttmCashFlowStatement,
    ttmIncomeStatement,
    yearlyBalanceSheets,
    yearlyCashFlowStatements,
    yearlyIncomeStatements,
  ]);

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
    </Box>
  );
};

export default DiscountedCashFlowTable;
