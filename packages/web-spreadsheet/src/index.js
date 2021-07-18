import { h } from "./component/element";
import { cssPrefix } from "./config";
import { locale } from "./locale/locale";
import "./index.less";
import { buildSpreadsheet } from "./component/builders/buildSpreadsheet";
import HyperFormula from "hyperformula";
import { hyperformulaLicenseKey } from "./shared/hyperformulaLicenseKey";
import spreadsheetEvents from "./core/spreadsheetEvents";

const getSpreadsheet = (
  element,
  options,
  variablesSpreadsheetOptions,
  hyperformulaConfig,
) => {
  const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
    evt.preventDefault(),
  );

  const hyperformula = HyperFormula.buildEmpty({
    licenseKey: hyperformulaLicenseKey,
    // For vlookup to match Excel
    binarySearchThreshold: 1,
    // We use our own undo/redo instead
    ...hyperformulaConfig,
  });

  hyperformula.addNamedExpression("TRUE", "=TRUE()");
  hyperformula.addNamedExpression("FALSE", "=FALSE()");

  const {
    spreadsheet,
    variablesSpreadsheet,
    spreadsheetEventEmitter,
    setDatasheets,
    getDatas,
    getData,
    setOptions,
    eventEmitter,
  } = buildSpreadsheet(
    rootEl,
    options,
    hyperformula,
    variablesSpreadsheetOptions,
  );

  const reset = () => {
    spreadsheet.sheet.sheetReset();
    variablesSpreadsheet.sheet.sheetReset();
  };

  element.appendChild(rootEl.el);

  const destroy = () => {
    rootEl.destroy();
  };

  return {
    spreadsheet,
    variablesSpreadsheet,
    setOptions,
    destroy,
    reset,
    hyperformula,
    spreadsheetEventEmitter,
    setDatasheets,
    getDatas,
    getData,
    eventEmitter,
  };
};

export default getSpreadsheet;
export { locale, spreadsheetEvents };
