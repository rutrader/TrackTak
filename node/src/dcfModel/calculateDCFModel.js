import { HyperFormula } from "hyperformula";

const calculateDCFModel = (
  sheetsSerializedValues,
  existingScope,
  currentScope,
) => {
  const hyperformula = HyperFormula.buildFromSheets(sheetsSerializedValues, {
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });

  // TODO: Make generic later on
  const inputSheetId = hyperformula.getSheetId("Required Inputs");

  hyperformula.setCellContents(
    { sheet: inputSheetId, col: 1, row: 0 },
    currentScope.cagrInYears_1_5,
  );
  hyperformula.setCellContents(
    { sheet: inputSheetId, col: 1, row: 1 },
    currentScope.ebitTargetMarginInYear_10,
  );

  Object.keys(existingScope).forEach((key) => {
    const value = existingScope[key] || 0;

    if (hyperformula.isItPossibleToChangeNamedExpression(key, value)) {
      hyperformula.changeNamedExpression(key, value);
    }

    if (hyperformula.isItPossibleToAddNamedExpression(key, value)) {
      hyperformula.addNamedExpression(key, value);
    }
  });

  // TODO: Make generic later on
  const sheetId = hyperformula.getSheetId("DCF Valuation");

  const dataSheetValues = hyperformula.getSheetValues(sheetId);

  return dataSheetValues;
};

export default calculateDCFModel;
