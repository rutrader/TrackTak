import { createSelector } from "@reduxjs/toolkit";
import industryAverage from "../../shared/industryAverage";
import industryMapping, { spaceRegex } from "../../shared/industryMappings";
import gicSubIndustryMappingJson from "../../data/gicSubIndustryMapping.json";
import selectGeneral from "./selectGeneral";
import selectIsInUS from "./selectIsInUS";
import { isNil } from "lodash-es";

const selectCurrentIndustry = createSelector(
  selectGeneral,
  selectIsInUS,
  ({ gicSubIndustry, industry }, isInUS) => {
    let mappedCurrentIndustry;

    if (!isNil(gicSubIndustry)) {
      mappedCurrentIndustry = gicSubIndustryMappingJson[gicSubIndustry.trim()];
    }

    // TODO: Add sentry warning later
    // Some stocks do not have a gicSubIndustry so fallback to industry for them
    if (!mappedCurrentIndustry) {
      const currentIndustry = industry.replace(spaceRegex, "").toUpperCase();

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
