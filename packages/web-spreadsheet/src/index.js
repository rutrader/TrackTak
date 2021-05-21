import { h } from "./component/element";
import { getDataProxy } from "./core/getDataProxy";
import { getSheet } from "./component/getSheet";
import { getBottombar } from "./component/bottombar";
import { cssPrefix } from "./config";
import { locale } from "./locale/locale";
import "./index.less";
import { HyperFormula } from "hyperformula";
import defaultOptions from "./core/defaultOptions";
import { merge } from "lodash-es";
import EventEmitter from "events";
import spreadsheetEvents from "./core/spreadsheetEvents";
import withToolbar from "./component/withToolbar";
import { getTable } from "./component/table/getTable";
import { getVariablesTable } from "./component/table/getVariablesTable";

const getSpreadsheet = (element, options) => {
  const newOptions = merge(defaultOptions, options);

  let sheetDatas = [];
  let variablesSheetDatas = [];
  const eventEmitter = new EventEmitter();

  const hyperFormula = HyperFormula.buildEmpty({
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });
  const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
    evt.preventDefault(),
  );

  eventEmitter.on(spreadsheetEvents.bottombar.addSheet, () => {
    const data = addSheetData();

    sheet.resetData(data);
  });

  eventEmitter.on(spreadsheetEvents.bottombar.selectSheet, (index) => {
    const d = sheetDatas[index];

    sheet.resetData(d);
  });

  eventEmitter.on(spreadsheetEvents.bottombar.clickContextMenu, (key) => {
    if (key === "delete") {
      deleteSheetData();
    }
  });

  eventEmitter.on(spreadsheetEvents.bottombar.updateSheet, (index, value) => {
    sheetDatas[index].name = value;
  });

  const bottombar = getBottombar(eventEmitter);

  const addSheetData = (
    name = `sheet${sheetDatas.length + 1}`,
    active = true,
  ) => {
    const data = getDataProxy(name, newOptions, hyperFormula, eventEmitter);

    if (hyperFormula.isItPossibleToAddSheet(name)) {
      hyperFormula.addSheet(name);
    }
    sheetDatas.push(data);

    bottombar.addItem(name, active);

    return data;
  };

  const addVariablesSheetData = (
    name = `variables-sheet${sheetDatas.length + 1}`,
  ) => {
    const data = getDataProxy(
      name,
      newOptions,
      hyperFormula,
      eventEmitter,
      true,
    );

    if (hyperFormula.isItPossibleToAddSheet(name)) {
      hyperFormula.addSheet(name);
    }

    variablesSheetDatas.push(data);

    return data;
  };

  const setVariablesData = (variableSheets) => {
    variablesSheetDatas = [];

    variableSheets.forEach((variableSheet, i) => {
      const options = merge(defaultOptions, newOptions[i]);
      const data = addVariablesSheetData(variableSheet.name, options);

      if (hyperFormula.isItPossibleToAddSheet(variableSheet.name)) {
        hyperFormula.addSheet(variableSheet.name);
      }

      data.setData(variableSheet);

      if (i === 0) {
        variablesSheet.resetData(data);
      }
    });
  };

  const setData = (dataSheets) => {
    bottombar.clear();
    sheetDatas = [];

    dataSheets.forEach((dataSheet, i) => {
      const data = addSheetData(dataSheet.name, i === 0);

      data.setData(dataSheet);

      if (i === 0) {
        sheet.resetData(data);
      }
    });
  };

  const data = addSheetData();
  const variablesData = addVariablesSheetData();

  const table = getVariablesTable(data, hyperFormula);
  const variablesSheet = getSheet(variablesData, table, eventEmitter);

  const table2 = getTable(data, hyperFormula);
  const sheet = withToolbar(getSheet(data, table2, eventEmitter))(rootEl);

  rootEl.child(variablesSheet.el);
  rootEl.child(sheet.el);

  // create canvas element
  element.appendChild(rootEl.el);

  rootEl.child(bottombar.el);

  const setVariables = (variables) => {
    Object.keys(variables).forEach((key) => {
      const value = variables[key];

      if (hyperFormula.isItPossibleToChangeNamedExpression(key, value)) {
        hyperFormula.changeNamedExpression(key, value);
      }

      if (hyperFormula.isItPossibleToAddNamedExpression(key, value)) {
        hyperFormula.addNamedExpression(key, value);
      }
    });
  };

  const deleteSheetData = () => {
    const [oldIndex, nindex] = bottombar.deleteItem();
    if (oldIndex >= 0) {
      sheetDatas.splice(oldIndex, 1);
      if (nindex >= 0) {
        sheet.resetData(sheetDatas[nindex]);
      }
    }
  };

  const destroy = () => {
    rootEl.destroy();
  };

  const showFormulas = () => {
    sheet.table.setCalculateFormulas(false);
    reRender();
  };

  const hideFormulas = () => {
    sheet.table.setCalculateFormulas(true);
    reRender();
  };

  const getData = () => {
    return sheetDatas.map((it) => it.getData());
  };

  const cellText = (ri, ci, text, sheetIndex = 0) => {
    sheetDatas[sheetIndex].setCellText(ri, ci, text, "finished");
  };

  const cell = (ri, ci, sheetIndex = 0) => {
    return sheetDatas[sheetIndex].getCell(ri, ci);
  };

  const cellStyle = (ri, ci, sheetIndex = 0) => {
    return sheetDatas[sheetIndex].getCellStyle(ri, ci);
  };

  const reRender = () => {
    sheet.table.render();
  };

  const validate = () => {
    const { validations } = data;
    return validations.errors.size <= 0;
  };

  return {
    addSheetData,
    setVariables,
    setVariablesData,
    deleteSheetData,
    destroy,
    showFormulas,
    hideFormulas,
    setData,
    getData,
    cellText,
    cell,
    cellStyle,
    reRender,
    validate,
    hyperFormula,
    eventEmitter,
  };
};

export default getSpreadsheet;
export { locale };
