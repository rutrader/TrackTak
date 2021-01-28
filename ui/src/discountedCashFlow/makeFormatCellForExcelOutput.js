import { inputQueries } from "../selectors/routerSelectors/selectQueryParams";
import {
  costOfCapitalWorksheetName,
  inputsWorksheetName,
} from "./ExportToExcel";
import makeFormatValueForExcelOutput from "./makeFormatValueForExcelOutput";
import { isExpressionDependency } from "./utils";

const makeFormatCellForExcelOutput = (
  currencySymbol,
  costOfCapitalDataKeys
) => {
  const formatValueForExcelOutput = makeFormatValueForExcelOutput(
    currencySymbol
  );

  return (cell, scope, currentSheetName) => {
    if (!cell) return cell;

    const { value, type, expr } = cell;

    let formula = expr;

    if (isExpressionDependency(formula)) {
      // TODO: Fix for H2
      const matches = formula.match(/[A-Za-z]+/g);

      matches.forEach((match) => {
        let index = costOfCapitalDataKeys.indexOf(match);
        let dependency = "";

        if (index === -1) {
          const inputIndex = inputQueries.findIndex(
            ({ name }) => name === match
          );

          if (inputIndex !== -1) {
            dependency = `B${inputIndex + 1}`;

            if (currentSheetName !== inputsWorksheetName) {
              dependency = `${inputsWorksheetName}!` + dependency;
            }
            formula = formula.replaceAll(match, dependency);
          }
        } else {
          dependency = `B${index + 1}`;

          if (currentSheetName !== costOfCapitalWorksheetName) {
            dependency = `'${costOfCapitalWorksheetName}'!` + dependency;
          }
          formula = formula.replaceAll(match, dependency);
        }
      });

      inputQueries.forEach(({ name }, i) => {
        const row = i + 1;

        formula = formula.replaceAll(name, `${inputsWorksheetName}!B${row}`);
      });

      Object.keys(scope).forEach((key) => {
        let value = scope[key];

        if (value === undefined || value === null) {
          value = 0;
        }

        formula = formula.replaceAll(key, value);
      });
    }

    return {
      ...formatValueForExcelOutput(value, type),
      f: formula,
    };
  };
};

export default makeFormatCellForExcelOutput;
