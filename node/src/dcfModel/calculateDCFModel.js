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
  const requiredInputsId = hyperformula.getSheetId("Required Inputs");
  const optionalInputsId = hyperformula.getSheetId("Optional Inputs");

  if (currentScope.cagrInYears_1_5) {
    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 0 },
      currentScope.cagrInYears_1_5,
    );
  }
  if (currentScope.ebitTargetMarginInYear_10) {
    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 1 },
      currentScope.ebitTargetMarginInYear_10,
    );
  }

  if (currentScope.yearOfConvergence) {
    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 2 },
      currentScope.yearOfConvergence,
    );
  }

  if (currentScope.salesToCapitalRatio) {
    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 3 },
      currentScope.salesToCapitalRatio,
    );
  }

  if (currentScope.probabilityOfFailure) {
    hyperformula.setCellContents(
      { sheet: optionalInputsId, col: 9, row: 3 },
      currentScope.probabilityOfFailure,
    );
  }

  if (currentScope.proceedsAsAPercentageOfBookValue) {
    hyperformula.setCellContents(
      { sheet: optionalInputsId, col: 9, row: 4 },
      currentScope.proceedsAsAPercentageOfBookValue,
    );
  }

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
