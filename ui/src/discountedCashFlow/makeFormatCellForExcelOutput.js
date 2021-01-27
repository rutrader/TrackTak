import {
  doesReferenceAnotherCell,
  getExpressionWithoutEqualsSign,
  isExpressionDependency,
} from "./utils";

const formatValueForExcelOutput = (currencySymbol, value = 0, type) => {
  let newValue = value;

  // TODO: Fix properly in dcfReducer to now allow error values
  if (newValue === "error") {
    newValue = 0;
  }

  if (type === "percent") {
    return {
      v: newValue,
      z: "0.00%",
      t: "n",
    };
  }

  if (type === "million") {
    return {
      v: newValue,
      z: `${currencySymbol}#,##0,,.00`,
      t: "n",
    };
  }

  if (type === "currency") {
    return {
      v: newValue,
      z: `${currencySymbol}#,##0.00`,
      t: "n",
    };
  }

  if (type === "number") {
    return {
      v: newValue,
      z: "0.00",
      t: "n",
    };
  }

  return {
    v: newValue,
  };
};

const makeFormatCellForExcelOutput = (currencySymbol) => (cell) => {
  if (!cell) return cell;

  const { value, type, expr } = cell;

  let f;

  if (isExpressionDependency(expr)) {
    let formula = getExpressionWithoutEqualsSign(expr);

    // inputQueries.forEach(({ name }, i) => {
    //   const row = i + 1;

    //   formula = formula.replaceAll(name, `${inputsWorksheetName}!B${row}`);
    // });

    // Object.keys(scope).forEach((key) => {
    //   let value = scope[key];

    //   if (value === undefined || value === null) {
    //     value = 0;
    //   }

    //   formula = formula.replaceAll(key, value);
    // });

    if (doesReferenceAnotherCell(expr)) {
      f = formula;
    }
  }

  return {
    ...formatValueForExcelOutput(currencySymbol, value, type),
    f,
  };
};

export default makeFormatCellForExcelOutput;
