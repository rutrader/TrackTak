import { getCellsForRowsBetween } from "../../discountedCashFlow/utils";
import { columns } from "../../discountedCashFlow/cells";

const getCellKeysSelector = (startColumn, endColumn, rows) => {
  const cellKeys = getCellsForRowsBetween(
    columns,
    startColumn,
    endColumn,
    rows
  );
  return cellKeys.map((cellKey) => {
    return (state) => state.dcf.cells[cellKey];
  });
};

export default getCellKeysSelector;
