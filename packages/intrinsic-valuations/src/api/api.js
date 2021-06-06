import axios from "./axios";
import baseAxios from "axios";

let sensitivtyAnalysisSource;

export const computeSensitivityAnalysis = async (
  sheetsSerializedValues,
  existingScope,
  currentScopes,
) => {
  if (sensitivtyAnalysisSource) {
    sensitivtyAnalysisSource.cancel("New request sent.");
  }

  sensitivtyAnalysisSource = baseAxios.CancelToken.source();

  const res = await axios.post(
    `/api/v1/compute-sensitivity-analysis`,
    {
      sheetsSerializedValues,
      existingScope,
      currentScopes,
    },
    {
      cancelToken: sensitivtyAnalysisSource && sensitivtyAnalysisSource.token,
    },
  );

  sensitivtyAnalysisSource = null;

  return res;
};
