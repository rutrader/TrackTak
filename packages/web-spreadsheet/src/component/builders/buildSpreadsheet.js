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
import getRangeSelector from "../../core/getRangeSelector";
import getClipboard from "../../core/getClipboard";
import { getFormulaBar } from "../editor/getFormulaBar";
import { getFormulaSuggestions } from "../../shared/getFormulaSuggestions";
import Manager from "undo-redo-manager";
import { bind } from "../event";

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
      if (
        args[0] === spreadsheetEvents.toolbar.toggleItem ||
        args[0] === spreadsheetEvents.toolbar.clickIcon
      ) {
        if (args[1] === "formula" || args[1] === "export") {
          eventEmitter.emit(...args);
          variablesEventEmitter.emit(...args);
        }

        if (args[1] === "yoyGrowth") {
          eventEmitter.emit(...args);
        }
      }

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

    return variablesSpreadsheet.getData();
  };

  const getOptions = () => newOptions;

  const setOptions = (options) => {
    newOptions = getNewOptions(options, defaultOptions, newData, sheet);
  };

  setOptions(options);

  const getDatas = () => {
    return {
      datas: sheet.getDataValues(),
      variablesDatas: variablesSpreadsheet.sheet.getDataValues(),
    };
  };

  modifyEventEmitter(
    eventEmitter,
    getOptions().debugMode,
    "spreadsheet",
    getDatas,
  );

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  eventEmitter.on(spreadsheetEvents.sheet.cellSelected, () => {
    variablesSpreadsheet.sheet.selector.el.hide();
  });

  variablesEventEmitter.on(spreadsheetEvents.sheet.cellSelected, () => {
    sheet.selector.el.hide();
  });

  const getViewWidthHeight = makeGetViewWidthHeight(getOptions, () => {
    return variablesSpreadsheet.getOptions();
  });

  const rangeSelector = getRangeSelector();

  const table = getTable(
    getOptions,
    getData,
    rangeSelector,
    hyperformula,
    getViewWidthHeight,
  );

  const history = new Manager(({ type, data }) => {
    let currentData;
    let currentSheet = type === "main" ? sheet : variablesSpreadsheet.sheet;

    currentData = currentSheet.getData().getData();
    currentSheet.getData().setData(data);

    currentSheet.sheetReset();
    sheet.sheetReset();

    return {
      type,
      data: currentData,
    };
  }, 20);
  const toolbar = getToolbar(
    getOptions,
    getFocusedData,
    rangeSelector,
    history,
    globalEventEmitter,
  );

  const clipboard = getClipboard(hyperformula, getData);

  const formulaBar = getFormulaBar(
    getOptions,
    getFocusedData,
    getFormulaSuggestions(),
    globalEventEmitter,
  );

  const sheetBuilder = buildSheet(
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
    "main",
    rangeSelector,
    clipboard,
    dataProxyBuilder,
    hyperformula,
    getOptions,
    eventEmitter,
    getViewWidthHeight,
    history,
  );

  const print = getPrint(rootEl, getData);

  const { sheet } = getSheet(
    toolbar,
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
      variablesSpreadsheet.sheet.setLastFocused(false);
    },
  );

  const variablesSpreadsheet = buildVariablesSpreadsheet(
    variablesEventEmitter,
    getFocusedData,
    toolbar,
    rangeSelector,
    clipboard,
    history,
    formulaBar,
    print,
    sheet,
    rootEl,
    variablesSpreadsheetOptions,
    hyperformula,
    getDatas,
  );

  const draw = getDraw(
    table.el.el,
    getViewWidthHeight().width,
    getViewWidthHeight().height,
  );

  table.setDraw(draw);

  const setDatasheets = sheet.makeSetDatasheets(getDataProxy);

  const bottombar = getBottombar(
    "sheet",
    eventEmitter,
    sheet.getDataValues,
    () => getData().getData(),
  );

  sheet.el.after(bottombar.el);
  rootEl.children(print.el);

  bind(window, "paste", (evt) => {
    evt.preventDefault();

    const paste = getFocusedData().rows.copyPasteAll;

    if (sheet?.getLastFocused()) {
      sheet.paste(paste);

      return;
    }

    variablesSpreadsheet.sheet.paste(paste);
  });

  return {
    sheet,
    toolbar,
    variablesSpreadsheet,
    rootEl,
    setDatasheets,
    getDatas,
    getData,
    setOptions,
    hyperformula,
    eventEmitter,
  };
};
