import { hyperformulaLicenseKey } from "../../../web-spreadsheet/src";
import { currencySymbolMap } from "currency-symbol-map";
import { AlwaysSparse } from 'hyperformula';

const hyperformulaConfig = {
  licenseKey: hyperformulaLicenseKey,
  // For vlookup to match Excel
  binarySearchThreshold: 1,
  chooseAddressMappingPolicy: new AlwaysSparse(),
  // We use our own undo/redo instead
  currencySymbol: Object.values(currencySymbolMap),
};

export default hyperformulaConfig;
