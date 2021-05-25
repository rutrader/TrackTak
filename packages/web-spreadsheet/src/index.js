import { h } from "./component/element";
import { buildSheet, getSheet } from "./component/getSheet";
import { getBottombar } from "./component/bottombar";
import { cssPrefix } from "./config";
import { locale } from "./locale/locale";
import "./index.less";
import { HyperFormula } from "hyperformula";
import EventEmitter from "events";
import spreadsheetEvents from "./core/spreadsheetEvents";
import withToolbar from "./component/withToolbar";
import { getTable } from "./component/table/getTable";
import defaultOptions from "./core/defaultOptions";
import { merge } from "lodash-es";
import { buildDataProxy, makeGetDataProxy } from "./core/makeGetDataProxy";

const buildSpreadsheet = (
  element,
  getOptions,
  getData,
  hyperformula,
  eventEmitter,
) => {
  const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
    evt.preventDefault(),
  );

  const table = getTable(getOptions, getData, hyperformula, eventEmitter);
  const sheetBuilder = buildSheet(getOptions, getData, eventEmitter);
  const sheet = withToolbar(
    getSheet(
      sheetBuilder,
      rootEl,
      table,
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

  const setDatasheets = sheet.makeSetDatasheets(getDataProxy);

  getBottombar(rootEl, eventEmitter);

  element.appendChild(rootEl.el);

  eventEmitter.on(spreadsheetEvents.bottombar.addSheet, () => {
    const data = sheet.addData(getDataProxy);

    sheet.switchData(data);
  });

  return {
    sheet,
    rootEl,
    setDatasheets,
  };
};

const buildVariablesSheet = () => {};

const getSpreadsheet = (element, options) => {
  // const setVariablesData = (variableSheets) => {
  //   variablesSheetDatas = [];

  //   variableSheets.forEach((variableSheet, i) => {
  //     const options = merge(defaultOptions, newOptions[i]);
  //     const data = addVariablesSheetData(variableSheet.name, options);

  //     if (hyperformula.isItPossibleToAddSheet(variableSheet.name)) {
  //       hyperformula.addSheet(variableSheet.name);
  //     }

  //     data.setData(variableSheet);

  //     if (i === 0) {
  //       variablesSheet.switchData(data);
  //     }
  //   });
  // };

  // const variablesData = addVariablesSheetData();

  // const variablesTable = getVariablesTable(getOptions, getData, hyperformula, eventEmitter);
  // const variablesSheet = withVariablesToolbar(
  //   getSheet(
  //     rootEl,
  //     variablesData,
  //     variablesTable,
  //     eventEmitter,
  //     hyperformula,
  //     options,
  //     true,
  //   ),
  // );
  const eventEmitter = new EventEmitter();
  const hyperformula = HyperFormula.buildEmpty({
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });

  let newData;
  let newOptions;

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  const getData = () => newData;

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

  const { rootEl, sheet, setDatasheets } = buildSpreadsheet(
    element,
    getOptions,
    getData,
    hyperformula,
    eventEmitter,
  );

  const destroy = () => {
    rootEl.destroy();
  };

  return {
    sheet,
    setOptions,
    destroy,
    hyperformula,
    eventEmitter,
    setDatasheets,
  };
};

export default getSpreadsheet;
export { locale };
