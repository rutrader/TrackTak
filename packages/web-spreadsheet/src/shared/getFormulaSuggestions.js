import { HyperFormula } from "hyperformula";
import { t } from "../locale/locale";

export const getFormulaSuggestions = () => {
  const formulaSuggestions = HyperFormula.getRegisteredFunctionNames(
    "enGB",
  ).map((formulaName) => {
    const escapedFormulaName = formulaName.replace(".", "\\.");
    return {
      key: escapedFormulaName,
      // Function that returns translation of the formula name if one exists,
      // otherwise the formula name
      title: () => t(`formula.${escapedFormulaName}`) || formulaName,
    };
  });

  return formulaSuggestions;
};
