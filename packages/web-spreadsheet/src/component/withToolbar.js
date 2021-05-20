import spreadsheetEvents from "../core/spreadsheetEvents";
import { getPrint } from "./getPrint";
import Toolbar from "./toolbar";

const withToolbar = (sheet) => {
  let { el, targetEl, data, formats, eventEmitter } = sheet;
  const { view, showToolbar } = data.options;

  const print = getPrint(data);
  const toolbar = new Toolbar(
    data,
    view.width,
    formats,
    eventEmitter,
    !showToolbar,
  );

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

  Object.values(spreadsheetEvents.toolbar).forEach((key) => {
    eventEmitter.on(key, (type, value) => toolbarChange(type, value));
  });

  // toolbar change
  toolbar.change = (type, value) => toolbarChange(type, value);

  targetEl.children(toolbar.el, el, print.el);

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
