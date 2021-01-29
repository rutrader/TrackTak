import {
  create,
  evaluateDependencies,
  addDependencies,
  divideDependencies,
} from "mathjs";
import { IF } from "@formulajs/formulajs/lib/logical";
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
});

export const evaluate = (expr, scope) =>
  math.evaluate(getExpressionWithoutEqualsSign(expr), scope);
