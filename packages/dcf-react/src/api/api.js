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

let dcfSensitivityAnalysisModelSource;

export const computeSensitivityAnalysis = async (
  cells,
  existingScope,
  currentScopes,
) => {
  if (dcfSensitivityAnalysisModelSource) {
    dcfSensitivityAnalysisModelSource.cancel("New request sent.");
  }

  dcfSensitivityAnalysisModelSource = baseAxios.CancelToken.source();

  const res = await axios.post(
    `/api/v1/compute-sensitivity-analysis`,
    {
      cells,
      existingScope,
      currentScopes,
    },
    {
      cancelToken:
        dcfSensitivityAnalysisModelSource &&
        dcfSensitivityAnalysisModelSource.token,
    },
  );

  dcfSensitivityAnalysisModelSource = null;

  return res;
};
