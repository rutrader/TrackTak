import { h } from "./component/element";
import { cssPrefix } from "./config";
import { locale } from "./locale/locale";
import "./index.less";
import { HyperFormula } from "hyperformula";
import EventEmitter from "events";
import { modifyEventEmitter } from "./shared/modifyEventEmitter";
import { buildSpreadsheet } from "./component/builders/buildSpreadsheet";

const getSpreadsheet = (element, options) => {
  const eventEmitter = new EventEmitter();

  modifyEventEmitter(eventEmitter);

  const hyperformula = HyperFormula.buildEmpty({
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });

  const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
    evt.preventDefault(),
  );

  const {
    sheet,
    variablesSpreadsheet,
    setDatasheets,
    setOptions,
  } = buildSpreadsheet(rootEl, options, hyperformula, eventEmitter);

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
    eventEmitter,
    setDatasheets,
  };
};

export default getSpreadsheet;
export { locale };
