import { h } from "./component/element";
import { getDataProxy } from "./core/data_proxy";
import { getSheet } from "./component/sheet";
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
    const data = addSheet();

    sheet.resetData(data);
  });

  eventEmitter.on(spreadsheetEvents.bottombar.selectSheet, (index) => {
    const d = datas[index];

    sheet.resetData(d);
  });

  eventEmitter.on(spreadsheetEvents.bottombar.clickContextMenu, (key) => {
    if (key === "delete") {
      deleteSheet();
    }
  });

  eventEmitter.on(spreadsheetEvents.bottombar.updateSheet, (index, value) => {
    datas[index].name = value;
  });

  const bottombar = getBottombar(eventEmitter);

  const addSheet = (
    name = `sheet${datas.length + 1}`,
    active = true,
    options = newOptions,
  ) => {
    const data = getDataProxy(name, options, hyperFormula);

    data.change(sheet);

    datas.push(data);

    bottombar.addItem(name, active);

    return data;
  };

  const data = addSheet();

  const sheet = getSheet(rootEl, data, hyperFormula, formats, eventEmitter);

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

  const deleteSheet = () => {
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
    sheet.table.calculateFormulas = false;
    reRender();
  };

  const hideFormulas = () => {
    sheet.table.calculateFormulas = true;
    reRender();
  };

  const setData = (dataSheets) => {
    bottombar.clear();
    datas = [];
    if (dataSheets.length > 0) {
      for (let i = 0; i < dataSheets.length; i += 1) {
        const it = dataSheets[i];
        const nd = addSheet(it.name, i === 0);

        if (hyperFormula.isItPossibleToAddSheet(it.name)) {
          hyperFormula.addSheet(it.name);
        }
        nd.setData(it);
        if (i === 0) {
          sheet.resetData(nd);
        }
      }
    }
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

  const on = (eventName, func) => {
    sheet.on(eventName, func);
  };

  const validate = () => {
    const { validations } = data;
    return validations.errors.size <= 0;
  };

  const change = (cb) => {
    sheet.on("change", cb);
  };

  return {
    addSheet,
    setVariables,
    deleteSheet,
    destroy,
    showFormulas,
    hideFormulas,
    setData,
    getData,
    cellText,
    cell,
    cellStyle,
    reRender,
    on,
    validate,
    change,
    hyperFormula,
    eventEmitter,
  };
};

export default getSpreadsheet;
export { locale };
