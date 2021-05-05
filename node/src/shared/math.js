import { create, all } from "mathjs";
import isNil from "lodash/isNil";
import formulas from "@formulajs/formulajs";
import { getExpressionWithoutEqualsSign } from "../../../packages/dcf-react/src/discountedCashFlow/utils";
import TTFormula from "../../../packages/dcf-react/src/discountedCashFlow/ttFormula";

const math = create(all);

math.import(formulas, { wrap: true, silent: true });

export const evaluate = (expr, scope) => {
  math.import(
    {
      TT: TTFormula(scope),
    },
    {
      override: true,
    },
  );

  const newScope = {};

  Object.keys(scope).forEach((key) => {
    newScope[key] = isNil(scope[key]) ? 0 : scope[key];
  });

  const result = math.evaluate(getExpressionWithoutEqualsSign(expr), newScope);

  return isNaN(result) ? null : result;
};
