import { getTable } from "../table/getTable";
import withToolbar from "../withToolbar";
import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { getBottombar } from "../bottombar";
import { withVariablesSpreadsheet } from "../withVariablesSpreadsheet";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";
import defaultOptions from "../../core/defaultOptions";
import { merge } from "lodash-es";
import EventEmitter from "events";
import { modifyEventEmitter } from "../../shared/modifyEventEmitter";
import { HyperFormula } from "hyperformula";

export const buildSpreadsheet = (rootEl, options) => {
  let newData;
  let newOptions;

  const spreadsheetEventEmitter = new EventEmitter();
  const hyperformula = HyperFormula.buildEmpty({
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });

  const setOptions = (options) => {
    newOptions = merge(defaultOptions, options);

    Object.keys(newOptions.variables).forEach((key) => {
      const value = newOptions.variables[key];

      if (hyperformula.isItPossibleToChangeNamedExpression(key, value)) {
        hyperformula.changeNamedExpression(key, value);
      }

      if (hyperformula.isItPossibleToAddNamedExpression(key, value)) {
        hyperformula.addNamedExpression(key, value);
      }
    });

    if (newData) {
      sheet.sheetReset();
    }
  };

  const getOptions = () => newOptions;

  setOptions(options);

  modifyEventEmitter(
    spreadsheetEventEmitter,
    getOptions().debugMode,
    "spreadsheet",
  );

  spreadsheetEventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  const getData = () => newData;

  const table = getTable(
    getOptions,
    getData,
    hyperformula,
    spreadsheetEventEmitter,
  );
  const sheetBuilder = buildSheet(getOptions, getData, spreadsheetEventEmitter);

  const dataProxyBuilder = buildDataProxy(getOptions, hyperformula);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    getOptions,
    spreadsheetEventEmitter,
  );

  const { sheet, variablesSpreadsheet, toolbar } = withToolbar(
    withVariablesSpreadsheet(
      getSheet(
        sheetBuilder,
        rootEl,
        table,
        spreadsheetEventEmitter,
        hyperformula,
        getOptions,
        getData,
        getDataProxy,
      ),
    ),
  );

  const setDatasheets = sheet.makeSetDatasheets(getDataProxy);

  const bottombar = getBottombar(spreadsheetEventEmitter);

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
    spreadsheetEventEmitter,
  };
};
