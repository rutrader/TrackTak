import { h } from "./component/element";
import { cssPrefix } from "./config";
import { locale } from "./locale/locale";
import "./index.less";
import { buildSpreadsheet } from "./component/builders/buildSpreadsheet";

const getSpreadsheet = (element, options) => {
  const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
    evt.preventDefault(),
  );

  const {
    sheet,
    spreadsheetEventEmitter,
    hyperformula,
    variablesSpreadsheet,
    setDatasheets,
    setOptions,
  } = buildSpreadsheet(rootEl, options);

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
