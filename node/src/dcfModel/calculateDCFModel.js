import isNil from "lodash/isNil";

const calculateDCFModel = (hyperformula, scope) => {
  // TODO: Make generic later on
  const requiredInputsId = hyperformula.getSheetId("Required Inputs");
  const optionalInputsId = hyperformula.getSheetId("Optional Inputs");

  // TODO: Remove these later when this hyperformula issue is fixed:
  // https://github.com/handsontable/hyperformula/issues/686
  if (!isNil(requiredInputsId)) {
    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 0 },
      scope.cagrInYears_1_5,
    );

    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 1 },
      scope.ebitTargetMarginInYear_10,
    );

    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 2 },
      scope.yearOfConvergence,
    );

    hyperformula.setCellContents(
      { sheet: requiredInputsId, col: 1, row: 3 },
      scope.salesToCapitalRatio,
    );
  }

  if (!isNil(optionalInputsId)) {
    hyperformula.setCellContents(
      { sheet: optionalInputsId, col: 9, row: 3 },
      scope.probabilityOfFailure,
    );

    hyperformula.setCellContents(
      { sheet: optionalInputsId, col: 9, row: 4 },
      scope.proceedsAsAPercentageOfBookValue,
    );

    hyperformula.setCellContents(
      { sheet: optionalInputsId, col: 9, row: 1 },
      scope.netOperatingLoss,
    );

    hyperformula.setCellContents(
      { sheet: optionalInputsId, col: 9, row: 2 },
      scope.nonOperatingAssets,
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
