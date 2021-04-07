import DCFModelSubWorker from "./dcfModel.sub.worker";

const initializeSubWorker = () => {
  return new DCFModelSubWorker("./dcfModelSub.worker.js", {
    type: "module",
  });
};

let subWorker = initializeSubWorker();

self.onmessage = ({
  data: { cells, existingScope, currentScopes, cancelMessage },
}) => {
  if (cancelMessage && subWorker) {
    console.log("terminate");
    subWorker.terminate();
    subWorker = initializeSubWorker();
    return;
  }

  console.log("new post");

  subWorker.postMessage({
    cells,
    existingScope,
    currentScopes,
  });

  subWorker.onmessage = ({ data }) => {
    console.log("returned");

    self.postMessage(data);
  };
};
