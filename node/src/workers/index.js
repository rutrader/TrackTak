import { Worker } from "worker_threads";

export const getSensitivityAnalysisWorker = () =>
  new Worker(new URL("./sensitivityAnalysis.worker.js", import.meta.url), {
    type: "module",
  });
