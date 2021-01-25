import { inputQueries } from "../selectors/routerSelectors/selectQueryParams";
import {
  doesReferenceAnotherCell,
  getExpressionWithoutEqualsSign,
  isExpressionDependency,
} from "./utils";
import { inputsWorksheetName } from "./DiscountedCashFlowSheet";
import formatValueForExcelOutput from "./formatValueForExcelExport";

const formatCellValueForExcelOutput = (cell, currencySymbol, scope) => {
  if (!cell) return cell;

  const { value, type, expr } = cell;

  let f;

  if (isExpressionDependency(expr)) {
    let formula = getExpressionWithoutEqualsSign(expr);

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

    if (doesReferenceAnotherCell(expr)) {
      f = formula;
    }
  }

  return {
    ...formatValueForExcelOutput(value, currencySymbol, type),
    f,
  };
};

export default formatCellValueForExcelOutput;
