import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import selectCells from "../selectors/dcfSelectors/selectCells";
import selectScope from "../selectors/dcfSelectors/selectScope";

let dcfModelsWorker = null;

if (typeof window !== "undefined") {
  dcfModelsWorker = new Worker("../workers/dcfModels.worker.js", {
    type: "module",
  });
}

const useUpdateDCFModels = (initialState) => {
  const cells = useSelector(selectCells);
  const existingScope = useSelector(selectScope);
  const [dcfModels, setDCFModels] = useState(initialState);

  const updateDCFModels = useCallback(
    (currentScopes) => {
      dcfModelsWorker.postMessage({
        cells,
        existingScope,
        currentScopes,
      });

      dcfModelsWorker.onmessage = ({ data }) => {
        setDCFModels(data);
      };
    },
    [cells, existingScope],
  );

  return [dcfModels, updateDCFModels];
};

export default useUpdateDCFModels;
