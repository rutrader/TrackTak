import { getTable } from "../table/getTable";
import withToolbar from "../withToolbar";
import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { getBottombar } from "../bottombar";
import { withVariablesSpreadsheet } from "../withVariablesSpreadsheet";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";
import EventEmitter from "events";
import { modifyEventEmitter } from "../../shared/modifyEventEmitter";
import { HyperFormula } from "hyperformula";
import { hyperformulaLicenseKey } from "../../shared/hyperformulaLicenseKey";
import { getNewOptions } from "./getNewOptions";
import { defaultOptions } from "../../core/defaultOptions";

export const buildSpreadsheet = (
  rootEl,
  options,
  variablesSpreadsheetOptions,
) => {
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

  const getData = () => newData;

  const table = getTable(getOptions, getData, hyperformula, eventEmitter);
  const sheetBuilder = buildSheet(getOptions, getData, eventEmitter);

  const dataProxyBuilder = buildDataProxy(getOptions, getData, hyperformula);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    getOptions,
    eventEmitter,
  );

  const { sheet, variablesSpreadsheet, toolbar } = withToolbar(
    withVariablesSpreadsheet(
      getSheet(
        sheetBuilder,
        rootEl,
        table,
        eventEmitter,
        hyperformula,
        getOptions,
        getData,
        getDataProxy,
      ),
      variablesSpreadsheetOptions,
    ),
  );

  const setDatasheets = sheet.makeSetDatasheets(getDataProxy);

  const bottombar = getBottombar(eventEmitter);

  sheet.el.before(toolbar.el);
  sheet.el.after(bottombar.el);

  return {
    sheet,
    toolbar,
    variablesSpreadsheet,
    rootEl,
    setDatasheets,
    setOptions,
    hyperformula,
    eventEmitter,
  };
};
