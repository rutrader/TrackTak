import {
  create,
  evaluateDependencies,
  addDependencies,
  divideDependencies,
} from "mathjs";
import isNil from "lodash/isNil";
import { IF, IFERROR } from "@formulajs/formulajs/lib/logical";
import { SUM, TRUNC } from "@formulajs/formulajs/lib/math-trig";
import { getExpressionWithoutEqualsSign } from "../discountedCashFlow/utils";

const math = create({
  evaluateDependencies,
  addDependencies,
  divideDependencies,
});

math.import({
  IF,
  SUM,
  TRUNC,
  IFERROR,
});

export const evaluate = (expr, scope) => {
  const newScope = {};

  Object.keys(scope).forEach((key) => {
    newScope[key] = isNil(scope[key]) ? 0 : scope[key];
  });

  const result = math.evaluate(getExpressionWithoutEqualsSign(expr), newScope);

  return isNaN(result) ? null : result;
};
