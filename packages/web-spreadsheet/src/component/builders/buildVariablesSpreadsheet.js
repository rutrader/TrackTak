import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import { getVariablesTable } from "../table/getVariablesTable";
import withVariablesToolbar from "../withVariablesToolbar";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";

export const buildVariablesSpreadsheet = (
  sheetEl,
  rootEl,
  getOptions,
  getData,
  hyperformula,
  eventEmitter,
) => {
  const variablesTable = getVariablesTable(
    getOptions,
    getData,
    hyperformula,
    eventEmitter,
  );
  const sheetBuilder = buildSheet(getOptions, getData, eventEmitter);
  const { sheet: variablesSheet, variablesToolbar } = withVariablesToolbar(
    getSheet(
      sheetBuilder,
      rootEl,
      variablesTable,
      eventEmitter,
      hyperformula,
      getOptions,
      getData,
    ),
  );

  const dataProxyBuilder = buildDataProxy(getOptions, hyperformula);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    getOptions,
    eventEmitter,
  );

  const setDatasheets = variablesSheet.makeSetDatasheets(getDataProxy);

  sheetEl.before(variablesSheet.el);

  return {
    variablesSheet,
    variablesToolbar,
    rootEl,
    setDatasheets,
  };
};
