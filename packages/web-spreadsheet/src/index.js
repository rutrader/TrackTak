import { h } from "./component/element";
import DataProxy from "./core/data_proxy";
import Sheet from "./component/sheet";
import Bottombar from "./component/bottombar";
import { cssPrefix } from "./config";
import { locale, tf } from "./locale/locale";
import "./index.less";
import { HyperFormula } from "hyperformula";
import { formatNumberRender, formatStringRender } from "./core/helper";

const initializeSpreadSheet = (element, options) => {
  let sheetIndex = 1;
  let datas = [];
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
  const bottombar = new Bottombar(
    () => {
      const d = addSheet();
      sheet.resetData(d);
    },
    (index) => {
      const d = datas[index];
      sheet.resetData(d);
    },
    () => {
      deleteSheet();
    },
    (index, value) => {
      datas[index].name = value;
    },
  );

  const addSheet = (name, active = true) => {
    const n = name || `sheet${sheetIndex}`;
    const d = new DataProxy(n, options, hyperFormula);
    d.change = (...args) => {
      sheet.trigger("change", ...args);
    };
    datas.push(d);
    // console.log('d:', n, d, datas);
    bottombar.addItem(n, active);
    sheetIndex += 1;
    return d;
  };

  const data = addSheet();

  const sheet = new Sheet(rootEl, data, hyperFormula, formats);

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
      if (nindex >= 0) sheet.resetData(datas[nindex]);
    }
  };

  const destroy = () => {
    element.querySelector(`.${cssPrefix}`).remove();
  };

  const showFormulas = () => {
    sheet.table.calculateFormulas = false;
    reRender();
  };

  const hideFormulas = () => {
    sheet.table.calculateFormulas = true;
    reRender();
  };

  const loadData = (dataSheets) => {
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
    loadData,
    getData,
    cellText,
    cell,
    cellStyle,
    reRender,
    on,
    validate,
    change,
    hyperFormula,
  };
};

export default initializeSpreadSheet;
export { locale };
