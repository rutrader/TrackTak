import { parentPort } from "worker_threads";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import { expose } from "comlink";
import calculateDCFModel from "../dcfModel/calculateDCFModel";

const sensitivityAnalysisWorker = {
  computeSensitivityAnalysis: (cells, existingScope, currentScopes) => {
    const values = currentScopes.map((currentScope) => {
      const estimatedPricePerShare = calculateDCFModel(
        cells,
        existingScope,
        currentScope,
      ).B36.value;

      return estimatedPricePerShare;
    });

    return values;
  },
};

expose(sensitivityAnalysisWorker, nodeEndpoint(parentPort));
