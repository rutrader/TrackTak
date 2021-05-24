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

const buildSpreadsheet = (element, options, hyperformula, eventEmitter) => {
  const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
    evt.preventDefault(),
  );

  const table = getTable(options, hyperformula, eventEmitter);
  const sheetBuilder = buildSheet(options, eventEmitter);
  const sheet = withToolbar(
    getSheet(sheetBuilder, rootEl, table, eventEmitter, hyperformula, options),
  );

  const dataProxyBuilder = buildDataProxy(options, hyperformula);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    options,
    eventEmitter,
  );

  const setDatasheets = sheet.makeSetDatasheets(getDataProxy);

  getBottombar(rootEl, eventEmitter);

  element.appendChild(rootEl.el);

  const showFormulas = () => {
    table.setCalculateFormulas(false);
    table.render();
  };

  const hideFormulas = () => {
    table.setCalculateFormulas(true);
    table.render();
  };

  eventEmitter.on(spreadsheetEvents.bottombar.addSheet, () => {
    const data = sheet.addData(getDataProxy);

    sheet.switchData(data);
  });

  return {
    sheet,
    rootEl,
    showFormulas,
    hideFormulas,
    setDatasheets,
  };
};

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

  // const variablesTable = getVariablesTable(options, hyperformula, eventEmitter);
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
  const newOptions = merge(defaultOptions, options);
  const hyperformula = HyperFormula.buildEmpty({
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });
  const eventEmitter = new EventEmitter();

  const {
    rootEl,
    sheet,
    showFormulas,
    hideFormulas,
    setDatasheets,
  } = buildSpreadsheet(element, newOptions, hyperformula, eventEmitter);

  const setVariables = (variables) => {
    Object.keys(variables).forEach((key) => {
      const value = variables[key];

      if (hyperformula.isItPossibleToChangeNamedExpression(key, value)) {
        hyperformula.changeNamedExpression(key, value);
      }

      if (hyperformula.isItPossibleToAddNamedExpression(key, value)) {
        hyperformula.addNamedExpression(key, value);
      }
    });
  };

  const destroy = () => {
    rootEl.destroy();
  };

  return {
    sheet,
    setVariables,
    destroy,
    showFormulas,
    hideFormulas,
    hyperformula,
    eventEmitter,
    setDatasheets,
  };
};

export default getSpreadsheet;
export { locale };
