import spreadsheetEvents from "../core/spreadsheetEvents";
import { getVariablesToolbar } from "./toolbar/getVariablesToolbar";

const withVariablesToolbar = (sheet) => {
  let data;
  let { eventEmitter, el: sheetEl, getOptions } = sheet;
  const { view, showVariablesSpreadsheet } = getOptions();

  const toolbar = getVariablesToolbar(
    getOptions,
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

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (newData) => {
    data = newData;
  });

  return {
    ...sheet,
  };
};

export default withVariablesToolbar;
