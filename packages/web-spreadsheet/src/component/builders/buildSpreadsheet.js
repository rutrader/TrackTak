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
import Save from "../save/Save";

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

      if (spreadsheet.sheet?.getLastFocused()) {
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
    if (spreadsheet.sheet?.getLastFocused()) {
      return getData();
    }

    return variablesSpreadsheet.getData();
  };

  const getOptions = () => newOptions;

  const setOptions = (options) => {
    newOptions = getNewOptions(
      options,
      defaultOptions,
      newData,
      spreadsheet?.sheet,
    );
  };

  setOptions(options);

  const getDatas = () => {
    return {
      datas: spreadsheet.sheet.getDataValues(),
      variablesDatas: variablesSpreadsheet.sheet.getDataValues(),
    };
  };

  const history = new Manager(({ type, name, data }) => {
    let currentData;
    let currentSheet =
      type === "main" ? spreadsheet.sheet : variablesSpreadsheet.sheet;

    currentData = currentSheet.getData().getData();
    currentSheet.getData().setData(data);

    return {
      type,
      name,
      data: currentData,
    };
  }, 20);

  const save = new Save(history, globalEventEmitter, getDatas);

  modifyEventEmitter(eventEmitter, getOptions().debugMode, "spreadsheet");

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  eventEmitter.on(spreadsheetEvents.sheet.cellSelected, () => {
    variablesSpreadsheet.sheet.selector.el.hide();
  });

  variablesEventEmitter.on(spreadsheetEvents.sheet.cellSelected, () => {
    spreadsheet.sheet.selector.el.hide();
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

  const mainSheetType = "main";

  const sheetBuilder = buildSheet(
    mainSheetType,
    save,
    getOptions,
    getData,
    rangeSelector,
    eventEmitter,
    getViewWidthHeight,
  );

  const dataProxyBuilder = buildDataProxy(
    rangeSelector,
    getOptions,
    getFocusedData,
    hyperformula,
  );

  const getDataProxy = makeGetDataProxy(
    mainSheetType,
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

  const print = getPrint(rootEl, getData);

  const spreadsheet = getSheet(
    mainSheetType,
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
      variablesSpreadsheet.sheet.setLastFocused(false);
    },
  );

  const variablesSpreadsheet = buildVariablesSpreadsheet(
    variablesEventEmitter,
    save,
    getFocusedData,
    toolbar,
    rangeSelector,
    clipboard,
    history,
    formulaBar,
    print,
    spreadsheet.sheet,
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

  const setDatasheets = spreadsheet.sheet.makeSetDatasheets(getDataProxy);

  const bottombar = getBottombar(
    "sheet",
    eventEmitter,
    spreadsheet.sheet.getDataValues,
    () => getData().getData(),
  );

  spreadsheet.sheet.el.after(bottombar.el);
  rootEl.children(print.el);

  bind(window, "paste", (evt) => {
    evt.preventDefault();

    const paste = getFocusedData().rows.copyPasteAll;

    if (spreadsheet.sheet?.getLastFocused()) {
      spreadsheet.sheet.paste(paste);

      return;
    }

    variablesSpreadsheet.sheet.paste(paste);
  });

  return {
    toolbar,
    spreadsheet,
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
