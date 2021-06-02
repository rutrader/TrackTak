import { tf } from "../locale/locale";
import { formatNumberRender, formatStringRender } from "./helper";
import { merge } from "lodash-es";

const sharedOptions = {
  mode: "edit", // edit | read
  debugMode: false,
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth,
  },
  showToolbar: true,
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
  variables: {},
  formats: {
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

export const defaultOptions = merge({}, sharedOptions, {
  showVariablesSpreadsheet: true,
});

export const defaultVariablesSpreadsheetOptions = merge({}, sharedOptions, {
  view: {
    height: () => 200,
  },
});
