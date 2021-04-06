import Worker from "./worker.js";

let sensitivityAnalysisWorker = null;

if (typeof window !== "undefined") {
  sensitivityAnalysisWorker = new Worker(
    new URL("./worker.js", import.meta.url),
    {
      type: "module",
    },
  );
}
export default sensitivityAnalysisWorker;
