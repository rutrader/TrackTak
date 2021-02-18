import { getCellsForRowsBetween } from "../../discountedCashFlow/utils";
import { columns } from "../../discountedCashFlow/cells";
import selectCells from "./selectCells";

const makeCellKeysSelector = (startColumn, endColumn, rows) => {
  const cellKeys = getCellsForRowsBetween(
    columns,
    startColumn,
    endColumn,
    rows
  );
  return cellKeys.map((cellKey) => {
    return (state) => selectCells(state)[cellKey];
  });
};

export default makeCellKeysSelector;
