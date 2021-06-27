import { tf } from "../locale/locale";
import { merge } from "lodash-es";
import numfmt from "numfmt";

const patterns = {
  percent: {
    edit: "0.##%",
    render: "0.00%",
  },
  number: {
    render: "#,##0.##",
  },
};

export const sharedOptions = {
  mode: "edit", // edit | read
  debugMode: false,
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth,
  },
  showGrid: true,
  showContextmenu: true,
  showAllFormulas: false,
  row: {
    len: 100,
    indexHeight: 20,
    height: 25,
  },
  col: {
    len: 26,
    width: 100,
    indexWidth: 25,
    minWidth: 60,
  },
  formats: {
    normal: {
      key: "normal",
      title: tf("format.normal"),
      type: "string",
    },
    text: {
      key: "text",
      title: tf("format.text"),
      type: "string",
    },
    number: {
      key: "number",
      title: tf("format.number"),
      type: "number",
      label: "1,000.12",
      pattern: patterns.number.render,
    },
    percent: {
      key: "percent",
      title: tf("format.percent"),
      type: "number",
      label: "10.12%",
      pattern: patterns.percent.render,
      editPattern: patterns.percent.edit,
      editRender: (v) => {
        let text = v.toString();

        if (text.charAt(0) !== "=") {
          text = text.includes("%") ? text : text + "%";

          text = numfmt(patterns.percent.edit)(text);
        }

        return text;
      },
    },
    date: {
      key: "date",
      title: tf("format.date"),
      type: "date",
      label: "26/09/2008",
    },
    time: {
      key: "time",
      title: tf("format.time"),
      type: "date",
      label: "15:59:00",
    },
    datetime: {
      key: "datetime",
      title: tf("format.datetime"),
      type: "date",
      label: "26/09/2008 15:59:00",
    },
    duration: {
      key: "duration",
      title: tf("format.duration"),
      type: "date",
      label: "24:01:00",
    },
  },
  style: {
    bgcolor: "#ffffff",
    align: "left",
    valign: "middle",
    textwrap: false,
    strike: false,
    underline: false,
    color: "#0a0a0a",
    font: {
      name: "Arial",
      size: 10,
      bold: false,
      italic: false,
    },
    format: "normal",
  },
};

export const defaultOptions = {
  ...sharedOptions,
  showToolbar: true,
};

export const defaultVariablesSpreadsheetOptions = merge({}, sharedOptions, {
  view: {
    height: () => 165,
  },
  show: true,
});
