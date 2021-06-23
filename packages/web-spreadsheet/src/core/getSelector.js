import { CellRange } from "./cell_range";

const getSelector = () => {
  const range = new CellRange(0, 0, 0, 0);
  let ri = 0;
  let ci = 0;

  const setIndexes = (rowIndex, columnIndex) => {
    ri = rowIndex;
    ci = columnIndex;
  };

  const getIndexes = () => {
    return {
      ri,
      ci,
    };
  };

  return {
    setIndexes,
    getIndexes,
    range,
  };
};
export default getSelector;
