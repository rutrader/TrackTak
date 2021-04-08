let WorkerC = Worker;

if (process.env.NODE_ENV === "development") {
  const DCFModelSubWorker = require("./dcfModel.sub.worker");

  WorkerC = DCFModelSubWorker.default;
}

const initializeSubWorker = () => {
  return new WorkerC("./dcfModel.sub.worker.js", {
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
