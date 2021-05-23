import { makeGetViewWidthHeight } from "../makeGetViewWidthHeight";
import { makeTable } from "./makeTable";

export const getVariablesTable = (data, hyperformula, options) => {
  const {
    setCalculateFormulas,
    clear,
    render,
    resetData,
    el,
    draw,
  } = makeTable({
    data,
    hyperformula,
  });

  const getOffset = () => {
    const { rows, cols } = data;
    const { width, height } = makeGetViewWidthHeight(options, true)();

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
    resetData,
    render,
    clear,
    setCalculateFormulas,
    getOffset,
  };
};
