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

  return {
    el,
    draw,
    data,
    hyperFormula,
    resetData,
    render,
    clear,
    setCalculateFormulas,
  };
};
