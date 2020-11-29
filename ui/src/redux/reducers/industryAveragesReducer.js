import { createReducer } from "@reduxjs/toolkit";
import {
  getIndustryAverages,
  setCurrentIndustryAverage,
} from "../actions/industryAveragesActions";
import industryMapping from "../../shared/industryMapping.json";
import { percentModifier } from "../../components/FormatRawNumberToPercent";

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
      const mappedCurrentIndustry =
        industryMapping[action.payload.currentIndustry];

      state.currentIndustry = state.data.find(
        (datum) => datum.industryName === mappedCurrentIndustry
      );
      state.currentIndustry.standardDeviationInStockPrices =
        parseFloat(state.currentIndustry.standardDeviationInStockPrices) /
        percentModifier;
    });
  }
);
