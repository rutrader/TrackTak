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

  const {
    spreadsheet,
    variablesSpreadsheet,
    setDatasheets,
    getDatas,
    getData,
    setOptions,
    eventEmitter,
    variablesEventEmitter,
  } = buildSpreadsheet(
    rootEl,
    options,
    hyperformula,
    variablesSpreadsheetOptions,
  );

  const setData = (data) => {
    variablesSpreadsheet.setDatasheets(data.variablesDatas);
    setDatasheets(data.datas);
    spreadsheet.sheet.switchData(spreadsheet.sheet.getDatas()[0]);
  };

  const reset = () => {
    spreadsheet.sheet.sheetReset();
    variablesSpreadsheet.sheet.sheetReset();
  };

  element.appendChild(rootEl.el);

  const destroy = () => {
    rootEl.destroy();

    if (hyperformula.isItPossibleToRemoveNamedExpression("TRUE")) {
      hyperformula.removeNamedExpression("TRUE");
    }

    if (hyperformula.isItPossibleToRemoveNamedExpression("FALSE")) {
      hyperformula.removeNamedExpression("FALSE");
    }

    hyperformula.destroy();
  };

  return {
    spreadsheet,
    variablesSpreadsheet,
    setOptions,
    destroy,
    reset,
    setData,
    getDatas,
    getData,
    eventEmitter,
    variablesEventEmitter,
    hyperformula,
  };
};

export default getSpreadsheet;
export { locale, spreadsheetEvents, hyperformulaLicenseKey };
