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
import {
  finTranslations,
  getTTFinancialPlugin,
} from "./plugins/getTTFinancialPlugin";

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

const Spreadsheet = ({ sheetData, financialData, saveSheetData, ...props }) => {
  const [spreadsheet, setSpreadsheet] = useState();
  const [containerEl, setContainerEl] = useState();
  const currencySymbol = financialData?.general?.currencySymbol;
  const name = sheetData?.name;

  useEffect(() => {
    const FinancialPlugin = getTTFinancialPlugin(financialData);

    HyperFormula.registerFunctionPlugin(FinancialPlugin, finTranslations);

    spreadsheet?.hyperformula.rebuildAndRecalculate();
    spreadsheet?.updateViewport();

    return () => {
      HyperFormula.unregisterFunctionPlugin(FinancialPlugin);
    };
  }, [financialData, spreadsheet]);

  useEffect(() => {
    const spreadsheet = buildPowersheet();

    setSpreadsheet(spreadsheet);

    return () => {
      spreadsheet?.destroy();
      spreadsheet?.hyperformula.destroy();
    };
  }, []);

  useEffect(() => {
    const persistData = async (sheetData, done) => {
      await saveSheetData(sheetData);

      done();
    };

    spreadsheet?.eventEmitter.on("persistData", persistData);

    return () => {
      spreadsheet?.eventEmitter.off("persistData", persistData);
    };
  }, [saveSheetData, spreadsheet]);

  useEffect(() => {
    if (spreadsheet && sheetData) {
      if (containerEl) {
        containerEl.appendChild(spreadsheet.spreadsheetEl);
        spreadsheet.setData(sheetData.data);
        spreadsheet.initialize();
      }
    }
  }, [containerEl, sheetData, spreadsheet]);

  useEffect(() => {
    spreadsheet?.setOptions({
      exportSpreadsheetName: name,
      row: {
        amount: 100,
      },
      options: {
        textPatternFormats: {
          currency: `${currencySymbol}#,##0.##`,
          million: "#,###.##,,",
          "million-currency": `${currencySymbol}#,###.##,,`,
        },
      },
    });
  }, [currencySymbol, name, spreadsheet]);

  if (!spreadsheet) return null;

  return <Box {...props} ref={setContainerEl} />;
};

export default Spreadsheet;
