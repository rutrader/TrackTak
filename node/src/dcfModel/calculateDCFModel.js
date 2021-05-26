import { HyperFormula } from "hyperformula";
import chunk from "lodash/chunk";
import sortAlphaNumeric from "../../../packages/intrinsic-valuations/src/discountedCashFlow/sortAlphaNumeric";
import { padCellKeys } from "../../../packages/intrinsic-valuations/src/discountedCashFlow/utils";

// TODO: pass in the actual array of arrays instead of cells object
// and converting it
const calculateDCFModel = (cells, scope) => {
  const cellKeysSorted = padCellKeys(Object.keys(cells).sort(sortAlphaNumeric));
  const sheetData = chunk(
    cellKeysSorted.map((key) => {
      if (!cells[key]) return undefined;

      return cells[key].expr || cells[key].value;
    }),
    13,
  );

  const hyperformula = HyperFormula.buildFromArray(sheetData, {
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });

  Object.keys(scope).forEach((key) => {
    const value = scope[key] || 0;

    if (hyperformula.isItPossibleToChangeNamedExpression(key, value)) {
      hyperformula.changeNamedExpression(key, value);
    }

    if (hyperformula.isItPossibleToAddNamedExpression(key, value)) {
      hyperformula.addNamedExpression(key, value);
    }
  });

  const dataSheetValues = hyperformula.getSheetValues(0);

  return dataSheetValues;
};

export default calculateDCFModel;
