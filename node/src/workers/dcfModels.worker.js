import { parentPort } from "worker_threads";
import nodeEndpoint from "comlink/dist/esm/node-adapter";
import { expose } from "comlink";
import calculateDCFModel from "../dcfModel/calculateDCFModel";

const dcfModelsWorker = {
  calculateDCFModels: (cells, existingScope, currentScopes) => {
    const models = currentScopes.map((currentScope) => {
      const model = calculateDCFModel(cells, existingScope, currentScope);

      return model;
    });

    return models;
  },
};

expose(dcfModelsWorker, nodeEndpoint(parentPort));
