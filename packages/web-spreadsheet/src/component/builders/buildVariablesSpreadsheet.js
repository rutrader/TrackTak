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
import { HyperFormula } from "hyperformula";
import { hyperformulaLicenseKey } from "../../shared/hyperformulaLicenseKey";
import { getNewOptions } from "./getNewOptions";
import { defaultVariablesSpreadsheetOptions } from "../../core/defaultOptions";

export const buildVariablesSpreadsheet = (sheetEl, rootEl, options) => {
  let newData;
  let newOptions;

  const eventEmitter = new EventEmitter();
  const hyperformula = HyperFormula.buildEmpty({
    licenseKey: hyperformulaLicenseKey,
  });

  const getOptions = () => newOptions;

  const setOptions = (options) => {
    newOptions = getNewOptions(
      options,
      defaultVariablesSpreadsheetOptions,
      hyperformula,
      newData,
      variablesSheet,
    );
  };

  setOptions(options);

  modifyEventEmitter(
    eventEmitter,
    getOptions().debugMode,
    "variablesSpreadsheet",
  );

  const getData = () => newData;

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  const variablesTable = getVariablesTable(
    getOptions,
    getData,
    hyperformula,
    eventEmitter,
  );
  const sheetBuilder = buildSheet(getOptions, getData, eventEmitter, true);

  const dataProxyBuilder = buildDataProxy(getOptions, getData, hyperformula);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    getOptions,
    eventEmitter,
    true,
  );

  const { sheet: variablesSheet, variablesToolbar } = withVariablesToolbar(
    getSheet(
      sheetBuilder,
      rootEl,
      variablesTable,
      eventEmitter,
      hyperformula,
      getOptions,
      getData,
      getDataProxy,
      true,
    ),
  );

  const setVariableDatasheets = variablesSheet.makeSetDatasheets(getDataProxy);

  const bottombar = getBottombar(eventEmitter);

  sheetEl.before(variablesSheet.el);
  variablesSheet.el.before(variablesToolbar.el);
  sheetEl.before(bottombar.el);

  return {
    variablesSheet,
    variablesToolbar,
    rootEl,
    setVariableDatasheets,
    setOptions,
  };
};
