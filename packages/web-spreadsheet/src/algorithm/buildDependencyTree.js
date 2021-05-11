import { isExpressionDependency } from "../../../dcf-react/src/discountedCashFlow/utils";
import filterDuplicates from "../../../dcf-react/src/shared/filterDuplicates";
import { DepGraph } from "dependency-graph";

const buildDependencyTree = (cells) => {
  const graph = new DepGraph();

  Object.keys(cells).forEach((key) => {
    const formula = cells[key];

    if (isExpressionDependency(formula)) {
      graph.addNode(key);
    }
  });

  Object.keys(cells).forEach((key) => {
    const formula = cells[key];

    if (isExpressionDependency(formula)) {
      const matches = formula.match(/([A-Z]+\d+)/g);
      const uniqueMatches = filterDuplicates(matches);

      uniqueMatches.forEach((uniqueMatchKey) => {
        if (graph.hasNode(uniqueMatchKey)) {
          graph.addDependency(uniqueMatchKey, key);
        }
      });
    }
  });

  return graph;
};

export default buildDependencyTree;
