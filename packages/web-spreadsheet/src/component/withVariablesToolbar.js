import spreadsheetEvents from "../core/spreadsheetEvents";
import { getVariablesToolbar } from "./toolbar/getVariablesToolbar";

const withVariablesToolbar = (sheet) => {
  let { eventEmitter, el: sheetEl, getOptions, getData } = sheet;
  const { view, showVariablesSpreadsheet } = getOptions();

  const toolbar = getVariablesToolbar(getOptions, getData, eventEmitter);

  function toolbarChange(type, value) {
    if (type === "undo") {
      sheet.undo();
    } else if (type === "redo") {
      sheet.redo();
    } else {
      getData().setSelectedCellAttr(type, value);
      sheet.sheetReset();
    }
  }

  Object.values(spreadsheetEvents.variablesToolbar).forEach((key) => {
    eventEmitter.on(key, (type, value) => toolbarChange(type, value));
  });

  return {
    ...sheet,
  };
};

export default withVariablesToolbar;
