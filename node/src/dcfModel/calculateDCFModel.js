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

  const hyperFormula = HyperFormula.buildFromArray(sheetData, {
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });

  Object.keys(scope).forEach((key) => {
    const value = scope[key] || 0;

    if (hyperFormula.isItPossibleToChangeNamedExpression(key, value)) {
      hyperFormula.changeNamedExpression(key, value);
    }

    if (hyperFormula.isItPossibleToAddNamedExpression(key, value)) {
      hyperFormula.addNamedExpression(key, value);
    }
  });

  const dataSheetValues = hyperFormula.getSheetValues(0);

  return dataSheetValues;
};

export default calculateDCFModel;
