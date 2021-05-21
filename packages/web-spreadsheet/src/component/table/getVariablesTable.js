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
      height: height - rows.indexHeight,
      left: 0,
      top: 0,
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
