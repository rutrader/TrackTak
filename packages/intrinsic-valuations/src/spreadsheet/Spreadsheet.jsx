import React, { useRef, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectRecentCashFlowStatement from "../selectors/fundamentalSelectors/selectRecentCashFlowStatement";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import selectSharesOutstanding from "../selectors/fundamentalSelectors/selectSharesOutstanding";
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
import { isEmpty, isNil } from "lodash-es";
import getSpreadsheet, {
  spreadsheetEvents,
} from "../../../web-spreadsheet/src";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import { currencySymbolMap } from "currency-symbol-map";
import selectEstimatedCostOfDebt from "../selectors/fundamentalSelectors/selectEstimatedCostOfDebt";
import {
  finTranslations,
  makeFinancialPlugin,
} from "./plugins/FinancialPlugin";
import HyperFormula from "hyperformula";
import selectYearlyIncomeStatements from "../selectors/fundamentalSelectors/selectYearlyIncomeStatements";
import selectYearlyBalanceSheets from "../selectors/fundamentalSelectors/selectYearlyBalanceSheets";
import selectYearlyCashFlowStatements from "../selectors/fundamentalSelectors/selectYearlyCashFlowStatements";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectHighlights from "../selectors/fundamentalSelectors/selectHighlights";
import selectExchangeRates from "../selectors/fundamentalSelectors/selectExchangeRates";
import SensitivityAnalysis from "../components/SensitivityAnalysis";
import Section from "../components/Section";
import getFormats from "./getFormats";
import exportToExcel from "./exportToExcel";
import SaveStatus from "./SaveStatus";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
} from "../redux/thunks/fundamentalsThunks";
import freeCashFlowToFirmData, {
  freeCashFlowToFirmVariablesData,
} from "./templates/freeCashFlowFirmSimple/data";

const requiredInputsId = "required-inputs";
const dcfValuationId = "dcf-valuation";
const defaultColWidth = 110;

const Spreadsheet = ({
  ticker,
  isSaving,
  onSave = () => {},
  spreadsheetToRestore,
  hideSensitivityAnalysis,
}) => {
  const containerRef = useRef();
  const [spreadsheet, setSpreadsheet] = useState();
  const theme = useTheme();
  const location = useLocation();
  const currencySymbol = useSelector(selectValuationCurrencySymbol);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
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
  const pastThreeYearsAverageEffectiveTaxRate = useSelector(
    selectThreeAverageYearsEffectiveTaxRate,
  );
  const isFocusedOnValueDrivingInputs = location.hash?.includes(
    requiredInputsId,
  );
  const currentIndustry = useSelector(selectCurrentIndustry);
  const estimatedCostOfDebt = useSelector(selectEstimatedCostOfDebt);
  const general = useSelector(selectGeneral);
  const highlights = useSelector(selectHighlights);
  const exchangeRates = useSelector(selectExchangeRates);
  const scope = useSelector(selectScope);
  const valuationCurrencySymbol = useSelector(selectValuationCurrencySymbol);

  useEffect(() => {
    dispatch(
      getFundamentalsThunk({
        ticker,
      }),
    );
    dispatch(
      getLastPriceCloseThunk({
        ticker,
      }),
    );
  }, [dispatch, ticker]);

  useEffect(() => {
    if (
      spreadsheet &&
      !isEmpty(spreadsheetToRestore?.sheetData.data?.datas ?? true)
    ) {
      const dcfValuationData = spreadsheetToRestore.sheetData.data.datas[0];
      const financialStatements = spreadsheetToRestore.sheetData.data.datas[1];
      const costOfCapital = spreadsheetToRestore.sheetData.data.datas[2];
      const employeeOptions = spreadsheetToRestore.sheetData.data.datas[3];
      const syntheticCreditRating =
        spreadsheetToRestore.sheetData.data.datas[4];
      const industryAveragesUS = spreadsheetToRestore.sheetData.data.datas[5];
      const industryAveragesGlobal =
        spreadsheetToRestore.sheetData.data.datas[6];

      spreadsheet.setDatasheets([
        dcfValuationData,
        financialStatements,
        costOfCapital,
        employeeOptions,
        syntheticCreditRating,
        industryAveragesUS,
        industryAveragesGlobal,
      ]);

      const requiredInputs =
        spreadsheetToRestore.sheetData.data.variablesDatas[0];
      const optionalInputs =
        spreadsheetToRestore.sheetData.data.variablesDatas[1];

      spreadsheet.variablesSpreadsheet.setVariableDatasheets([
        requiredInputs,
        optionalInputs,
      ]);
    }
  }, [spreadsheetToRestore, spreadsheet]);

  // Move to spreadsheet later
  useEffect(() => {
    const exportClickCallback = (type) => {
      if (type === "export") {
        exportToExcel(
          `${general.code}.${general.exchange}_DCF.xlsx`,
          spreadsheet.getDatas(),
          scope,
          valuationCurrencySymbol,
        );
      }
    };

    if (spreadsheet) {
      spreadsheet.eventEmitter.on(
        spreadsheetEvents.toolbar.clickIcon,
        exportClickCallback,
      );
    }

    return () => {
      if (spreadsheet) {
        spreadsheet.eventEmitter.off(
          spreadsheetEvents.toolbar.clickIcon,
          exportClickCallback,
        );
      }
    };
  }, [
    general.code,
    general.exchange,
    scope,
    spreadsheet,
    valuationCurrencySymbol,
  ]);

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
    const cellEditedCallback = () => {
      // We will use this later to allow users to save their
      // sheets. For now it's to make it easier for us to create
      // our templates.
      if (process.env.NODE_ENV === "development") {
        console.log("datas: ", spreadsheet.getDatas());
      }
    };

    if (spreadsheet) {
      spreadsheet.variablesSpreadsheet.eventEmitter.on(
        spreadsheetEvents.sheet.cellEdited,
        cellEditedCallback,
      );

      spreadsheet.variablesSpreadsheet.eventEmitter.on(
        spreadsheetEvents.save.persistDataChange,
        onSave,
      );
    }

    return () => {
      if (spreadsheet) {
        spreadsheet.variablesSpreadsheet.eventEmitter.off(
          spreadsheetEvents.sheet.cellEdited,
          cellEditedCallback,
        );

        spreadsheet.variablesSpreadsheet.eventEmitter.off(
          spreadsheetEvents.save.persistDataChange,
          onSave,
        );
      }
    };
  }, [spreadsheet, onSave]);

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
      spreadsheet.variablesSpreadsheet.setVariableDatasheets(
        freeCashFlowToFirmVariablesData,
      );
      spreadsheet.setDatasheets(freeCashFlowToFirmData);
      spreadsheet.sheet.switchData(spreadsheet.sheet.getDatas()[0]);
    }
  }, [spreadsheet]);

  // useEffect(() => {
  //   // Dispatch only when we have all the data from the API
  //   if (!isNil(price) && spreadsheet) {
  //     dispatch(
  //       setSheetsSerializedValues(
  //         spreadsheet.hyperformula.getAllSheetsSerialized(),
  //       ),
  //     );
  //     dispatch(setSheetsValues(spreadsheet.hyperformula.getAllSheetsValues()));
  //     dispatch(setSheetsDatas(spreadsheet.getDatas()));
  //     dispatch(
  //       setScope({
  //         incomeStatements: {
  //           ttm: ttmIncomeStatement,
  //         },
  //         balanceSheets: {
  //           ttm: ttmBalanceSheet,
  //         },
  //         general,
  //         highlights,
  //         riskFreeRate,
  //         currentEquityRiskPremium,
  //         currentIndustry,
  //         estimatedCostOfDebt,
  //         pastThreeYearsAverageEffectiveTaxRate,
  //         price,
  //         sharesOutstanding,
  //         cagrInYears_1_5: inputQueryParams[queryNames.cagrInYears_1_5],
  //         yearOfConvergence: inputQueryParams[queryNames.yearOfConvergence],
  //         ebitTargetMarginInYear_10:
  //           inputQueryParams[queryNames.ebitTargetMarginInYear_10],
  //         salesToCapitalRatio: inputQueryParams[queryNames.salesToCapitalRatio],
  //         nonOperatingAssets: inputQueryParams[queryNames.nonOperatingAssets],
  //         netOperatingLoss: inputQueryParams[queryNames.netOperatingLoss],
  //         probabilityOfFailure:
  //           inputQueryParams[queryNames.probabilityOfFailure],
  //         proceedsAsAPercentageOfBookValue:
  //           inputQueryParams[queryNames.proceedsAsAPercentageOfBookValue],
  //       }),
  //     );
  //   }
  // }, [
  //   currentEquityRiskPremium,
  //   currentIndustry,
  //   dispatch,
  //   estimatedCostOfDebt,
  //   exchangeRates,
  //   general,
  //   hasAllRequiredInputsFilledIn,
  //   highlights,
  //   inputQueryParams,
  //   pastThreeYearsAverageEffectiveTaxRate,
  //   price,
  //   riskFreeRate,
  //   sharesOutstanding,
  //   spreadsheet,
  //   ttmBalanceSheet,
  //   ttmCashFlowStatement,
  //   ttmIncomeStatement,
  //   yearlyBalanceSheets,
  //   yearlyCashFlowStatements,
  //   yearlyIncomeStatements,
  // ]);

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          my: 0.75,
        }}
      >
        <Box
          sx={{
            px: "30px",
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Box
            sx={{
              ml: "auto",
            }}
          >
            <SaveStatus isSaving={isSaving} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          "& .powersheet-comment": {
            fontFamily: theme.typography.fontFamily,
          },
          "& .powersheet-variables-sheet": isFocusedOnValueDrivingInputs
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
      {!hideSensitivityAnalysis && (
        <Section>
          <SensitivityAnalysis />
        </Section>
      )}
    </Fragment>
  );
};

export default Spreadsheet;
