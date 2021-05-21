import spreadsheetEvents from "../core/spreadsheetEvents";
import { getVariablesToolbar } from "./toolbar/getVariablesToolbar";

const withVariablesToolbar = (sheet) => {
  let { data, eventEmitter, el } = sheet;
  const { view, showVariablesSpreadsheet } = data.options;

  const toolbar = getVariablesToolbar(
    data,
    view.width,
    data.options.formats,
    eventEmitter,
    !showVariablesSpreadsheet,
  );

  function toolbarChange(type, value) {
    if (type === "undo") {
      sheet.undo();
    } else if (type === "redo") {
      sheet.redo();
    } else {
      data.setSelectedCellAttr(type, value);
      sheet.sheetReset();
    }
  }

  Object.values(spreadsheetEvents.variablesToolbar).forEach((key) => {
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

  eventEmitter.on(spreadsheetEvents.sheet.resetData, (datum) => {
    // TODO: Refactor how spreadsheets initialized so don't
    // have to do this horrid hack
    data = datum;

    toolbar.resetData(data);
  });

  setTimeout(() => {
    toolbar.resize();
    el.before(toolbar.el);
  }, 2000);

  return {
    ...sheet,
  };
};

export default withVariablesToolbar;
