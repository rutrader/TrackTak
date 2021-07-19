import { hyperformulaLicenseKey } from "../../../web-spreadsheet/src";
import { currencySymbolMap } from "currency-symbol-map";

const hyperformulaConfig = {
  licenseKey: hyperformulaLicenseKey,
  // For vlookup to match Excel
  binarySearchThreshold: 1,
  // We use our own undo/redo instead
  currencySymbol: Object.values(currencySymbolMap),
};

export default hyperformulaConfig;
