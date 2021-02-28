import { createSelector } from "@reduxjs/toolkit";
import industryAverage from "../../shared/industryAverage";
import industryMapping, { spaceRegex } from "../../shared/industryMappings";
import selectGeneral from "./selectGeneral";
import selectIsInUS from "./selectIsInUS";

const selectCurrentIndustry = createSelector(
  selectGeneral,
  selectIsInUS,
  (general, isInUS) => {
    const currentIndustryMutated = general.Industry.replace(
      spaceRegex,
      "",
    ).toUpperCase();

    const mappedCurrentIndustry = industryMapping[currentIndustryMutated];
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
