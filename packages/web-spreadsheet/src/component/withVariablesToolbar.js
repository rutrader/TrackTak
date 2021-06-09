import spreadsheetEvents from "../core/spreadsheetEvents";
import { getVariablesToolbar } from "./toolbar/getVariablesToolbar";

const withVariablesToolbar = ({ sheet, ...args }) => {
  let { eventEmitter, getOptions, getData } = sheet;

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

  Object.values(spreadsheetEvents.toolbar).forEach((key) => {
    eventEmitter.on(key, (type, value) => toolbarChange(type, value));
  });

  return {
    ...args,
    sheet,
    toolbar,
  };
};

export default withVariablesToolbar;
