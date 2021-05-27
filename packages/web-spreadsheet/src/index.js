import { h } from "./component/element";
import { cssPrefix } from "./config";
import { locale } from "./locale/locale";
import "./index.less";
import { HyperFormula } from "hyperformula";
import EventEmitter from "events";
import spreadsheetEvents from "./core/spreadsheetEvents";
import defaultOptions from "./core/defaultOptions";
import { merge } from "lodash-es";
import { modifyEventEmitter } from "./shared/modifyEventEmitter";
import { buildSpreadsheet } from "./component/builders/buildSpreadsheet";

const getSpreadsheet = (element, options) => {
  const eventEmitter = new EventEmitter();

  modifyEventEmitter(eventEmitter);

  const hyperformula = HyperFormula.buildEmpty({
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });

  let newData;
  let newOptions;

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  const getData = () => newData;

  const setOptions = (options) => {
    newOptions = merge(defaultOptions, options);

    Object.keys(newOptions.variables).forEach((key) => {
      const value = newOptions.variables[key];

      if (hyperformula.isItPossibleToChangeNamedExpression(key, value)) {
        hyperformula.changeNamedExpression(key, value);
      }

      if (hyperformula.isItPossibleToAddNamedExpression(key, value)) {
        hyperformula.addNamedExpression(key, value);
      }
    });

    if (newData) {
      sheet.sheetReset();
    }
  };

  const getOptions = () => newOptions;

  setOptions(options);

  const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
    evt.preventDefault(),
  );

  const { sheet, setDatasheets } = buildSpreadsheet(
    rootEl,
    getOptions,
    getData,
    hyperformula,
    eventEmitter,
  );

  element.appendChild(rootEl.el);

  const destroy = () => {
    rootEl.destroy();
  };

  return {
    sheet,
    setOptions,
    destroy,
    hyperformula,
    eventEmitter,
    setDatasheets,
  };
};

export default getSpreadsheet;
export { locale };
