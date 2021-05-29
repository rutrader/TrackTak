import { h } from "./component/element";
import { cssPrefix } from "./config";
import { locale } from "./locale/locale";
import "./index.less";
import { buildSpreadsheet } from "./component/builders/buildSpreadsheet";
import { HyperFormula } from "hyperformula";
import { hyperformulaLicenseKey } from "./shared/hyperformulaLicenseKey";

const getSpreadsheet = (element, options, variablesSpreadsheetOptions) => {
  const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
    evt.preventDefault(),
  );
  const hyperformula = HyperFormula.buildEmpty({
    licenseKey: hyperformulaLicenseKey,
  });

  const {
    sheet,
    spreadsheetEventEmitter,
    variablesSpreadsheet,
    setDatasheets,
    setOptions,
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
  };
};

export default getSpreadsheet;
export { locale };
