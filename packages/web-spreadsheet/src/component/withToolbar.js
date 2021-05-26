import spreadsheetEvents from "../core/spreadsheetEvents";
import { getPrint } from "./getPrint";
import { getToolbar } from "./toolbar/getToolbar";

const withToolbar = (sheet) => {
  let { eventEmitter, rootEl, el: sheetEl, getOptions, getData } = sheet;

  const print = getPrint(rootEl, getData);
  const {
    paintformatToggle,
    paintformatActive,
    strikeEl,
    boldEl,
    underlineEl,
    italicEl,
  } = getToolbar(sheetEl, getOptions, getData, eventEmitter);

  function toolbarChangePaintformatPaste() {
    if (paintformatActive()) {
      sheet.paste("format");
      sheet.clearClipboard();
      paintformatToggle();
    }
  }

  function toolbarChange(type, value) {
    if (type === "undo") {
      sheet.undo();
    } else if (type === "redo") {
      sheet.redo();
    } else if (type === "print") {
      print.preview();
    } else if (type === "paintformat") {
      if (value === true) {
        sheet.copy();
      } else {
        sheet.clearClipboard();
      }
    } else if (type === "clearformat") {
      sheet.insertDeleteRowColumn("delete-cell-format");
    } else if (type === "link") {
      // link
    } else if (type === "chart") {
      // chart
    } else if (type === "autofilter") {
      // filter
      sheet.autofilter();
    } else if (type === "freeze") {
      if (value) {
        const { ri, ci } = getData().selector;
        sheet.freeze(ri, ci);
      } else {
        sheet.freeze(0, 0);
      }
    } else {
      getData().setSelectedCellAttr(type, value);
      if (type === "formula" && !getData().selector.multiple()) {
        sheet.editorSet();
      }
      sheet.sheetReset();
    }
  }

  Object.values(spreadsheetEvents.toolbar).forEach((key) => {
    eventEmitter.on(key, (type, value) => toolbarChange(type, value));
  });

  eventEmitter.on(spreadsheetEvents.sheet.mouseMoveUp, () => {
    toolbarChangePaintformatPaste();
  });

  eventEmitter.on(spreadsheetEvents.sheet.ctrlKeyDown, (evt, keyCode) => {
    // ctrl + s
    if (keyCode === 83) {
      evt.preventDefault();

      strikeEl.toggleItem.toggle();
    }

    // ctrl + u
    if (keyCode === 85) {
      evt.preventDefault();

      underlineEl.toggleItem.toggle();
    }

    // ctrl + b
    if (keyCode === 66) {
      boldEl.toggleItem.toggle();
    }

    // ctrl + i
    if (keyCode === 73) {
      italicEl.toggleItem.toggle();
    }
  });

  return {
    ...sheet,
  };
};

export default withToolbar;
