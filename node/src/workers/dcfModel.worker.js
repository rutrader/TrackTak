import { parentPort } from "worker_threads";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import { expose } from "comlink";
import calculateDCFModel from "../dcfModel/calculateDCFModel";

const dcfModelWorker = {
  calculateDCFModel: (cells, existingScope, currentScope) => {
    const model = calculateDCFModel(cells, existingScope, currentScope);

    return model;
  },
};

expose(dcfModelWorker, nodeEndpoint(parentPort));
