import { createReducer } from "@reduxjs/toolkit";
import { setCurrentIndustryAverage } from "../actions/industryAveragesActions";
import industryMapping from "../../shared/industryMapping.json";
import industryAverages from "../../data/industryAverages.json";

const initialState = {
  data: industryAverages,
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
        parseFloat(state.currentIndustry.standardDeviationInStockPrices) / 100;
    });
  }
);
