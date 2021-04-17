import axios from "./axios";

export const calculateDCFModel = async (cells, existingScope, currentScope) => {
  return axios.post(`/api/v1/calculate-dcf-model`, {
    cells,
    existingScope,
    currentScope,
  });
};

export const calculateDCFModels = async (
  cells,
  existingScope,
  currentScopes,
) => {
  return axios.post(`/api/v1/calculate-dcf-models`, {
    cells,
    existingScope,
    currentScopes,
  });
};
