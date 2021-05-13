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
      const matches = formula.match(/[a-z]+[A-Za-z]*/g) ?? [];

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
    }

    return {
      ...formatValueForExcelOutput(value, type),
      f: formula,
    };
  };
};

export default makeFormatCellForExcelOutput;
