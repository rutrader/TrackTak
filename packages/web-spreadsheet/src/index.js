import { h } from "./component/element";
import { getDataProxy } from "./core/getDataProxy";
import { getSheet } from "./component/getSheet";
import { getBottombar } from "./component/bottombar";
import { cssPrefix } from "./config";
import { locale, tf } from "./locale/locale";
import "./index.less";
import { HyperFormula } from "hyperformula";
import { formatNumberRender, formatStringRender } from "./core/helper";
import defaultOptions from "./core/defaultOptions";
import { merge } from "lodash-es";
import EventEmitter from "events";
import spreadsheetEvents from "./core/spreadsheetEvents";
import withToolbar from "./component/withToolbar";

const getSpreadsheet = (element, options) => {
  let datas = [];
  let newOptions = merge(defaultOptions, options);
  const eventEmitter = new EventEmitter();

  const formats = {
    normal: {
      title: tf("format.normal"),
      type: "string",
      render: formatStringRender,
    },
    text: {
      title: tf("format.text"),
      type: "string",
      render: formatStringRender,
    },
    number: {
      title: tf("format.number"),
      type: "number",
      label: "1,000.12",
      render: formatNumberRender,
    },
    percent: {
      title: tf("format.percent"),
      type: "number",
      label: "10.12%",
      render: (v) => `${formatNumberRender(v * 100)}%`,
    },
    date: {
      title: tf("format.date"),
      type: "date",
      label: "26/09/2008",
      render: formatStringRender,
    },
    time: {
      title: tf("format.time"),
      type: "date",
      label: "15:59:00",
      render: formatStringRender,
    },
    datetime: {
      title: tf("format.datetime"),
      type: "date",
      label: "26/09/2008 15:59:00",
      render: formatStringRender,
    },
    duration: {
      title: tf("format.duration"),
      type: "date",
      label: "24:01:00",
      render: formatStringRender,
    },
    ...(options.formats ?? {}),
  };

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
    const d = datas[index];

    sheet.resetData(d);
  });

  eventEmitter.on(spreadsheetEvents.bottombar.clickContextMenu, (key) => {
    if (key === "delete") {
      deleteSheetData();
    }
  });

  eventEmitter.on(spreadsheetEvents.bottombar.updateSheet, (index, value) => {
    datas[index].name = value;
  });

  const bottombar = getBottombar(eventEmitter);

  const addSheetData = (
    name = `sheet${datas.length + 1}`,
    active = true,
    options = newOptions,
  ) => {
    const data = getDataProxy(name, options, hyperFormula, eventEmitter);

    if (hyperFormula.isItPossibleToAddSheet(name)) {
      hyperFormula.addSheet(name);
    }
    datas.push(data);

    bottombar.addItem(name, active);

    return data;
  };

  const addVariablesSheetData = (
    name = `variables-sheet${datas.length + 1}`,
    options = newOptions,
  ) => {
    const data = getDataProxy(name, options, hyperFormula, eventEmitter);

    return data;
  };

  const setVariablesData = (variableSheets) => {
    variableSheets.forEach((variableSheet, i) => {
      const data = addVariablesSheetData(variableSheet.name);

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
    datas = [];

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

  const variablesSheet = getSheet(
    variablesData,
    hyperFormula,
    formats,
    eventEmitter,
  );

  const sheet = withToolbar(
    getSheet(data, hyperFormula, formats, eventEmitter),
  )(rootEl);

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
      datas.splice(oldIndex, 1);
      if (nindex >= 0) {
        sheet.resetData(datas[nindex]);
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
    return datas.map((it) => it.getData());
  };

  const cellText = (ri, ci, text, sheetIndex = 0) => {
    datas[sheetIndex].setCellText(ri, ci, text, "finished");
  };

  const cell = (ri, ci, sheetIndex = 0) => {
    return datas[sheetIndex].getCell(ri, ci);
  };

  const cellStyle = (ri, ci, sheetIndex = 0) => {
    return datas[sheetIndex].getCellStyle(ri, ci);
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
