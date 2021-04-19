import axios from "./axios";
import baseAxios from "axios";

let dcfModelSource;

export const calculateDCFModel = async (cells, existingScope, currentScope) => {
  if (dcfModelSource) {
    dcfModelSource.cancel("New request sent.");
  }

  dcfModelSource = baseAxios.CancelToken.source();

  const res = await axios.post(
    `/api/v1/calculate-dcf-model`,
    {
      cells,
      existingScope,
      currentScope,
    },
    {
      cancelToken: dcfModelSource && dcfModelSource.token,
    },
  );

  dcfModelSource = null;

  return res;
};

export const computeSensitivityAnalysis = async (
  cells,
  existingScope,
  currentScopes,
) => {
  return axios.post(`/api/v1/compute-sensitivity-analysis`, {
    cells,
    existingScope,
    currentScopes,
  });
};
