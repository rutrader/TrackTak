import { isExpressionDependency } from "../../../dcf-react/src/discountedCashFlow/utils";
import filterDuplicates from "../../../dcf-react/src/shared/filterDuplicates";

const buildDependencyTree = (cells) => {
  const dependencyTree = {};

  Object.keys(cells).forEach((key) => {
    const formula = cells[key];

    if (isExpressionDependency(formula)) {
      const matches = formula.match(/([A-Z]+\d+)/g);
      const uniqueMatches = filterDuplicates(matches);

      uniqueMatches.forEach((uniqueMatchKey) => {
        dependencyTree[key] = dependencyTree[key]
          ? [...dependencyTree[key], uniqueMatchKey]
          : [uniqueMatchKey];
      });
    }
  });

  return dependencyTree;
};

export default buildDependencyTree;
