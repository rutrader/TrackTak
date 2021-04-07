import DCFModelWorker from "./dcfModel.worker";

let dcfModelWorker = null;

if (typeof window !== "undefined") {
  dcfModelWorker = new DCFModelWorker(
    new URL("./dcfModel.worker.js", import.meta.url),
    {
      type: "module",
    },
  );
}

export default dcfModelWorker;
