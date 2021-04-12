import 'nested-worker/worker.js';

import calculateDCFModel from "../shared/calculateDCFModel";

if (typeof self !== "undefined") {
  self.onmessage = ({ data: { cells, existingScope, currentScopes } }) => {
    const models = currentScopes.map((currentScope) => {
      const model = calculateDCFModel(cells, currentScope, existingScope);

      return model;
    });

    self.postMessage(models);
  };
}
