import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import { getVariablesTable } from "../table/getVariablesTable";
import withVariablesToolbar from "../withVariablesToolbar";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";
import spreadsheetEvents from "../../core/spreadsheetEvents";

export const buildVariablesSpreadsheet = (
  sheetEl,
  rootEl,
  getOptions,
  hyperformula,
  eventEmitter,
) => {
  let newData;

  const getData = () => newData;

  eventEmitter.on(spreadsheetEvents.variablesSheet.switchData, (data) => {
    newData = data;
  });

  const variablesTable = getVariablesTable(
    getOptions,
    getData,
    hyperformula,
    eventEmitter,
  );
  const sheetBuilder = buildSheet(getOptions, getData, eventEmitter, true);
  const { sheet: variablesSheet, variablesToolbar } = withVariablesToolbar(
    getSheet(
      sheetBuilder,
      rootEl,
      variablesTable,
      eventEmitter,
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
    eventEmitter,
    true,
  );

  const setVariableDatasheets = variablesSheet.makeSetDatasheets(getDataProxy);

  sheetEl.before(variablesSheet.el);
  variablesSheet.el.before(variablesToolbar.el);

  return {
    variablesSheet,
    variablesToolbar,
    rootEl,
    setVariableDatasheets,
  };
};
