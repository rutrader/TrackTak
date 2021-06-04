import { HyperFormula } from "hyperformula";

const calculateDCFModel = (sheetsSerializedValues, scope) => {
  const hyperformula = HyperFormula.buildFromSheets(sheetsSerializedValues, {
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });

  // TODO: Make generic later on
  const requiredInputsId = hyperformula.getSheetId("Required Inputs");
  const optionalInputsId = hyperformula.getSheetId("Optional Inputs");

  if (scope.cagrInYears_1_5) {
    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 0 },
      scope.cagrInYears_1_5,
    );
  }
  if (scope.ebitTargetMarginInYear_10) {
    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 1 },
      scope.ebitTargetMarginInYear_10,
    );
  }

  if (scope.yearOfConvergence) {
    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 2 },
      scope.yearOfConvergence,
    );
  }

  if (scope.salesToCapitalRatio) {
    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 3 },
      scope.salesToCapitalRatio,
    );
  }

  if (scope.probabilityOfFailure) {
    hyperformula.setCellContents(
      { sheet: optionalInputsId, col: 9, row: 3 },
      scope.probabilityOfFailure,
    );
  }

  if (scope.proceedsAsAPercentageOfBookValue) {
    hyperformula.setCellContents(
      { sheet: optionalInputsId, col: 9, row: 4 },
      scope.proceedsAsAPercentageOfBookValue,
    );
  }

  Object.keys(scope).forEach((key) => {
    const value = scope[key] || 0;

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
