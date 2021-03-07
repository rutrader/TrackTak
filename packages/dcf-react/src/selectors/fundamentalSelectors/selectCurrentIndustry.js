import { createSelector } from "@reduxjs/toolkit";
import industryAverage from "../../shared/industryAverage";
import industryMapping, { spaceRegex } from "../../shared/industryMappings";
import gicSubIndustryMappingJson from "../../data/gicSubIndustryMapping.json";
import selectGeneral from "./selectGeneral";
import selectIsInUS from "./selectIsInUS";

const selectCurrentIndustry = createSelector(
  selectGeneral,
  selectIsInUS,
  (general, isInUS) => {
    // Some stocks do not have a gicSubIndustry so fallback to industry for them
    let mappedCurrentIndustry;

    if (general.gicSubIndustry) {
      mappedCurrentIndustry = gicSubIndustryMappingJson[general.gicSubIndustry];
    } else {
      const currentIndustry = general.industry
        .replace(spaceRegex, "")
        .toUpperCase();

      mappedCurrentIndustry = industryMapping[currentIndustry];
    }

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
