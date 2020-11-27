import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const getIndustryAverages = createAsyncThunk(
  "industryAverages/getIndustryAverages",
  async () => {
    const res = await axios.get("/api/v1/industry-averages");
    return res.data;
  }
);

export const setCurrentIndustryAverage = createAction(
  "industryAverages/setCurrentIndustryAverage",
  (currentIndustry) => {
    return {
      payload: {
        currentIndustry,
      },
    };
  }
);
