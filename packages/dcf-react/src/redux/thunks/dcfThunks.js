import { createAsyncThunk } from "@reduxjs/toolkit";
import { calculateDCFModel } from "../../api/api";

export const calculateDCFModelThunk = createAsyncThunk(
  "dcf/calculateDCFModel",
  async (currentScope, { getState }) => {
    const state = getState();

    const { data } = await calculateDCFModel(
      state.dcf.cells,
      state.dcf.scope,
      currentScope,
    );

    return {
      data,
      currentScope,
    };
  },
);
