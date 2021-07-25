import { isNil } from "lodash-es";

export const getHyperformulaValuesSerializedWithoutArrayAsAMap = (
  hyperformula,
  sheet,
) => {
  return getHyperformulaValuesSerialized(
    hyperformula,
    sheet,
    ({ setCellValue, cellAddress, cell }) => {
      const cellType = hyperformula.getCellType(cellAddress);

      if (cellType === "ARRAY") {
        const addressString = hyperformula.simpleCellAddressToString(
          cellAddress,
          sheet,
        );
        const leftCornerAddressString = hyperformula.simpleCellAddressToString(
          cell.leftCorner,
          sheet,
        );

        // TODO: Raise this issue with hyperformula. Causing SPILL issues if we don't just take
        // the top left corner of array cells
        if (addressString === leftCornerAddressString) {
          setCellValue();
        }
      } else {
        setCellValue();
      }
    },
  );
};

export const getHyperformulaValuesSerializedAsAMap = (hyperformula, sheet) => {
  return getHyperformulaValuesSerialized(
    hyperformula,
    sheet,
    ({ setCellValue }) => {
      setCellValue();
    },
  );
};

const getHyperformulaValuesSerialized = (hyperformula, sheet, callback) => {
  // https://github.com/handsontable/hyperformula/discussions/761
  const addressMapping = hyperformula.dependencyGraph.addressMapping.mapping;
  const cellsSerialized = {};
  const currentSheetMapping = addressMapping.get(sheet);

  const setCellValue = (row, col, value) => {
    cellsSerialized[row] = {
      ...cellsSerialized[row],
      [col]: value,
    };
  };

  currentSheetMapping.mapping.forEach((col, colKey) => {
    col.forEach((cell, rowKey) => {
      const cellAddress = { sheet, col: colKey, row: rowKey };
      const serializedValue = hyperformula.getCellSerialized(cellAddress);

      if (!isNil(serializedValue) && serializedValue !== "") {
        const makeSetCellValue = () =>
          setCellValue(rowKey, colKey, serializedValue);

        callback({ setCellValue: makeSetCellValue, cellAddress, cell });
      }
    });
  });

  return cellsSerialized;
};
