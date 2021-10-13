import React, { useState } from "react";
import { useEffect } from "react";
import { Box } from "@material-ui/core";
import { AlwaysSparse, HyperFormula } from "hyperformula";
import "@tracktak/powersheet/dist/index.css";
import {
  Spreadsheet as PowerSpreadsheet,
  Toolbar,
  FormulaBar,
  Exporter,
  BottomBar,
} from "@tracktak/powersheet";
import { currencySymbolMap } from "currency-symbol-map";

const buildPowersheet = () => {
  const hyperformula = HyperFormula.buildEmpty({
    chooseAddressMappingPolicy: new AlwaysSparse(),
    // We use our own undo/redo instead
    undoLimit: 0,
    licenseKey: "gpl-v3",
  });
  const toolbar = new Toolbar();
  const formulaBar = new FormulaBar();
  const exporter = new Exporter();
  const bottomBar = new BottomBar();

  const spreadsheet = new PowerSpreadsheet({
    hyperformula,
    toolbar,
    formulaBar,
    exporter,
    bottomBar,
    hyperformulaConfig: {
      currencySymbol: Object.values(currencySymbolMap),
    },
  });

  spreadsheet.spreadsheetEl.prepend(formulaBar.formulaBarEl);
  spreadsheet.spreadsheetEl.prepend(toolbar.toolbarEl);
  spreadsheet.spreadsheetEl.appendChild(bottomBar.bottomBarEl);

  return spreadsheet;
};

const Spreadsheet = ({ spreadsheetData, financialData, saveSheetData }) => {
  const [spreadsheet, setSpreadsheet] = useState();
  const [containerEl, setContainerEl] = useState();
  const sheetName = spreadsheetData?.sheetData?.name;
  const currencySymbol = financialData?.general?.currencySymbol;

  useEffect(() => {
    const spreadsheet = buildPowersheet();

    setSpreadsheet(spreadsheet);

    return () => {
      spreadsheet?.destroy();
    };
  }, []);

  useEffect(() => {
    if (containerEl && spreadsheet) {
      containerEl.appendChild(spreadsheet.spreadsheetEl);
      spreadsheet.initialize();
    }
  }, [containerEl, spreadsheet]);

  if (!spreadsheet) return null;

  return (
    <Box
      sx={{
        height: "100vh",
      }}
      ref={setContainerEl}
    />
  );
};

export default Spreadsheet;
