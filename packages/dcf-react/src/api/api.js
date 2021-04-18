import axios from "./axios";
import baseAxios from "axios";

let dcfModelSource;

export const calculateDCFModel = async (cells, existingScope, currentScope) => {
  if (dcfModelSource) {
    dcfModelSource.cancel("New request sent.");
  }

  const res = await axios.post(
    `/api/v1/calculate-dcf-model`,
    {
      cells,
      existingScope,
      currentScope,
    },
    {
      cancelToken: dcfModelsSource && dcfModelSource.token,
    },
  );

  dcfModelSource = null;

  return res;
};

let dcfModelsSource;

export const calculateDCFModels = async (
  cells,
  existingScope,
  currentScopes,
) => {
  if (dcfModelsSource) {
    dcfModelsSource.cancel("New request sent.");
  }

  dcfModelsSource = baseAxios.CancelToken.source();

  const res = await axios.post(
    `/api/v1/calculate-dcf-models`,
    {
      cells,
      existingScope,
      currentScopes,
    },
    {
      cancelToken: dcfModelsSource && dcfModelsSource.token,
    },
  );

  dcfModelsSource = null;

  return res;
};
