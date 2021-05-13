/* global window, document */
import { h } from "./component/element";
import DataProxy from "./core/data_proxy";
import Sheet from "./component/sheet";
import Bottombar from "./component/bottombar";
import { cssPrefix } from "./config";
import { locale, tf } from "./locale/locale";
import "./index.less";
import { HyperFormula } from "hyperformula";
import { formatNumberRender, formatStringRender } from "./core/helper";

class Spreadsheet {
  constructor(selectors, options = {}) {
    this.targetEl = selectors;
    this.options = options;
    this.sheetIndex = 1;
    this.datas = [];
    this.formats = {
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

    this.hyperFormula = HyperFormula.buildEmpty({
      licenseKey: "05054-b528f-a10c4-53f2a-04b57",
    });

    this.bottombar = new Bottombar(
      () => {
        const d = this.addSheet();
        this.sheet.resetData(d);
      },
      (index) => {
        const d = this.datas[index];
        this.sheet.resetData(d);
      },
      () => {
        this.deleteSheet();
      },
      (index, value) => {
        this.datas[index].name = value;
      },
    );
    this.data = this.addSheet();
    const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
      evt.preventDefault(),
    );
    this.sheet = new Sheet(rootEl, this.data, this.hyperFormula, this.formats);

    // create canvas element
    this.targetEl.appendChild(rootEl.el);
    rootEl.child(this.bottombar.el);
  }

  setVariables = (variables) => {
    Object.keys(variables).forEach((key) => {
      const value = variables[key];

      if (this.hyperFormula.isItPossibleToChangeNamedExpression(key, value)) {
        this.hyperFormula.changeNamedExpression(key, value);
      }

      if (this.hyperFormula.isItPossibleToAddNamedExpression(key, value)) {
        this.hyperFormula.addNamedExpression(key, value);
      }
    });
  };

  addSheet(name, active = true) {
    const n = name || `sheet${this.sheetIndex}`;
    const d = new DataProxy(n, this.options, this.hyperFormula);
    d.change = (...args) => {
      this.sheet.trigger("change", ...args);
    };
    this.datas.push(d);
    // console.log('d:', n, d, this.datas);
    this.bottombar.addItem(n, active);
    this.sheetIndex += 1;
    return d;
  }

  deleteSheet() {
    const [oldIndex, nindex] = this.bottombar.deleteItem();
    if (oldIndex >= 0) {
      this.datas.splice(oldIndex, 1);
      if (nindex >= 0) this.sheet.resetData(this.datas[nindex]);
    }
  }

  destroy = () => {
    this.targetEl.querySelector(`.${cssPrefix}`).remove();
  };

  showFormulas = () => {
    this.sheet.table.calculateFormulas = false;
    this.reRender();
  };

  hideFormulas = () => {
    this.sheet.table.calculateFormulas = true;
    this.reRender();
  };

  loadData(dataSheets) {
    this.bottombar.clear();
    this.datas = [];
    if (dataSheets.length > 0) {
      for (let i = 0; i < dataSheets.length; i += 1) {
        const it = dataSheets[i];
        const nd = this.addSheet(it.name, i === 0);

        if (this.hyperFormula.isItPossibleToAddSheet(it.name)) {
          this.hyperFormula.addSheet(it.name);
        }
        nd.setData(it);
        if (i === 0) {
          this.sheet.resetData(nd);
        }
      }
    }
    return this;
  }

  getData() {
    return this.datas.map((it) => it.getData());
  }

  cellText(ri, ci, text, sheetIndex = 0) {
    this.datas[sheetIndex].setCellText(ri, ci, text, "finished");
    return this;
  }

  cell(ri, ci, sheetIndex = 0) {
    return this.datas[sheetIndex].getCell(ri, ci);
  }

  cellStyle(ri, ci, sheetIndex = 0) {
    return this.datas[sheetIndex].getCellStyle(ri, ci);
  }

  reRender() {
    this.sheet.table.render();
    return this;
  }

  on(eventName, func) {
    this.sheet.on(eventName, func);
    return this;
  }

  validate() {
    const { validations } = this.data;
    return validations.errors.size <= 0;
  }

  change(cb) {
    this.sheet.on("change", cb);
    return this;
  }

  static locale(lang, message) {
    locale(lang, message);
  }
}

const spreadsheet = (el, options = {}) => new Spreadsheet(el, options);

if (typeof window !== "undefined") {
  window.x_spreadsheet = spreadsheet;
  window.x_spreadsheet.locale = (lang, message) => locale(lang, message);
}

export default Spreadsheet;
export { spreadsheet };
