import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import withVariablesToolbar from "../withVariablesToolbar";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { getBottombar } from "../bottombar";
import EventEmitter from "events";
import { modifyEventEmitter } from "../../shared/modifyEventEmitter";
import { getNewOptions } from "./getNewOptions";
import { defaultVariablesSpreadsheetOptions } from "../../core/defaultOptions";
import { getTable } from "../table/getTable";
import { makeGetVariablesSheetViewWidthHeight } from "../makeGetVariablesSheetViewWidthHeight";
import getDraw from "../../canvas/draw";
import { cssPrefix } from "../../config";

export const buildVariablesSpreadsheet = (
  sheetEl,
  rootEl,
  options,
  hyperformula,
) => {
  let newData;
  let newOptions;

  const eventEmitter = new EventEmitter();

  const getOptions = () => newOptions;

  const setOptions = (options) => {
    newOptions = getNewOptions(
      options,
      defaultVariablesSpreadsheetOptions,
      hyperformula,
      newData,
      sheet,
    );
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

  const table = getTable(getOptions, getData, hyperformula, getViewWidthHeight);

  const draw = getDraw(
    table.el.el,
    getViewWidthHeight().width,
    getViewWidthHeight().height,
  );

  table.setDraw(draw);

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

  const { sheet, toolbar } = withVariablesToolbar(
    getSheet(
      sheetBuilder,
      rootEl,
      table,
      eventEmitter,
      hyperformula,
      getOptions,
      getData,
      getDataProxy,
      getViewWidthHeight,
    ),
  );

  sheet.el.addClass(`${cssPrefix}-variables-sheet`);

  const setVariableDatasheets = sheet.makeSetDatasheets(getDataProxy);

  const bottombar = getBottombar(eventEmitter);

  sheetEl.before(sheet.el);
  sheet.el.before(toolbar.el);
  sheetEl.before(bottombar.el);

  return {
    sheet,
    toolbar,
    rootEl,
    setVariableDatasheets,
    setOptions,
    getOptions,
    eventEmitter,
  };
};
