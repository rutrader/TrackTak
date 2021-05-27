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

export const buildSpreadsheet = (
  rootEl,
  options,
  hyperformula,
  eventEmitter,
) => {
  let newData;
  let newOptions;

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

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  const getData = () => newData;

  const table = getTable(getOptions, getData, hyperformula, eventEmitter);
  const sheetBuilder = buildSheet(getOptions, getData, eventEmitter);

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
      ),
    ),
  );

  const dataProxyBuilder = buildDataProxy(getOptions, hyperformula);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    getOptions,
    eventEmitter,
  );

  const setDatasheets = sheet.makeSetDatasheets(getDataProxy);

  getBottombar(rootEl, eventEmitter);

  sheet.el.before(toolbar.el);

  eventEmitter.on(spreadsheetEvents.bottombar.addSheet, () => {
    const data = sheet.addData(getDataProxy);

    sheet.switchData(data);
  });

  return {
    sheet,
    toolbar,
    variablesSpreadsheet,
    rootEl,
    setDatasheets,
    setOptions,
  };
};
