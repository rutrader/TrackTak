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

const spaceRegex = /\s/g;
const industryMappingsMutated = {};

Object.keys(industryMapping).forEach((key) => {
  const noSpaceKey = key.replace(spaceRegex, "").toUpperCase();

  industryMappingsMutated[noSpaceKey] = industryMapping[key];
});

export const industryAveragesReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(getIndustryAverages.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(setCurrentIndustryAverage, (state, action) => {
      const currentIndustryMutated = action.payload.currentIndustry
        .replace(spaceRegex, "")
        .toUpperCase();
      const mappedCurrentIndustry =
        industryMappingsMutated[currentIndustryMutated];

      state.currentIndustry = state.data.find((datum) => {
        return datum.industryName === mappedCurrentIndustry;
      });
      state.currentIndustry.standardDeviationInStockPrices =
        parseFloat(state.currentIndustry.standardDeviationInStockPrices) /
        percentModifier;
    });
  }
);
