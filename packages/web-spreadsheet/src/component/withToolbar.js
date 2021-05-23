import spreadsheetEvents from "../core/spreadsheetEvents";
import { getPrint } from "./getPrint";
import { getToolbar } from "./toolbar/getToolbar";

const withToolbar = (sheet, rootEl, options) => {
  let data;
  let { eventEmitter, el } = sheet;
  const { showToolbar } = options;

  const print = getPrint();
  const toolbar = getToolbar(el, options, eventEmitter, !showToolbar);

  function toolbarChangePaintformatPaste() {
    if (toolbar.paintformatActive()) {
      sheet.paste("format");
      sheet.clearClipboard();
      toolbar.paintformatToggle();
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
        const { ri, ci } = data.selector;
        sheet.freeze(ri, ci);
      } else {
        sheet.freeze(0, 0);
      }
    } else {
      data.setSelectedCellAttr(type, value);
      if (type === "formula" && !data.selector.multiple()) {
        sheet.editorSet();
      }
      sheet.sheetReset();
    }
  }

  rootEl.children(print.el);

  Object.values(spreadsheetEvents.toolbar).forEach((key) => {
    eventEmitter.on(key, (type, value) => toolbarChange(type, value));
  });

  eventEmitter.on(spreadsheetEvents.sheet.cellSelected, () => {
    toolbar.reset();
  });

  eventEmitter.on(spreadsheetEvents.sheet.cellsSelected, () => {
    toolbar.reset();
  });

  eventEmitter.on(spreadsheetEvents.sheet.sheetReset, () => {
    toolbar.reset();
  });

  eventEmitter.on(spreadsheetEvents.sheet.mouseMoveUp, () => {
    toolbarChangePaintformatPaste();
  });

  eventEmitter.on(spreadsheetEvents.sheet.resetData, (datum) => {
    // TODO: Refactor how spreadsheets initialized so don't
    // have to do this horrid hack
    data = datum;

    toolbar.resetData(data);
    print.resetData(data);
    toolbar.resize();
  });

  eventEmitter.on(spreadsheetEvents.sheet.ctrlKeyDown, (evt, keyCode) => {
    // ctrl + s
    if (keyCode === 83) {
      evt.preventDefault();

      toolbar.strikeEl.toggleItem.toggle();
    }

    // ctrl + u
    if (keyCode === 85) {
      evt.preventDefault();

      toolbar.underlineEl.toggleItem.toggle();
    }

    // ctrl + b
    if (keyCode === 66) {
      toolbar.boldEl.toggleItem.toggle();
    }

    // ctrl + i
    if (keyCode === 73) {
      toolbar.italicEl.toggleItem.toggle();
    }
  });

  return {
    ...sheet,
  };
};

export default withToolbar;
