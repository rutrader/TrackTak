import React, { useRef, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import { useLocation } from "@reach/router";
import selectValuationCurrencySymbol from "../selectors/stockSelectors/selectValuationCurrencySymbol";
import selectScope from "../selectors/dcfSelectors/selectScope";
import getSpreadsheet, {
  spreadsheetEvents,
} from "../../../web-spreadsheet/src";
import { currencySymbolMap } from "currency-symbol-map";
import selectGeneral from "../selectors/stockSelectors/selectGeneral";
import SensitivityAnalysis from "../components/SensitivityAnalysis";
import Section from "../components/Section";
import getFormats from "./getFormats";
import exportToExcel from "./exportToExcel";
import SaveStatus from "./SaveStatus";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
} from "../redux/thunks/stockThunks";
import freeCashFlowToFirmData, {
  freeCashFlowToFirmVariablesData,
} from "./templates/freeCashFlowFirmSimple/data";
import { useFinancialPlugin } from "./plugins/useFinancialPlugin";
import { HyperFormula } from "hyperformula";

const requiredInputsId = "required-inputs";
const dcfValuationId = "dcf-valuation";
const defaultColWidth = 110;

const Spreadsheet = ({ sheetData, saveSheetData, hideSensitivityAnalysis }) => {
  const containerRef = useRef();
  const [spreadsheet, setSpreadsheet] = useState();
  const theme = useTheme();
  const location = useLocation();
  const currencySymbol = useSelector(selectValuationCurrencySymbol);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const isFocusedOnValueDrivingInputs = location.hash?.includes(
    requiredInputsId,
  );
  const general = useSelector(selectGeneral);
  const scope = useSelector(selectScope);
  const valuationCurrencySymbol = useSelector(selectValuationCurrencySymbol);
  const [isSaving, setIsSaving] = useState(false);

  useFinancialPlugin(spreadsheet);

  useEffect(() => {
    const ticker = sheetData?.name;

    if (ticker) {
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
    }
  }, [dispatch, sheetData]);

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
  }, [general, scope, spreadsheet, valuationCurrencySymbol]);

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
    const handleSave = async (data) => {
      setIsSaving(true);
      await saveSheetData(sheetData.name, data);
      setIsSaving(false);
    };

    if (spreadsheet) {
      spreadsheet.variablesSpreadsheet.eventEmitter.on(
        spreadsheetEvents.save.persistDataChange,
        handleSave,
      );
    }

    return () => {
      if (spreadsheet) {
        spreadsheet.variablesSpreadsheet.eventEmitter.off(
          spreadsheetEvents.save.persistDataChange,
          handleSave,
        );
      }
    };
  }, [spreadsheet, saveSheetData, sheetData]);

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
      spreadsheet.spreadsheet.sheet.switchData(
        spreadsheet.spreadsheet.sheet.getDatas()[0],
      );
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
