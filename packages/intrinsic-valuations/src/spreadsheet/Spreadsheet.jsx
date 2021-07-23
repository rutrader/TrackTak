import React, { useRef, useState, Fragment } from "react";
import { useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import { useLocation } from "@reach/router";
import { HyperFormula } from "hyperformula";
import getSpreadsheet, {
  spreadsheetEvents,
} from "../../../web-spreadsheet/src";
import getFormats from "./getFormats";
import SaveStatus from "./SaveStatus";
import hyperformulaConfig from "./hyperformulaConfig";

const requiredInputsId = "required-inputs";
const dcfValuationId = "dcf-valuation";
const defaultColWidth = 110;

const Spreadsheet = ({
  spreadsheetData,
  financialData,
  setSpreadsheet,
  spreadsheet,
  saveSheetData = () => {},
}) => {
  const containerRef = useRef();
  const theme = useTheme();
  const location = useLocation();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isFocusedOnValueDrivingInputs = location.hash?.includes(
    requiredInputsId,
  );
  const [isSaving, setIsSaving] = useState(false);
  const sheetName = spreadsheetData?.sheetData?.name;
  const currencySymbol = financialData?.general?.currencySymbol;

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
      view: {
        height: () => 1200,
        width,
      },
    };

    const variablesSpreadsheetOptions = {
      debugMode,
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
  }, [setSpreadsheet]);

  useEffect(() => {
    const handleSave = async (data) => {
      setIsSaving(true);
      await saveSheetData(data);
      setIsSaving(false);
    };

    if (spreadsheet) {
      spreadsheet.eventEmitter.on(
        spreadsheetEvents.save.persistDataChange,
        handleSave,
      );

      spreadsheet.variablesEventEmitter.on(
        spreadsheetEvents.save.persistDataChange,
        handleSave,
      );
    }

    return () => {
      if (spreadsheet) {
        spreadsheet.eventEmitter.off(
          spreadsheetEvents.save.persistDataChange,
          handleSave,
        );

        spreadsheet.variablesEventEmitter.off(
          spreadsheetEvents.save.persistDataChange,
          handleSave,
        );
      }
    };
  }, [spreadsheet, saveSheetData, spreadsheetData]);

  useEffect(() => {
    if (spreadsheet) {
      const options = {
        formats: getFormats(currencySymbol),
      };

      spreadsheet.setOptions(options);
      spreadsheet.variablesSpreadsheet.setOptions(options);
    }
  }, [currencySymbol, spreadsheet]);

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
