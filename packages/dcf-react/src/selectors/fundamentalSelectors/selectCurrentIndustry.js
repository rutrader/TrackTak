import { createSelector } from "@reduxjs/toolkit";
import industryAverage from "../../shared/industryAverage";
import industryMapingJSON from "../../data/industryMapping.json";
import selectGeneral from "./selectGeneral";
import selectIsInUS from "./selectIsInUS";

const selectCurrentIndustry = createSelector(
  selectGeneral,
  selectIsInUS,
  (general, isInUS) => {
    const mappedCurrentIndustry = industryMapingJSON[general.GicSubIndustry];
    const industryAverages = isInUS
      ? industryAverage.US
      : industryAverage.global;

    const currentIndustry = industryAverages.find((datum) => {
      return datum.industryName === mappedCurrentIndustry;
    });

    return {
      ...currentIndustry,
      standardDeviationInStockPrices:
        currentIndustry.standardDeviationInStockPrices,
    };
  },
);

export default selectCurrentIndustry;
