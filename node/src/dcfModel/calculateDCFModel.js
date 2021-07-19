import isNil from "lodash/isNil";

const calculateDCFModel = (hyperformula, scope) => {
  // TODO: Make generic later on
  const requiredInputsId = hyperformula.getSheetId("Required Inputs");
  const optionalInputsId = hyperformula.getSheetId("Optional Inputs");

  // TODO: Make generic later on
  const sheetId = hyperformula.getSheetId("DCF Valuation");

  const dataSheetValues = hyperformula.getSheetValues(sheetId);

  return dataSheetValues;
};

export default calculateDCFModel;
