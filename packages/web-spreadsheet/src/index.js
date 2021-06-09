import { h } from "./component/element";
import { cssPrefix } from "./config";
import { locale } from "./locale/locale";
import "./index.less";
import { buildSpreadsheet } from "./component/builders/buildSpreadsheet";
import { HyperFormula } from "hyperformula";
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
    ...hyperformulaConfig,
  });

  hyperformula.addNamedExpression("TRUE", "=TRUE()");
  hyperformula.addNamedExpression("FALSE", "=FALSE()");

  const {
    sheet,
    spreadsheetEventEmitter,
    variablesSpreadsheet,
    setDatasheets,
    getDatas,
    setOptions,
    eventEmitter,
  } = buildSpreadsheet(
    rootEl,
    options,
    hyperformula,
    variablesSpreadsheetOptions,
  );

  element.appendChild(rootEl.el);

  const destroy = () => {
    rootEl.destroy();
  };

  return {
    sheet,
    variablesSpreadsheet,
    setOptions,
    destroy,
    hyperformula,
    spreadsheetEventEmitter,
    setDatasheets,
    getDatas,
    eventEmitter,
  };
};

export default getSpreadsheet;
export { locale, spreadsheetEvents };
