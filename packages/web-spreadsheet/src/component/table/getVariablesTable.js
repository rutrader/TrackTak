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
    eventEmitter,
  });

  const getOffset = () => {
    const { rows, cols } = getData();
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
    hyperformula,
    render,
    clear,
    getOffset,
  };
};
