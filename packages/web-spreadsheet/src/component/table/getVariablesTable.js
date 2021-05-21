import { makeTable } from "./makeTable";

export const getVariablesTable = (data, hyperFormula) => {
  const {
    setCalculateFormulas,
    clear,
    render,
    resetData,
    el,
    draw,
  } = makeTable({
    data,
    hyperFormula,
  });

  const getOffset = () => {
    const { rows, cols } = data;
    const { width, height } = data.getViewWidthHeight();
    return {
      width: width - cols.indexWidth,
      height: height - rows.height,
      left: cols.indexWidth,
      top: rows.height,
    };
  };

  return {
    el,
    draw,
    data,
    hyperFormula,
    resetData,
    render,
    clear,
    setCalculateFormulas,
    getOffset,
  };
};
