import spreadsheetEvents from "../../core/spreadsheetEvents";
import { makeGetViewWidthHeight } from "../makeGetViewWidthHeight";
import { makeTable } from "./makeTable";

export const getVariablesTable = (options, hyperformula, eventEmitter) => {
  const getViewWidthHeight = makeGetViewWidthHeight(options, true);
  let data;

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (newData) => {
    data = newData;
  });

  const { setCalculateFormulas, clear, render, el, draw } = makeTable({
    getViewWidthHeight,
    hyperformula,
    eventEmitter,
  });

  const getOffset = () => {
    const { rows, cols } = data;
    const { width, height } = getViewWidthHeight();

    // TODO: Set magic numbers to options once data is fixed
    return {
      width: width - cols.indexWidth,
      height: height - rows.indexHeight,
      left: 0,
      top: 0,
    };
  };

  return {
    el,
    draw,
    data,
    hyperformula,
    render,
    clear,
    setCalculateFormulas,
    getOffset,
  };
};
