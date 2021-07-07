import { getCellsForRowsBetween } from "../../spreadsheet/utils";
import { columns } from "../../spreadsheet/cells";
import selectCells from "./selectCells";

const makeCellKeysSelector = (startColumn, endColumn, rows) => {
  const cellKeys = getCellsForRowsBetween(
    columns,
    startColumn,
    endColumn,
    rows,
  );
  return cellKeys.map((cellKey) => {
    return (state) => selectCells(state)[cellKey];
  });
};

export default makeCellKeysSelector;
