import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { getBottombar } from "../bottombar";
import { modifyEventEmitter } from "../../shared/modifyEventEmitter";
import { getNewOptions } from "./getNewOptions";
import { defaultVariablesSpreadsheetOptions } from "../../core/defaultOptions";
import { getTable } from "../table/getTable";
import { makeGetVariablesSheetViewWidthHeight } from "../makeGetVariablesSheetViewWidthHeight";
import getDraw from "../../canvas/draw";
import { cssPrefix } from "../../config";
import { h } from "../element";

export const buildVariablesSpreadsheet = (
  eventEmitter,
  save,
  getFocusedData,
  toolbar,
  rangeSelector,
  clipboard,
  history,
  formulaBar,
  print,
  mainSheet,
  rootEl,
  options,
  hyperformula,
  getIsDestroying,
) => {
  let newData;
  let newOptions;

  const getOptions = () => newOptions;

  const setOptions = (options) => {
    if (getIsDestroying()) return;

    newOptions = getNewOptions(
      options,
      newOptions,
      defaultVariablesSpreadsheetOptions,
      newData,
      sheet,
      toolbar,
    );

    if (toolbar) {
      toolbar.createItems();
    }

    if (newData) {
      sheet.sheetReset();
    }
  };

  setOptions(options);

  modifyEventEmitter(
    eventEmitter,
    getOptions().debugMode,
    "variablesSpreadsheet",
  );

  const getViewWidthHeight = makeGetVariablesSheetViewWidthHeight(getOptions);

  const getData = () => {
    return newData;
  };

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  const table = getTable(
    getOptions,
    getData,
    rangeSelector,
    hyperformula,
    getViewWidthHeight,
  );

  const draw = getDraw(
    table.el.el,
    getViewWidthHeight().width,
    getViewWidthHeight().height,
  );

  table.setDraw(draw);

  const variablesSheetType = "variables";

  const sheetBuilder = buildSheet(
    variablesSheetType,
    save,
    getOptions,
    getData,
    rangeSelector,
    eventEmitter,
    getViewWidthHeight,
    hyperformula,
  );

  const dataProxyBuilder = buildDataProxy(
    rangeSelector,
    getOptions,
    getFocusedData,
    hyperformula,
  );

  const getDataProxy = makeGetDataProxy(
    variablesSheetType,
    save,
    rangeSelector,
    clipboard,
    dataProxyBuilder,
    hyperformula,
    getOptions,
    eventEmitter,
    getViewWidthHeight,
    history,
  );

  const { sheet } = getSheet(
    variablesSheetType,
    toolbar,
    save,
    rangeSelector,
    clipboard,
    history,
    print,
    sheetBuilder,
    rootEl,
    table,
    eventEmitter,
    hyperformula,
    getOptions,
    setOptions,
    getData,
    getDataProxy,
    getViewWidthHeight,
    () => {
      mainSheet.setLastFocused(false);
    },
  );

  sheet.el.addClass(`${cssPrefix}-variables-sheet`);

  const setDatasheets = sheet.makeSetDatasheets(getDataProxy);

  const bottombar = getBottombar(
    "variables",
    eventEmitter,
    sheet.getDataValues,
    () => getData().getData(),
  );

  const stickyContainerEl = h(
    "div",
    `${cssPrefix}-top-sticky-container`,
  ).children(toolbar.el, formulaBar.el);

  mainSheet.el.before(stickyContainerEl);
  mainSheet.el.before(sheet.el);
  mainSheet.el.before(bottombar.el);

  return {
    sheet,
    getDataProxy,
    rootEl,
    setDatasheets,
    setOptions,
    getOptions,
    eventEmitter,
    getData,
  };
};
