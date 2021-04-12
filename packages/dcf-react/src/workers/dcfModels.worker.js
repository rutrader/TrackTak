import 'nested-worker/worker.js';

const initializeSubWorker = () => {
  return new Worker("./dcfModels.sub.worker.js", {
    type: "module",
  });
};

if (typeof self !== "undefined") {
  let subWorker = null;

  self.onmessage = ({ data: { cells, existingScope, currentScopes } }) => {
    if (subWorker) {
      subWorker.terminate();
    }
    subWorker = initializeSubWorker();
    subWorker.postMessage({
      cells,
      existingScope,
      currentScopes,
    });
    subWorker.onmessage = ({ data }) => {
      self.postMessage(data);
    };
  };
}
