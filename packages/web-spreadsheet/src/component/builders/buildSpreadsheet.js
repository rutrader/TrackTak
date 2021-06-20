import { getTable } from "../table/getTable";
import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { getBottombar } from "../bottombar";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";
import { buildVariablesSpreadsheet } from "./buildVariablesSpreadsheet";
import EventEmitter from "events";
import { modifyEventEmitter } from "../../shared/modifyEventEmitter";
import { getNewOptions } from "./getNewOptions";
import { defaultOptions } from "../../core/defaultOptions";
import { makeGetViewWidthHeight } from "../makeGetSheetViewWidthHeight";
import getDraw from "../../canvas/draw";
import { getPrint } from "../getPrint";
import { getToolbar } from "../toolbar/getToolbar";
import { getFormulaBar } from "../editor/getFormulaBar";
import { getFormulaSuggestions } from "../../shared/getFormulaSuggestions";

export const buildSpreadsheet = (
  rootEl,
  options,
  hyperformula,
  variablesSpreadsheetOptions,
) => {
  let newData;
  let newOptions;

  const eventEmitter = new EventEmitter();
  const variablesEventEmitter = new EventEmitter();

  const globalEventEmitter = {
    on: (...args) => {
      eventEmitter.on(...args);
      variablesEventEmitter.on(...args);
    },
    emit: (...args) => {
      if (sheet?.getLastFocused()) {
        eventEmitter.emit(...args);

        return;
      }

      if (variablesSpreadsheet?.sheet?.getLastFocused()) {
        variablesEventEmitter.emit(...args);

        return;
      }
    },
  };

  const getData = () => {
    return newData;
  };

  const getFocusedData = () => {
    if (sheet?.getLastFocused()) {
      return getData();
    }

    if (variablesSpreadsheet?.sheet?.getLastFocused()) {
      return variablesSpreadsheet.getData();
    }
  };

  const getOptions = () => newOptions;

  const setOptions = (options) => {
    newOptions = getNewOptions(
      options,
      defaultOptions,
      hyperformula,
      newData,
      sheet,
    );
  };

  setOptions(options);

  modifyEventEmitter(eventEmitter, getOptions().debugMode, "spreadsheet");

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  const getViewWidthHeight = makeGetViewWidthHeight(getOptions, () => {
    return variablesSpreadsheet.getOptions();
  });

  const table = getTable(getOptions, getData, hyperformula, getViewWidthHeight);

  const toolbar = getToolbar(getOptions, getFocusedData, globalEventEmitter);

  const formulaBar = getFormulaBar(
    getOptions,
    getFocusedData,
    getFormulaSuggestions(),
    globalEventEmitter,
  );

  const sheetBuilder = buildSheet(
    getOptions,
    getData,
    eventEmitter,
    getViewWidthHeight,
  );

  const dataProxyBuilder = buildDataProxy(getOptions, getData, hyperformula);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    hyperformula,
    getOptions,
    eventEmitter,
    getViewWidthHeight,
  );

  const print = getPrint(rootEl, getData);

  const { sheet } = getSheet(
    toolbar,
    print,
    sheetBuilder,
    rootEl,
    table,
    eventEmitter,
    hyperformula,
    getOptions,
    getData,
    getDataProxy,
    getViewWidthHeight,
    () => {
      variablesSpreadsheet.sheet.setLastFocused(false);
    },
  );

  const variablesSpreadsheet = buildVariablesSpreadsheet(
    variablesEventEmitter,
    toolbar,
    formulaBar,
    print,
    sheet,
    rootEl,
    variablesSpreadsheetOptions,
    hyperformula,
  );

  const draw = getDraw(
    table.el.el,
    getViewWidthHeight().width,
    getViewWidthHeight().height,
  );

  table.setDraw(draw);

  const setDatasheets = sheet.makeSetDatasheets(getDataProxy);

  const getDatas = () => {
    return {
      datas: sheet.getDataValues(),
      variablesDatas: variablesSpreadsheet.sheet.getDataValues(),
    };
  };

  const bottombar = getBottombar(eventEmitter, sheet.getDataValues, () =>
    getData().getData(),
  );

  sheet.el.after(bottombar.el);
  rootEl.children(print.el);

  return {
    sheet,
    toolbar,
    variablesSpreadsheet,
    rootEl,
    setDatasheets,
    getDatas,
    setOptions,
    hyperformula,
    eventEmitter,
  };
};
