import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import { getVariablesTable } from "../table/getVariablesTable";
import withVariablesToolbar from "../withVariablesToolbar";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { getBottombar } from "../bottombar";
import EventEmitter from "events";
import { modifyEventEmitter } from "../../shared/modifyEventEmitter";

export const buildVariablesSpreadsheet = (
  sheetEl,
  rootEl,
  getOptions,
  hyperformula,
) => {
  const variablesSpreadsheetEventEmitter = new EventEmitter();

  modifyEventEmitter(
    variablesSpreadsheetEventEmitter,
    getOptions().debugMode,
    "variablesSpreadsheet",
  );

  let newData;

  const getData = () => newData;

  variablesSpreadsheetEventEmitter.on(
    spreadsheetEvents.sheet.switchData,
    (data) => {
      newData = data;
    },
  );

  const variablesTable = getVariablesTable(
    getOptions,
    getData,
    hyperformula,
    variablesSpreadsheetEventEmitter,
  );
  const sheetBuilder = buildSheet(
    getOptions,
    getData,
    variablesSpreadsheetEventEmitter,
    true,
  );
  const { sheet: variablesSheet, variablesToolbar } = withVariablesToolbar(
    getSheet(
      sheetBuilder,
      rootEl,
      variablesTable,
      variablesSpreadsheetEventEmitter,
      hyperformula,
      getOptions,
      getData,
      true,
    ),
  );

  const dataProxyBuilder = buildDataProxy(getOptions, hyperformula, true);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    getOptions,
    variablesSpreadsheetEventEmitter,
    true,
  );

  const setVariableDatasheets = variablesSheet.makeSetDatasheets(getDataProxy);

  const bottombar = getBottombar(variablesSpreadsheetEventEmitter);

  sheetEl.before(variablesSheet.el);
  variablesSheet.el.before(variablesToolbar.el);
  sheetEl.before(bottombar.el);

  return {
    variablesSheet,
    variablesToolbar,
    rootEl,
    setVariableDatasheets,
  };
};
