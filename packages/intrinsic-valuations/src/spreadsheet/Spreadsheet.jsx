import React, { useRef, useState, Fragment } from "react";
import { useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { useLocation } from "@reach/router";
import { HyperFormula } from "hyperformula";
import getSpreadsheet, {
  spreadsheetEvents,
} from "../../../web-spreadsheet/src";
import getFormats from "./getFormats";
import SaveStatus from "./SaveStatus";
import { useFinancialPlugin } from "./plugins/useFinancialPlugin";
import hyperformulaConfig from "./hyperformulaConfig";

const requiredInputsId = "required-inputs";
const dcfValuationId = "dcf-valuation";
const defaultColWidth = 110;

const Spreadsheet = ({ spreadsheet: spreadsheetData, saveSheetData }) => {
  const containerRef = useRef();
  const [spreadsheet, setSpreadsheet] = useState();
  const theme = useTheme();
  const location = useLocation();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isFocusedOnValueDrivingInputs = location.hash?.includes(
    requiredInputsId,
  );
  const [isSaving, setIsSaving] = useState(false);
  const sheetName = spreadsheetData?.sheetData?.name;
  const currencySymbol =
    spreadsheetData?.financialData?.general?.currencySymbol;

  useFinancialPlugin(spreadsheet, spreadsheetData?.financialData);

  useEffect(() => {
    const exportToExcel = (exportFn) => {
      const formats = getFormats(currencySymbol);

      exportFn(`${sheetName}.xlsx`, formats, ["FIN"]);
    };

    if (spreadsheet) {
      spreadsheet.eventEmitter.on(
        spreadsheetEvents.export.exportSheets,
        exportToExcel,
      );
    }

    return () => {
      if (spreadsheet) {
        spreadsheet.eventEmitter.off(
          spreadsheetEvents.export.exportSheets,
          exportToExcel,
        );
      }
    };
  }, [currencySymbol, sheetName, spreadsheet]);

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

    const hyperformula = HyperFormula.buildEmpty(hyperformulaConfig);

    spreadsheet = getSpreadsheet(
      dcfValuationElement,
      options,
      variablesSpreadsheetOptions,
      hyperformula,
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
      await saveSheetData(data);
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
  }, [spreadsheet, saveSheetData, spreadsheetData]);

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
    if (spreadsheet && spreadsheetData) {
      spreadsheet.setData(spreadsheetData?.sheetData.data);
    }
  }, [spreadsheetData, spreadsheet]);

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
          <Typography></Typography>
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
    </Fragment>
  );
};

export default Spreadsheet;
