import { getTable } from "../table/getTable";
import withToolbar from "../withToolbar";
import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { getBottombar } from "../bottombar";
import { withVariablesSpreadsheet } from "../withVariablesSpreadsheet";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";

export const buildSpreadsheet = (
  rootEl,
  getOptions,
  getData,
  hyperformula,
  eventEmitter,
) => {
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
  };
};
