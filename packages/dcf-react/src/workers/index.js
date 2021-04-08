let WorkerC = Worker;
let dcfModelWorker = null;

if (process.env.NODE_ENV === "development") {
  const DCFModelWorker = require("./dcfModel.worker");

  WorkerC = DCFModelWorker.default;
}

if (typeof window !== "undefined") {
  dcfModelWorker = new WorkerC(
    new URL("./dcfModel.worker.js", import.meta.url),
    {
      type: "module",
    },
  );
}

export default dcfModelWorker;
