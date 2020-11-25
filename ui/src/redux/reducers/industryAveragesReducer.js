import { createReducer } from "@reduxjs/toolkit";
import {
  getIndustryAverages,
  setCurrentIndustryAverage,
} from "../actions/industryAveragesActions";

const initialState = {
  data: null,
  currentIndustry: null,
};

export const industryAveragesReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(getIndustryAverages.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(setCurrentIndustryAverage, (state, action) => {
      state.currentIndustry = state.data.find(
        (datum) => datum.industryName === action.payload.currentIndustry
      );
    });
  }
);
