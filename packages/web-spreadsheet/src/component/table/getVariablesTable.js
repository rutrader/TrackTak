import spreadsheetEvents from "../../core/spreadsheetEvents";
import { makeGetViewWidthHeight } from "../makeGetViewWidthHeight";
import { makeTable } from "./makeTable";

export const getVariablesTable = (
  getOptions,
  getData,
  hyperformula,
  eventEmitter,
) => {
  const getViewWidthHeight = makeGetViewWidthHeight(getOptions, true);

  const { clear, render, el, draw } = makeTable({
    getViewWidthHeight,
    getOptions,
    getData,
    hyperformula,
  });

  const getOffset = () => {
    const { rows, cols } = getData();
    const { width, height } = getViewWidthHeight();

    return {
      width: width - cols.indexWidth,
      height: height - rows.indexHeight,
      left: getOptions().variablesSheetIndexWidth,
      top: getOptions().variablesSheetIndexHeight,
    };
  };

  eventEmitter.on(spreadsheetEvents.sheet.switchData, () => {
    render();
  });

  return {
    el,
    draw,
    hyperformula,
    render,
    clear,
    getOffset,
  };
};
