import { Worker } from "worker_threads";

// TODO, make this a worker pool later
export const getDcfModelWorker = () =>
  new Worker(new URL("./dcfModel.worker.js", import.meta.url), {
    type: "module",
  });

export const getSensitivityAnalysisWorker = () =>
  new Worker(new URL("./sensitivityAnalysis.worker.js", import.meta.url), {
    type: "module",
  });
