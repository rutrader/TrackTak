import { h } from "./component/element";
import { cssPrefix } from "./config";
import { locale } from "./locale/locale";
import "./index.less";
import { buildSpreadsheet } from "./component/builders/buildSpreadsheet";
import { hyperformulaLicenseKey } from "./shared/hyperformulaLicenseKey";
import spreadsheetEvents from "./core/spreadsheetEvents";

const getSpreadsheet = (
  element,
  options,
  variablesSpreadsheetOptions,
  hyperformula,
) => {
  const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
    evt.preventDefault(),
  );

  const trueArgs = ["TRUE", "=TRUE()"];
  const falseArgs = ["FALSE", "=FALSE()"];

  if (hyperformula.isItPossibleToAddNamedExpression(...trueArgs)) {
    hyperformula.addNamedExpression(...trueArgs);
  }

  if (hyperformula.isItPossibleToAddNamedExpression(...falseArgs)) {
    hyperformula.addNamedExpression(...falseArgs);
  }

  let masterSpreadsheet = buildSpreadsheet(
    rootEl,
    options,
    hyperformula,
    variablesSpreadsheetOptions,
  );

  element.appendChild(rootEl.el);

  return masterSpreadsheet;
};

export default getSpreadsheet;
export { locale, spreadsheetEvents, hyperformulaLicenseKey };
