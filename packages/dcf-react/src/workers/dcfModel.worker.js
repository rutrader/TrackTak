import DCFModelSubWorker from "./dcfModel.sub.worker";

const initializeSubWorker = () => {
  return new DCFModelSubWorker("./dcfModelSub.worker.js", {
    type: "module",
  });
};

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
