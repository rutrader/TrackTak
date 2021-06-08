import makeFormatValueForExcelOutput from "./makeFormatValueForExcelOutput";
import { isExpressionDependency } from "./utils";
import replaceAll from "../shared/replaceAll";
import { isNil } from "lodash-es";

export const inputsWorksheetName = "Inputs";
export const costOfCapitalWorksheetName = "Cost of Capital";
export const valuationWorksheetName = "Valuation";

const getMatchInFormula = (dataKeys, match, formula, callback) => {
  let index = dataKeys.indexOf(match);

  if (index !== -1) {
    return callback(index);
  }
  return formula;
};

const makeGetDependency = (currentSheetName) => (
  sheetToMatchAgainst,
  dataKeys,
  match,
  formula,
) => {
  return getMatchInFormula(dataKeys, match, formula, (index) => {
    let dependency = `B${index + 1}`;

    if (currentSheetName !== sheetToMatchAgainst) {
      dependency = `'${sheetToMatchAgainst}'!` + dependency;
    }
    return replaceAll(formula, match, dependency);
  });
};

const makeFormatCellForExcelOutput = (
  currencySymbol,
  sheetsValues,
  inputDataKeys,
  costOfCapitalDataKeys,
  scope,
) => {
  const formatValueForExcelOutput = makeFormatValueForExcelOutput(
    currencySymbol,
  );
  const scopeKeys = Object.keys(scope);

  return (cell, currentSheetName) => {
    if (!cell) return cell;

    const { value, type, expr } = cell;

    let formula = expr;

    const getDependency = makeGetDependency(currentSheetName);

    if (isExpressionDependency(formula)) {
      const matches = formula.match(/[a-z]+[A-Za-z]*(\w+)?/g) ?? [];

      matches.forEach((match) => {
        formula = getDependency(
          costOfCapitalWorksheetName,
          costOfCapitalDataKeys,
          match,
          formula,
        );

        formula = getDependency(
          inputsWorksheetName,
          inputDataKeys,
          match,
          formula,
        );

        getMatchInFormula(scopeKeys, match, formula, (index) => {
          const key = scopeKeys[index];
          let value = scope[key];

          if (isNil(value)) {
            value = 0;
          }

          formula = replaceAll(formula, key, value);
        });
      });

      // TODO: Remove these once we refactor the export to excel to be from spreadsheet
      formula = replaceAll(formula, "Required Inputs", "Inputs");
      formula = replaceAll(formula, "'Optional Inputs'!J2", "'Inputs'!B16");
      formula = replaceAll(formula, "'Optional Inputs'!J3", "'Inputs'!B17");
      formula = replaceAll(formula, "'Optional Inputs'!J4", "'Inputs'!B18");
      formula = replaceAll(formula, "'Optional Inputs'!J5", "'Inputs'!B19");
      formula = formula.replace(
        /'Employee Options'!\$B\$17/g,
        `${sheetsValues["Employee Options"][16][1]}`,
      );

      // Remove the equal sign
      formula = formula.substring(1);
    }

    return {
      ...formatValueForExcelOutput(value, type),
      f: formula,
    };
  };
};

export default makeFormatCellForExcelOutput;
